/**
 * India-wide Political Representation & Administrative Data Models
 * 
 * Implements the core relational hierarchy:
 * Location -> Geographic Boundary -> Administrative Unit -> Electoral Constituency -> Political Office -> Office Holder -> Person -> Term -> Evidence
 */

// ==========================================
// 1. ADMINISTRATIVE & GEOGRAPHIC ENTITIES
// ==========================================

export type AdministrativeLevel = 
  | 'country'
  | 'state_ut'
  | 'division'
  | 'district'
  | 'subdistrict_tehsil'
  | 'block'
  | 'urban_local_body'
  | 'village'
  | 'ward';

export type ElectoralLevel =
  | 'national'       // Lok Sabha, Rajya Sabha
  | 'state'          // Legislative Assembly (Vidhan Sabha), Legislative Council (Vidhan Parishad)
  | 'urban_local'    // Municipal Corporation, Municipality, Nagar Panchayat
  | 'rural_local'    // Zila Parishad, Panchayat Samiti / Block Panchayat, Gram Panchayat
  | 'autonomous';    // 6th Schedule Autonomous District Council (e.g. Bodoland, Karbi Anglong, KHADC)

export type LocalBodyType = 
  | 'Municipal Corporation (Nagar Nigam)'
  | 'Municipality (Nagar Palika Parishad)'
  | 'Town Panchayat (Nagar Panchayat)'
  | 'Cantonment Board'
  | 'Zila Parishad (District Council)'
  | 'Panchayat Samiti / Taluka Panchayat'
  | 'Gram Panchayat'
  | 'Autonomous District Council';

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}

export interface GeoBoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface GeographicBoundary {
  id: string;
  entityId: string;
  entityType: 'parliamentary' | 'assembly' | 'district' | 'local_body' | 'ward' | 'panchayat';
  version: string;             // e.g. "Delimitation 2008", "Delimitation 2024", "J&K Delimitation 2022"
  effectiveFrom: string;       // ISO Date
  effectiveTo?: string;        // ISO Date or null for active
  centroid: GeoCoordinate;
  boundingBox?: GeoBoundingBox;
  geoJsonType?: 'Polygon' | 'MultiPolygon' | 'Point';
  source: string;              // e.g. "Election Commission of India / Survey of India / Bharatmaps"
  sourceUrl?: string;
  verificationStatus: 'verified' | 'provisional' | 'inferred';
}

export interface AdministrativeUnit {
  id: string;
  officialName: string;
  normalizedName: string;
  hindiName?: string;
  level: AdministrativeLevel;
  parentUnitId?: string;
  state: string;
  stateCode: string;
  district?: string;
  censusCode?: string;
  lgdCode?: string;            // Local Government Directory code (Ministry of Panchayati Raj)
  effectiveDate: string;
  isBicameralState?: boolean;  // Has Legislative Council
  localBodyType?: LocalBodyType;
  verificationStatus: 'verified' | 'official' | 'pending';
}

// ==========================================
// 2. ELECTORAL CONSTITUENCY & POLITICAL OFFICES
// ==========================================

export interface ElectoralConstituency {
  id: string;
  constituencyNumber: number;
  officialName: string;
  normalizedName: string;
  hindiName?: string;
  level: ElectoralLevel;
  house: 'Lok Sabha' | 'Rajya Sabha' | 'Vidhan Sabha' | 'Vidhan Parishad' | 'Urban Ward' | 'Rural Panchayat';
  state: string;
  stateCode: string;
  district?: string;
  category: 'GEN' | 'SC' | 'ST';
  totalElectors?: number;
  parliamentaryConstituencyId?: string; // For Assembly constituencies, points to parent Lok Sabha constituency
  administrativeUnitId?: string;
  boundaryVersion: string;
  boundary?: GeographicBoundary;
}

export interface PoliticalOffice {
  id: string;
  title: string;
  shortTitle: string;
  hindiTitle?: string;
  level: ElectoralLevel;
  tierCategory: 'National Executive & Legislature' | 'State Executive & Legislature' | 'Urban Civic Governance' | 'Rural Panchayati Governance';
  description: string;
  jurisdictionType: 'parliamentary_constituency' | 'assembly_constituency' | 'state' | 'municipal_ward' | 'municipal_body' | 'gram_panchayat' | 'zila_parishad';
  isDirectlyElected: boolean;
  termLengthYears: number;
  constitutionalReference?: string; // e.g. "Article 81 (Lok Sabha)", "Article 170 (Vidhan Sabha)", "74th Amendment Act (Wards)"
}

// ==========================================
// 3. PERSON & OFFICE HOLDER & TERM
// ==========================================

export interface PersonRecord {
  id: string;
  fullName: string;
  normalizedName: string;
  hindiName?: string;
  aliases: string[];
  photoUrl?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  education?: string;
  profession?: string;
  officialEmail?: string;
  officialPhone?: string;
  officeAddress?: string;
  socialHandles?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  eciCandidateId?: string;
  sansadMemberId?: string;
  adWatchId?: string;
  isVerifiedPerson: boolean;
}

export interface RepresentativeTerm {
  id: string;
  personId: string;
  officeId: string;
  constituencyId: string;
  constituencyName: string;
  state: string;
  level: ElectoralLevel;
  house: string;
  partyName: string;
  partyAbbr: string;
  partyColor: string;
  alliance: 'NDA' | 'INDIA' | 'Others' | 'Independent';
  startDate: string;           // YYYY-MM-DD
  endDate?: string;             // YYYY-MM-DD or null if currently active
  isCurrent: boolean;
  termOrdinal?: string;         // e.g. "18th Lok Sabha", "16th Madhya Pradesh Vidhan Sabha"
  electionYear: number;
  marginVotes?: number;
  voteSharePercent?: number;
  runnerUpName?: string;
  runnerUpParty?: string;
  evidenceIds: string[];
  legislativeStats?: {
    attendancePercent?: number;
    debatesCount?: number;
    questionsAsked?: number;
    billsIntroduced?: number;
    mpladsSpentCr?: number;
    localProjectsCompleted?: number;
  };
  declaredAssetsCr?: number;
  criminalCasesCount?: number;
}

// ==========================================
// 4. EVIDENCE & SOURCES
// ==========================================

export type EvidenceSourceType =
  | 'ECI Official Results (results.eci.gov.in)'
  | 'ECI Form 26 Sworn Affidavit'
  | 'Sansad Lok Sabha / Rajya Sabha Portal'
  | 'State Legislative Assembly Secretariat'
  | 'State Election Commission (SEC) Gazette'
  | 'Urban Local Body Municipal Portal'
  | 'Ministry of Panchayati Raj / LGD Portal'
  | 'Official State Government Gazette'
  | 'PRS Legislative Research Archive';

export interface EvidenceRecord {
  id: string;
  sourceName: EvidenceSourceType | string;
  sourceUrl: string;
  title: string;
  documentType: 'Election Return Form 20/21E' | 'Affidavit' | 'Gazette Notification' | 'Official Bio' | 'Municipal Roll';
  publicationDate: string;
  retrievedDate: string;
  verificationStatus: 'Official Government Record' | 'Verified Statutory Disclosure' | 'Pending Public Verification';
  confidenceScore: number;     // 0.0 to 1.0 (e.g. 0.99 for official ECI gazette)
  notes?: string;
}

// ==========================================
// 5. LOCATION RESOLUTION & HIERARCHY PAYLOADS
// ==========================================

export interface LocationHierarchyNode {
  tier: 'National' | 'State' | 'District' | 'Subdistrict' | 'Urban / Rural Body' | 'Ward / Panchayat';
  name: string;
  type: string;
  unitId: string;
  parentUnitId?: string;
  code?: string;
  representative?: {
    personId: string;
    personName: string;
    partyAbbr: string;
    partyColor: string;
    officeTitle: string;
    photoUrl?: string;
    termSpan: string;
    isCurrent: boolean;
    evidenceStatus: string;
  };
}

export interface ResolvedLocationResponse {
  resolvedLocation: {
    formattedAddress?: string;
    pinCode?: string;
    latitude?: number;
    longitude?: number;
    country: string;
    state: string;
    stateCode: string;
    isBicameral: boolean;
    district: string;
    subdistrictOrTehsil?: string;
    localBodyName: string;
    localBodyType: LocalBodyType;
    wardOrPanchayatName: string;
    wardNumber?: number;
    lokSabhaConstituency: string;
    lokSabhaNumber?: number;
    assemblyConstituency: string;
    assemblyNumber?: number;
    resolutionConfidence: 'Exact Coordinate Match' | 'Verified PIN Code Boundary' | 'Structured Jurisdiction Match';
  };
  administrativeHierarchy: LocationHierarchyNode[];
  electoralHierarchy: {
    level: ElectoralLevel;
    office: string;
    officeDetails: PoliticalOffice;
    constituency: ElectoralConstituency;
    currentRepresentative: {
      person: PersonRecord;
      term: RepresentativeTerm;
      evidence: EvidenceRecord[];
    } | null;
    historicalRepresentatives: Array<{
      person: PersonRecord;
      term: RepresentativeTerm;
      evidence: EvidenceRecord[];
    }>;
    isDataAvailable: boolean;
    unavailabilityReason?: string;
  }[];
  allEvidence: EvidenceRecord[];
  metadata: {
    queriedAt: string;
    cacheStatus: 'HIT' | 'LIVE_RESOLVED';
    dataIntegrityCheck: 'PASSED' | 'WARNING';
  };
}
