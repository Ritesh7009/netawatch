/**
 * NetaWatch WebMCP Core Tool Implementations
 * Maps standard agent tool invocations to real NetaWatch data & UI business logic.
 */

import { WebMCPToolDefinition, WebMCPStateControllers } from './types';
import { ALL_543_POLITICIANS, POLITICIANS_DATA } from '../data/politicians';
import { findFlaggedContracts } from '../utils/nepotismTrackerLogic';
import { Politician } from '../types';

/**
 * Helper to retrieve full politician record from cache or synthesis
 */
async function resolvePolitician(politicianId: string): Promise<Politician | null> {
  if (!politicianId) return null;
  const normalizedId = politicianId.trim().toLowerCase();
  
  // 1. Direct match in verified deep dataset
  const directMatch = POLITICIANS_DATA.find(p => p.id.toLowerCase() === normalizedId);
  if (directMatch) return directMatch;

  // 2. Match in 543 synthesized dataset
  const allMatch = ALL_543_POLITICIANS.find(p => p.id.toLowerCase() === normalizedId);
  if (allMatch) return allMatch;

  // 3. Match by name
  const nameMatch = ALL_543_POLITICIANS.find(
    p => p.name.toLowerCase() === normalizedId || p.name.toLowerCase().includes(normalizedId)
  );
  if (nameMatch) return nameMatch;

  return null;
}

export function createWebMCPTools(controllers: WebMCPStateControllers): WebMCPToolDefinition[] {
  return [
    // -------------------------------------------------------------
    // TOOL 1: search_politicians
    // -------------------------------------------------------------
    {
      name: 'search_politicians',
      description: 'Search the verified NetaWatch database of 543 Lok Sabha Members of Parliament (MPs) by name, constituency, state, party, or alliance coalition. Use this tool when the user refers to a politician by name or asks to discover politicians matching geographic or political criteria. Returns structured politician IDs and basic metadata. (Do not infer full political claims from the search result alone; use get_politician_profile or get_evidence_and_affidavits for deep verification).',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search keyword matching MP name, constituency, state, or party (e.g. "Amit Shah", "Varanasi", "Wayanad", "BJP", "INC").'
          },
          alliance: {
            type: 'string',
            enum: ['ALL', 'NDA', 'INDIA', 'Others', 'Independent'],
            description: 'Optional filter by parliamentary alliance coalition (NDA, INDIA, Others, Independent).'
          },
          state: {
            type: 'string',
            description: 'Optional filter by Indian State or Union Territory (e.g. "Uttar Pradesh", "Maharashtra", "Kerala").'
          },
          limit: {
            type: 'number',
            default: 10,
            description: 'Maximum number of results to return (default: 10, max: 50).'
          }
        }
      },
      execute: async (input: { query?: string; alliance?: string; state?: string; limit?: number }) => {
        const query = (input.query || '').trim().toLowerCase();
        const alliance = input.alliance && input.alliance !== 'ALL' ? input.alliance : null;
        const state = input.state ? input.state.trim().toLowerCase() : null;
        const limit = Math.min(Math.max(input.limit || 10, 1), 50);

        let matches = ALL_543_POLITICIANS.filter(p => {
          if (alliance && p.alliance !== alliance) return false;
          if (state && !p.state.toLowerCase().includes(state)) return false;
          if (!query) return true;

          return (
            p.name.toLowerCase().includes(query) ||
            p.constituency.toLowerCase().includes(query) ||
            p.state.toLowerCase().includes(query) ||
            p.party.toLowerCase().includes(query) ||
            p.partyAbbr.toLowerCase().includes(query) ||
            p.currentRole.toLowerCase().includes(query)
          );
        });

        const results = matches.slice(0, limit).map(p => ({
          id: p.id,
          name: p.name,
          party: p.party,
          partyAbbr: p.partyAbbr,
          alliance: p.alliance,
          state: p.state,
          constituency: p.constituency,
          currentRole: p.currentRole,
          attendancePercent: p.parliamentaryRecord?.attendancePercent ?? 0,
          totalAssetsCr: p.assets?.totalCr ?? 0,
          criminalCases: p.criminalRecords?.totalCases ?? 0,
          verifiedAffidavit: p.verifiedAffidavit
        }));

        return {
          totalMatches: matches.length,
          returnedCount: results.length,
          politicians: results
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 2: get_politician_profile
    // -------------------------------------------------------------
    {
      name: 'get_politician_profile',
      description: 'Retrieve the verified profile dossier of a specific Lok Sabha MP including bio, age, education, current role, Form 26 sworn affidavit verification status, and core baseline metrics. Use this tool when the user requests an overview or factsheet of a specific politician.',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_id: {
            type: 'string',
            description: 'Unique politician ID (e.g. "amit-shah", "rahul-gandhi", "shivraj-singh-chouhan", "narendra-modi").'
          }
        },
        required: ['politician_id']
      },
      execute: async (input: { politician_id: string }) => {
        const p = await resolvePolitician(input.politician_id);
        if (!p) {
          return {
            data_available: false,
            error: `Politician '${input.politician_id}' not found in NetaWatch database.`
          };
        }

        return {
          data_available: true,
          id: p.id,
          name: p.name,
          hindiName: p.hindiName || null,
          party: p.party,
          partyAbbr: p.partyAbbr,
          alliance: p.alliance,
          state: p.state,
          constituency: p.constituency,
          house: p.house,
          currentRole: p.currentRole,
          education: p.education,
          profession: p.profession,
          age: p.age,
          bio: p.bio,
          verifiedAffidavit: p.verifiedAffidavit,
          tags: p.tags,
          highLevelMetrics: {
            attendancePercent: p.parliamentaryRecord?.attendancePercent,
            nationalAvgAttendance: p.parliamentaryRecord?.nationalAvgAttendance,
            debatesCount: p.parliamentaryRecord?.debatesCount,
            questionsAsked: p.parliamentaryRecord?.questionsAsked,
            totalAssetsCr: p.assets?.totalCr,
            criminalCasesCount: p.criminalRecords?.totalCases,
            mpladsSpentCr: p.mplads?.spentCr
          }
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 3: get_parliamentary_activity
    // -------------------------------------------------------------
    {
      name: 'get_parliamentary_activity',
      description: 'Retrieve official parliamentary attendance records, debate participation counts, questions asked, private member bills introduced, and committee memberships from Sansad Hansard records and PRS Legislative Research. Use when the user asks about legislative activity, attendance, or performance in Parliament. (Note: Union Ministers do not ask questions in the House per parliamentary procedure).',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_id: {
            type: 'string',
            description: 'Unique politician ID (e.g. "rahul-gandhi", "amit-shah", "supriya-sule").'
          }
        },
        required: ['politician_id']
      },
      execute: async (input: { politician_id: string }) => {
        const p = await resolvePolitician(input.politician_id);
        if (!p) {
          return {
            data_available: false,
            error: `Politician '${input.politician_id}' not found.`
          };
        }

        const pr = p.parliamentaryRecord;
        if (!pr) {
          return {
            data_available: false,
            politician_id: p.id,
            politician_name: p.name,
            reason: 'Parliamentary record is not available for this profile.'
          };
        }

        return {
          data_available: true,
          politician_id: p.id,
          politician_name: p.name,
          party: p.partyAbbr,
          constituency: p.constituency,
          attendancePercent: pr.attendancePercent,
          nationalAvgAttendance: pr.nationalAvgAttendance,
          attendanceVsNationalAvg: +(pr.attendancePercent - pr.nationalAvgAttendance).toFixed(1),
          debatesCount: pr.debatesCount,
          questionsAsked: pr.questionsAsked,
          privateMemberBills: pr.privateMemberBills,
          committeeMemberships: pr.committeeMemberships || [],
          sourceAttribution: 'Lok Sabha Hansard Records & PRS Legislative Research Public Ledger'
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 4: get_political_statements_and_stances
    // -------------------------------------------------------------
    {
      name: 'get_political_statements_and_stances',
      description: 'Retrieve verified policy stances, declared ideological positions, and recent press/news coverage with sentiment and source attribution for an MP. Use when analyzing what a leader stands for, public speeches, or policy positions on specific issues (e.g., Economy, Security, Welfare, Caste).',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_id: {
            type: 'string',
            description: 'Unique politician ID (e.g. "amit-shah", "rahul-gandhi").'
          },
          topic_keyword: {
            type: 'string',
            description: 'Optional keyword to filter stances or news (e.g. "Economy", "Security", "Welfare", "Caste").'
          }
        },
        required: ['politician_id']
      },
      execute: async (input: { politician_id: string; topic_keyword?: string }) => {
        const p = await resolvePolitician(input.politician_id);
        if (!p) {
          return { data_available: false, error: `Politician '${input.politician_id}' not found.` };
        }

        const keyword = (input.topic_keyword || '').toLowerCase().trim();

        let stances = p.keyStances || [];
        if (keyword) {
          stances = stances.filter(s => s.toLowerCase().includes(keyword));
        }

        let newsItems = p.news || [];
        if (keyword) {
          newsItems = newsItems.filter(
            n => n.title.toLowerCase().includes(keyword) || n.summary.toLowerCase().includes(keyword)
          );
        }

        return {
          data_available: true,
          politician_id: p.id,
          politician_name: p.name,
          keyStances: stances,
          newsCoverage: newsItems.map(n => ({
            id: n.id,
            title: n.title,
            summary: n.summary,
            source: n.source,
            date: n.date,
            sentiment: n.sentiment,
            url: n.url
          })),
          filterApplied: keyword || 'None'
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 5: get_political_activity_and_initiatives
    // -------------------------------------------------------------
    {
      name: 'get_political_activity_and_initiatives',
      description: 'Retrieve major landmark initiatives, legislative achievements, career timeline milestones, and MPLADS local area development fund spending for an MP. Use when evaluating constituency delivery or career trajectory.',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_id: {
            type: 'string',
            description: 'Unique politician ID (e.g. "shivraj-singh-chouhan", "amit-shah").'
          }
        },
        required: ['politician_id']
      },
      execute: async (input: { politician_id: string }) => {
        const p = await resolvePolitician(input.politician_id);
        if (!p) {
          return { data_available: false, error: `Politician '${input.politician_id}' not found.` };
        }

        return {
          data_available: true,
          politician_id: p.id,
          politician_name: p.name,
          majorInitiatives: (p.majorInitiatives || []).map(init => ({
            title: init.title,
            year: init.year,
            category: init.category,
            impact: init.impact,
            description: init.description
          })),
          careerTimeline: (p.politicalTimeline || []).map(t => ({
            year: t.year,
            role: t.role,
            achievement: t.achievement
          })),
          mpladsOverview: p.mplads ? {
            allocatedCr: p.mplads.allocatedCr,
            spentCr: p.mplads.spentCr,
            utilizationPercent: p.mplads.utilizationPercent,
            completedProjects: p.mplads.completedProjects,
            topProjects: p.mplads.topProjects
          } : null
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 6: compare_politicians_matrix
    // -------------------------------------------------------------
    {
      name: 'compare_politicians_matrix',
      description: 'Perform a computational head-to-head comparative analysis of 2 to 4 politicians across attendance, debates, declared wealth, criminal cases, and MPLADS delivery. Use when the user asks to compare or rank multiple politicians. (Returns structured matrix and calculated metric leaders).',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_ids: {
            type: 'array',
            items: { type: 'string' },
            minItems: 2,
            maxItems: 4,
            description: 'List of 2 to 4 politician IDs to compare (e.g. ["amit-shah", "rahul-gandhi", "shivraj-singh-chouhan"]).'
          },
          focus_areas: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['parliamentary', 'financial', 'legal', 'initiatives', 'all']
            },
            description: 'Optional domains to focus the comparison matrix on.'
          }
        },
        required: ['politician_ids']
      },
      execute: async (input: { politician_ids: string[]; focus_areas?: string[] }) => {
        const ids = input.politician_ids || [];
        if (ids.length < 2 || ids.length > 4) {
          return {
            error: 'Comparison requires between 2 and 4 politician IDs.',
            providedCount: ids.length
          };
        }

        const politicians: Politician[] = [];
        for (const id of ids) {
          const p = await resolvePolitician(id);
          if (p) politicians.push(p);
        }

        if (politicians.length < 2) {
          return {
            error: 'Could not resolve at least 2 valid politicians for comparison.',
            found: politicians.map(p => p.id)
          };
        }

        const focus = input.focus_areas && input.focus_areas.length > 0 ? input.focus_areas : ['all'];
        const includeAll = focus.includes('all');

        const matrix = politicians.map(p => {
          const item: Record<string, any> = {
            id: p.id,
            name: p.name,
            party: p.partyAbbr,
            alliance: p.alliance,
            state: p.state,
            constituency: p.constituency
          };

          if (includeAll || focus.includes('parliamentary')) {
            item.parliamentary = {
              attendancePercent: p.parliamentaryRecord?.attendancePercent,
              debatesCount: p.parliamentaryRecord?.debatesCount,
              questionsAsked: p.parliamentaryRecord?.questionsAsked,
              privateMemberBills: p.parliamentaryRecord?.privateMemberBills,
              nationalAvgBenchmark: p.parliamentaryRecord?.nationalAvgAttendance
            };
          }

          if (includeAll || focus.includes('financial')) {
            item.financial = {
              movableCr: p.assets?.movableCr,
              immovableCr: p.assets?.immovableCr,
              totalCr: p.assets?.totalCr,
              liabilitiesCr: p.assets?.liabilitiesCr,
              mpladsUtilization: p.mplads?.utilizationPercent
            };
          }

          if (includeAll || focus.includes('legal')) {
            item.legal = {
              totalCases: p.criminalRecords?.totalCases,
              seriousCases: p.criminalRecords?.seriousCases,
              chargesFramed: p.criminalRecords?.chargesFramed,
              convicted: p.criminalRecords?.convicted,
              verifiedForm26: p.verifiedAffidavit
            };
          }

          if (includeAll || focus.includes('initiatives')) {
            item.initiatives = {
              totalLandmarkInitiatives: p.majorInitiatives?.length || 0,
              topInitiativeTitles: (p.majorInitiatives || []).slice(0, 3).map(i => i.title),
              mpladsCompletedProjects: p.mplads?.completedProjects || 0
            };
          }

          return item;
        });

        // Compute comparative leaders in key metrics
        const leaderAttendance = [...politicians].sort((a, b) => (b.parliamentaryRecord?.attendancePercent || 0) - (a.parliamentaryRecord?.attendancePercent || 0))[0];
        const leaderQuestions = [...politicians].sort((a, b) => (b.parliamentaryRecord?.questionsAsked || 0) - (a.parliamentaryRecord?.questionsAsked || 0))[0];
        const highestAssets = [...politicians].sort((a, b) => (b.assets?.totalCr || 0) - (a.assets?.totalCr || 0))[0];

        return {
          comparedCount: politicians.length,
          focusAreas: focus,
          matrix,
          benchmarks: {
            highestAttendance: { id: leaderAttendance.id, name: leaderAttendance.name, value: leaderAttendance.parliamentaryRecord?.attendancePercent },
            mostQuestionsAsked: { id: leaderQuestions.id, name: leaderQuestions.name, value: leaderQuestions.parliamentaryRecord?.questionsAsked },
            highestDeclaredWealthCr: { id: highestAssets.id, name: highestAssets.name, value: highestAssets.assets?.totalCr }
          }
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 7: set_comparison_view (Primary UI Actuation Tool)
    // -------------------------------------------------------------
    {
      name: 'set_comparison_view',
      description: 'Actuate and control the NetaWatch user interface: synchronizes selected politicians into the comparison tray, opens the side-by-side comparison modal, and sets the active analytical focus dimension. Use this tool when you want to display a comparison on the user\'s screen.',
      readOnlyHint: false,
      inputSchema: {
        type: 'object',
        properties: {
          politician_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of politician IDs to compare on screen.'
          },
          open_compare_modal: {
            type: 'boolean',
            default: true,
            description: 'Whether to immediately open the full side-by-side CompareModal dialog.'
          },
          switch_view: {
            type: 'string',
            enum: ['grid', 'table', 'analytics', 'map', 'manifesto', 'nepotism-tracker', 'legal-registry'],
            description: 'Optional main view mode to switch to.'
          },
          focus_area: {
            type: 'string',
            enum: ['all', 'parliamentary', 'financial', 'legal', 'initiatives'],
            default: 'all',
            description: 'The specific comparison dimension tab to focus on.'
          }
        },
        required: ['politician_ids']
      },
      execute: async (input: {
        politician_ids: string[];
        open_compare_modal?: boolean;
        switch_view?: string;
        focus_area?: string;
      }) => {
        const rawIds = input.politician_ids || [];
        const resolvedIds: string[] = [];

        for (const rawId of rawIds) {
          const p = await resolvePolitician(rawId);
          if (p && !resolvedIds.includes(p.id)) {
            resolvedIds.push(p.id);
          }
        }

        if (resolvedIds.length === 0) {
          return {
            success: false,
            error: 'None of the provided politician IDs could be resolved.'
          };
        }

        // 1. Update compare list state in React
        controllers.setCompareList(() => resolvedIds);

        // 2. Open comparison modal if requested
        if (input.open_compare_modal !== false) {
          controllers.openCompareModalWithPoliticians(resolvedIds, input.focus_area || 'all');
        }

        // 3. Switch main view mode if requested
        if (input.switch_view) {
          controllers.setViewMode(input.switch_view as any);
        }

        return {
          success: true,
          appliedPoliticians: resolvedIds,
          compareModalOpen: input.open_compare_modal !== false,
          activeFocusArea: input.focus_area || 'all',
          activeViewMode: input.switch_view || 'unchanged'
        };
      }
    },

    // -------------------------------------------------------------
    // TOOL 8: get_evidence_and_affidavits
    // -------------------------------------------------------------
    {
      name: 'get_evidence_and_affidavits',
      description: 'Retrieve verifiable legal cases, sworn ECI Form 26 disclosures, IPC criminal sections, court dockets, historical asset declarations, and flagged contractor tenders for an MP. Use when the user asks for evidence, challenges an analysis, or requests citations for legal/financial claims.',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          politician_id: {
            type: 'string',
            description: 'Unique politician ID (e.g. "amit-shah", "rahul-gandhi", "narendra-modi").'
          },
          evidence_type: {
            type: 'string',
            enum: ['criminal_cases', 'asset_affidavits', 'contracts_and_conflicts', 'all'],
            default: 'all',
            description: 'Specific category of evidentiary records to fetch.'
          }
        },
        required: ['politician_id']
      },
      execute: async (input: { politician_id: string; evidence_type?: string }) => {
        const p = await resolvePolitician(input.politician_id);
        if (!p) {
          return { data_available: false, error: `Politician '${input.politician_id}' not found.` };
        }

        const type = input.evidence_type || 'all';
        const result: Record<string, any> = {
          data_available: true,
          politician_id: p.id,
          politician_name: p.name,
          party: p.partyAbbr,
          verifiedAffidavit: p.verifiedAffidavit
        };

        if (type === 'all' || type === 'criminal_cases') {
          result.criminalCases = (p.criminalRecords?.details || []).map(c => ({
            caseNumber: c.caseNumber,
            court: c.court,
            courtLevel: c.courtLevel || 'District & Sessions Court',
            status: c.status,
            isSerious: c.isSerious,
            ipcSections: c.ipcSections,
            bnsEquivalent: c.bnsEquivalent || null,
            description: c.description,
            yearFiled: c.yearFiled || null
          }));
        }

        if (type === 'all' || type === 'asset_affidavits') {
          result.assetAffidavits = {
            declarationYear: p.assets?.declarationYear,
            movableCr: p.assets?.movableCr,
            immovableCr: p.assets?.immovableCr,
            totalCr: p.assets?.totalCr,
            liabilitiesCr: p.assets?.liabilitiesCr,
            historicalGrowth: p.assets?.history || []
          };
        }

        if (type === 'all' || type === 'contracts_and_conflicts') {
          const flagged = findFlaggedContracts(POLITICIANS_DATA, p.id);
          result.flaggedContractsAndConflicts = flagged.map(f => ({
            companyName: f.contractor.name,
            directors: f.contractor.directors,
            tenderTitle: f.contract.projectDescription,
            tenderValueCr: f.contract.contractValue,
            awardingMinistry: f.contract.awardingDepartment,
            awardedDate: f.contract.awardedDate,
            flagReasons: f.flagReasons,
            conflictDepartment: f.conflictDepartment,
            flagSeverity: f.flagSeverity,
            evidenceSource: f.evidenceSource
          }));
        }

        result.citationSources = [
          'Election Commission of India (ECI) Form 26 Sworn Affidavits',
          'Supreme Court of India & High Court e-Courts National Judicial Data Grid (NJDG)',
          'Ministry of Parliamentary Affairs / Sansad Hansard Records'
        ];

        return result;
      }
    }
  ];
}
