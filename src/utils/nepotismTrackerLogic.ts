import {
  Asset,
  Relative,
  Contractor,
  GovtContract,
  Politician,
  FlaggedContract,
  AssetGrowthReport,
  AssetTimelinePoint,
  OwnerGrowthBreakdown
} from '../types';
import {
  ASSETS_DATA,
  RELATIVES_DATA,
  CONTRACTORS_DATA,
  GOVT_CONTRACTS_DATA,
  POLITICIAN_TENURES_DATA
} from '../data/nepotismTrackerData';

/**
 * Checks if a contract date falls within a politician's tenure period in a specific department/ministry
 */
function isDateWithinTenure(dateStr: string, startDateStr: string, endDateStr?: string): boolean {
  const contractDate = new Date(dateStr).getTime();
  const start = new Date(startDateStr).getTime();
  const end = endDateStr ? new Date(endDateStr).getTime() : new Date().getTime(); // if no end date, active till present
  return contractDate >= start && contractDate <= end;
}

/**
 * Checks if awarding department matches the politician's ministerial / committee jurisdiction
 */
function departmentMatchesJurisdiction(awardingDept: string, tenureKeywords: string[]): boolean {
  const deptLower = awardingDept.toLowerCase();
  return tenureKeywords.some((kw) => deptLower.includes(kw.toLowerCase()));
}

/**
 * Finds all flagged contracts where:
 * 1. A contractor is linked to a politician's relative
 * 2. Contractor received a government contract from a department under politician's authority
 * 3. Awarded during their tenure in that position
 */
export function findFlaggedContracts(
  allPoliticians: Politician[],
  filterPoliticianId?: string
): FlaggedContract[] {
  const flaggedList: FlaggedContract[] = [];

  // Map contractors by ID
  const contractorMap = new Map<string, Contractor>();
  CONTRACTORS_DATA.forEach((c) => contractorMap.set(c.id, c));

  // Map relatives by ID
  const relativeMap = new Map<string, Relative>();
  RELATIVES_DATA.forEach((r) => relativeMap.set(r.id, r));

  // Map politicians by ID
  const politicianMap = new Map<string, Politician>();
  allPoliticians.forEach((p) => politicianMap.set(p.id, p));

  // Scan through all government contracts
  for (const contract of GOVT_CONTRACTS_DATA) {
    const contractor = contractorMap.get(contract.contractorId);
    if (!contractor || !contractor.linkedRelativeId) {
      continue; // Contractor is not linked to any declared relative
    }

    const relative = relativeMap.get(contractor.linkedRelativeId);
    if (!relative) continue;

    if (filterPoliticianId && relative.politicianId !== filterPoliticianId) {
      continue;
    }

    const politician = politicianMap.get(relative.politicianId);
    if (!politician) continue;

    // Check tenures of the politician
    const tenures = POLITICIAN_TENURES_DATA[politician.id] || [];

    for (const tenure of tenures) {
      const isOverlap =
        isDateWithinTenure(contract.awardedDate, tenure.startDate, tenure.endDate) &&
        departmentMatchesJurisdiction(contract.awardingDepartment, tenure.jurisdictionKeywords);

      if (isOverlap) {
        // Collect detailed flag reasons
        const reasons: string[] = [];

        if (contract.tenderType === 'nominated') {
          reasons.push(
            'Awarded via Nominated / Direct Allocation without open competitive public tender bidding.'
          );
        } else if (contract.tenderType === 'limited') {
          reasons.push(
            'Awarded under Limited Tender enquiry restricted to select pre-approved vendors.'
          );
        } else {
          reasons.push(
            'Awarded via Open Tender while relative held significant equity/directorship in the winning firm.'
          );
        }

        reasons.push(
          `Contract awarded by "${contract.awardingDepartment}" during tenure as ${tenure.role} (${tenure.startDate.slice(0, 4)} to ${tenure.endDate ? tenure.endDate.slice(0, 4) : 'Present'}).`
        );

        reasons.push(
          `Contractor "${contractor.name}" has documented leadership/ownership by ${relative.name} (${relative.relationType}).`
        );

        const severity: 'High' | 'Medium' | 'Informational' =
          contract.tenderType === 'nominated'
            ? 'High'
            : contract.tenderType === 'limited'
            ? 'Medium'
            : 'Informational';

        const tenurePeriodStr = `${tenure.startDate.slice(0, 4)} – ${
          tenure.endDate ? tenure.endDate.slice(0, 4) : 'Present'
        }`;

        flaggedList.push({
          id: `flagged-${contract.id}-${relative.id}`,
          contract,
          contractor,
          relative,
          politician,
          conflictDepartment: tenure.departmentOrMinistry,
          politicianRoleDuringContract: tenure.role,
          tenurePeriod: tenurePeriodStr,
          flagReasons: reasons,
          flagSeverity: severity,
          sourceDocumentUrl: contract.sourceDocumentUrl,
          evidenceSource: `Central Public Procurement / CAG Audit / ECI Affidavit (${contract.sourceDocumentUrl.includes('cag') ? 'CAG Audit' : 'CPPP e-Tender Registry'})`
        });
      }
    }
  }

  return flaggedList;
}

/**
 * Calculates asset growth timeline points for charting and table visualization
 */
export function getPoliticianAssetTimeline(
  politicianId: string,
  politicianFallbackHistory: { year: number; totalCr: number; movableCr: number; immovableCr: number; source: string }[] = []
): AssetTimelinePoint[] {
  const politicianAssets = ASSETS_DATA.filter((a) => a.politicianId === politicianId);

  // Group by yearDeclared
  const yearsSet = new Set<number>();
  politicianAssets.forEach((a) => yearsSet.add(a.yearDeclared));
  politicianFallbackHistory.forEach((h) => yearsSet.add(h.year));

  const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);

  if (sortedYears.length === 0) {
    return [];
  }

  return sortedYears.map((year) => {
    const assetsForYear = politicianAssets.filter((a) => a.yearDeclared === year);

    let self = 0;
    let spouse = 0;
    let dependent = 0;
    let docUrl = '';

    if (assetsForYear.length > 0) {
      assetsForYear.forEach((a) => {
        if (a.ownerType === 'self') self += a.declaredValue;
        else if (a.ownerType === 'spouse') spouse += a.declaredValue;
        else if (a.ownerType === 'dependent') dependent += a.declaredValue;

        if (a.sourceDocumentUrl) docUrl = a.sourceDocumentUrl;
      });
    } else {
      // Fallback to politician summary history
      const historyItem = politicianFallbackHistory.find((h) => h.year === year);
      if (historyItem) {
        self = historyItem.totalCr;
        docUrl = historyItem.source;
      }
    }

    const total = parseFloat((self + spouse + dependent).toFixed(2));

    return {
      year,
      self: parseFloat(self.toFixed(2)),
      spouse: parseFloat(spouse.toFixed(2)),
      dependent: parseFloat(dependent.toFixed(2)),
      total,
      sourceDoc: docUrl || 'ECI Form 26 Affidavit'
    };
  });
}

/**
 * Calculates asset growth statistics for a single politician
 */
export function calculatePoliticianAssetGrowth(
  politician: Politician,
  thresholdPercent: number = 50,
  customBaselineYear?: number
): AssetGrowthReport {
  const timeline = getPoliticianAssetTimeline(
    politician.id,
    politician.assets?.history || []
  );

  if (timeline.length === 0) {
    // If no timeline records exist, fallback to current declared assets
    const currentTotal = politician.assets?.totalCr || 0;
    return {
      politicianId: politician.id,
      politicianName: politician.name,
      partyAbbr: politician.partyAbbr,
      partyColor: politician.partyColor,
      alliance: politician.alliance,
      baselineYear: politician.assets?.declarationYear || 2024,
      baselineValue: currentTotal,
      latestYear: politician.assets?.declarationYear || 2024,
      latestValue: currentTotal,
      absoluteGrowth: 0,
      percentageGrowth: 0,
      cagrPercent: 0,
      isFlagged: false,
      thresholdUsed: thresholdPercent,
      breakdownByOwner: {
        self: { baseline: currentTotal, latest: currentTotal, growthPercent: 0, isFlagged: false },
        spouse: { baseline: 0, latest: 0, growthPercent: 0, isFlagged: false },
        dependent: { baseline: 0, latest: 0, growthPercent: 0, isFlagged: false }
      },
      timelinePoints: [
        {
          year: politician.assets?.declarationYear || 2024,
          self: currentTotal,
          spouse: 0,
          dependent: 0,
          total: currentTotal,
          sourceDoc: 'ECI Form 26 Affidavit'
        }
      ]
    };
  }

  // Determine baseline and latest timeline point
  let baselinePoint = timeline[0];
  if (customBaselineYear) {
    const matched = timeline.find((t) => t.year === customBaselineYear);
    if (matched) baselinePoint = matched;
  }

  const latestPoint = timeline[timeline.length - 1];

  const baselineValue = baselinePoint.total > 0 ? baselinePoint.total : 0.1;
  const latestValue = latestPoint.total;
  const absoluteGrowth = parseFloat((latestValue - baselineValue).toFixed(2));
  const percentageGrowth = parseFloat(
    (((latestValue - baselineValue) / baselineValue) * 100).toFixed(1)
  );

  // CAGR calculation
  const yearsDiff = Math.max(latestPoint.year - baselinePoint.year, 1);
  let cagrPercent = 0;
  if (latestValue > 0 && baselineValue > 0) {
    cagrPercent = parseFloat(
      ((Math.pow(latestValue / baselineValue, 1 / yearsDiff) - 1) * 100).toFixed(1)
    );
  }

  // Calculate owner breakdown
  const calcOwnerBreakdown = (
    baseVal: number,
    latVal: number
  ): OwnerGrowthBreakdown => {
    const base = baseVal > 0 ? baseVal : 0.05;
    const growth = parseFloat((((latVal - base) / base) * 100).toFixed(1));
    return {
      baseline: baseVal,
      latest: latVal,
      growthPercent: baseVal === 0 && latVal === 0 ? 0 : growth,
      isFlagged: growth >= thresholdPercent
    };
  };

  const selfBreakdown = calcOwnerBreakdown(baselinePoint.self, latestPoint.self);
  const spouseBreakdown = calcOwnerBreakdown(baselinePoint.spouse, latestPoint.spouse);
  const depBreakdown = calcOwnerBreakdown(baselinePoint.dependent, latestPoint.dependent);

  const isFlagged = percentageGrowth >= thresholdPercent;

  return {
    politicianId: politician.id,
    politicianName: politician.name,
    partyAbbr: politician.partyAbbr,
    partyColor: politician.partyColor,
    alliance: politician.alliance,
    baselineYear: baselinePoint.year,
    baselineValue: baselinePoint.total,
    latestYear: latestPoint.year,
    latestValue: latestPoint.total,
    absoluteGrowth,
    percentageGrowth,
    cagrPercent,
    isFlagged,
    thresholdUsed: thresholdPercent,
    breakdownByOwner: {
      self: selfBreakdown,
      spouse: spouseBreakdown,
      dependent: depBreakdown
    },
    timelinePoints: timeline
  };
}

/**
 * Calculates asset growth reports across all politicians
 */
export function getAllPoliticiansAssetGrowth(
  politicians: Politician[],
  thresholdPercent: number = 50
): AssetGrowthReport[] {
  return politicians.map((p) => calculatePoliticianAssetGrowth(p, thresholdPercent));
}

/**
 * Retrieves documented relatives and linked contractors for a politician
 */
export function getPoliticianRelativesAndContractors(politicianId: string) {
  const relatives = RELATIVES_DATA.filter((r) => r.politicianId === politicianId);
  const relativeIds = relatives.map((r) => r.id);

  const linkedContractors = CONTRACTORS_DATA.filter(
    (c) => c.linkedRelativeId && relativeIds.includes(c.linkedRelativeId)
  );

  const contractorIds = linkedContractors.map((c) => c.id);
  const contracts = GOVT_CONTRACTS_DATA.filter((gc) => contractorIds.includes(gc.contractorId));

  return {
    relatives,
    contractors: linkedContractors,
    contracts
  };
}
