export type Alliance = 'NDA' | 'INDIA' | 'Others' | 'Independent';

export type HouseType = 'Lok Sabha' | 'Rajya Sabha' | 'State Legislative Assembly' | 'State Legislative Council';

export interface ProjectExpenditure {
  title: string;
  costCr: number;
  sector: 'Healthcare' | 'Education' | 'Roads & Infrastructure' | 'Water & Sanitation' | 'Community Centers' | 'Rural Development';
  status: 'Completed' | 'In Progress' | 'Sanctioned';
  location: string;
}

export type LegalCaseCategory = 
  | 'Defamation & Speech' 
  | 'Political Protest & Agitation' 
  | 'Financial & Corporate' 
  | 'Electoral Disclosure & RP Act' 
  | 'Public Order & Assembly' 
  | 'Corruption & Public Integrity' 
  | 'Other Offences';

export type CaseTemporalStatus = 'Current' | 'Previous';

export interface LegalCase {
  id?: string;
  caseNumber: string;
  court: string;
  courtLevel?: 'Supreme Court' | 'High Court' | 'Special MP/MLA Court' | 'District & Sessions Court' | 'CJM / JMFC';
  ipcSections: string[];
  description: string;
  status: 'Under Investigation' | 'Cognizance Taken' | 'Charges Framed' | 'Stayed by High Court' | 'Stayed by Supreme Court' | 'Disposed / Acquitted' | 'Discharged / Quashed';
  caseType?: LegalCaseCategory;
  temporalStatus?: CaseTemporalStatus;
  yearFiled?: number;
  yearResolved?: number;
  isSerious: boolean;
  bnsEquivalent?: string;
  summaryTag?: string;
  tags?: string[];
}

export interface AssetHistory {
  year: number;
  totalCr: number;
  movableCr: number;
  immovableCr: number;
  source: string;
}

export interface LandmarkInitiative {
  title: string;
  year: string;
  category: string;
  description: string;
  impact: string;
}

export interface TimelineEvent {
  year: string;
  role: string;
  achievement: string;
}

export interface PoliticianNews {
  id: string;
  title: string;
  source: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'critical';
  summary: string;
  url?: string;
}

export interface Politician {
  id: string;
  name: string;
  hindiName?: string;
  photo: string;
  bannerImage?: string;
  party: string;
  partyAbbr: string;
  partySymbol?: string;
  partyColor: string;
  alliance: Alliance;
  currentRole: string;
  state: string;
  constituency: string;
  house: HouseType;
  age: number;
  dateOfBirth: string;
  birthPlace: string;
  education: string;
  profession: string;
  spouse?: string;
  bio: string;
  keyStances: string[];
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    wikipedia?: string;
  };
  parliamentaryRecord: {
    attendancePercent: number;
    nationalAvgAttendance: number;
    debatesCount: number;
    questionsAsked: number;
    privateMemberBills: number;
    committeeMemberships: string[];
  };
  mplads: {
    allocatedCr: number;
    spentCr: number;
    utilizationPercent: number;
    completedProjects: number;
    ongoingProjects: number;
    topProjects: ProjectExpenditure[];
  };
  assets: {
    movableCr: number;
    immovableCr: number;
    totalCr: number;
    liabilitiesCr: number;
    declarationYear: number;
    history: AssetHistory[];
  };
  criminalRecords: {
    totalCases: number;
    seriousCases: number;
    chargesFramed: number;
    convicted: boolean;
    details: LegalCase[];
  };
  majorInitiatives: LandmarkInitiative[];
  politicalTimeline: TimelineEvent[];
  news: PoliticianNews[];
  tags: string[];
  verifiedAffidavit: boolean;
}

export type TabType = 'overview' | 'financials' | 'parliament' | 'mplads' | 'legal' | 'initiatives' | 'statements' | 'sources' | 'news';

export type ViewMode = 
  | 'grid' 
  | 'representatives'
  | 'compare' 
  | 'statements' 
  | 'methodology' 
  | 'table' 
  | 'analytics' 
  | 'regional' 
  | 'map' 
  | 'manifesto' 
  | 'tracker' 
  | 'nepotism-tracker' 
  | 'legal-registry';

export type PromiseStatus = 'Fulfilled' | 'In Progress' | 'Under Review' | 'Broken / Stalled' | 'Pending Action';

// ==========================================
// PUBLIC STATEMENTS & VERIFIED EXCERPTS
// ==========================================

export type StatementTopic = 
  | 'Agriculture & Rural Economy'
  | 'Jobs & Employment'
  | 'National Security & Law'
  | 'Economy & Taxation'
  | 'Social Justice & Caste Census'
  | 'Foreign Policy & Diplomacy'
  | 'Constituency & Infrastructure'
  | 'Governance, Constitution & Federalism';

export interface PublicStatement {
  id: string;
  politicianId: string;
  speakerName: string;
  party: string;
  partyAbbr: string;
  date: string; // YYYY-MM-DD
  venue: string; // e.g., 'Lok Sabha Debates', 'Press Conference, New Delhi', 'Public Rally, Varanasi'
  topic: StatementTopic;
  contextSummary: string; // Neutral factual context
  directQuote: string; // Verbatim verified excerpt
  quoteType: 'Direct Quotation' | 'Parliamentary Record Excerpt' | 'Press Release Statement';
  sourceUrl: string;
  sourceLabel: string; // e.g. 'Sansad Hansard Debates (Session 2, 18th LS)', 'PIB Press Release ID 2049182'
  officialSourceType: 'Lok Sabha Hansard' | 'PIB / Ministry Release' | 'Election Commission' | 'Official Gazette' | 'Verified National Daily Record';
  verifiedDate: string;
}

// ==========================================
// EVIDENCE & METHODOLOGY METADATA
// ==========================================

export interface MetricEvidenceMetadata {
  metricName: string;
  value: string | number;
  source: string;
  sourceUrl?: string;
  sourceDate: string;
  reportingPeriod: string;
  lastUpdated: string;
  calculationMethod: string;
  isAvailable: boolean;
  unavailableReason?: string;
  roleContextNote?: string;
}

export interface DataCorrectionRequest {
  id: string;
  politicianName: string;
  metricOrClaim: string;
  suggestedCorrection: string;
  officialSourceUrl: string;
  requesterEmail?: string;
  submissionDate: string;
}

// ==========================================
// NEPOTISM & ASSET GROWTH TRACKER MODELS
// ==========================================

export type AssetOwnerType = 'self' | 'spouse' | 'dependent';

export type AssetCategory = 'land' | 'building' | 'vehicle' | 'jewelry' | 'financial' | 'other';

export interface Asset {
  id: string;
  politicianId: string;
  ownerType: AssetOwnerType;
  ownerName?: string;
  category: AssetCategory;
  description: string;
  declaredValue: number; // in ₹ Crores
  yearDeclared: number;
  sourceDocumentUrl: string;
  location?: string;
  details?: string;
}

export type RelationType = 
  | 'son' 
  | 'daughter' 
  | 'spouse' 
  | 'brother' 
  | 'sister' 
  | 'father' 
  | 'mother' 
  | 'father-in-law' 
  | 'mother-in-law' 
  | 'brother-in-law' 
  | 'sister-in-law' 
  | 'son-in-law' 
  | 'daughter-in-law' 
  | 'cousin' 
  | 'nephew' 
  | 'niece' 
  | 'uncle' 
  | 'aunt' 
  | 'other';

export interface Relative {
  id: string;
  politicianId: string;
  name: string;
  relationType: RelationType;
  designationOrOccupation?: string;
  businessInterests?: string[];
  notes?: string;
}

export interface Contractor {
  id: string;
  name: string;
  registrationNo: string;
  linkedRelativeId?: string;
  entityType?: string;
  state?: string;
  directors?: string[];
}

export type TenderType = 'open' | 'limited' | 'nominated';

export interface GovtContract {
  id: string;
  contractorId: string;
  awardingDepartment: string;
  contractValue: number; // in ₹ Crores
  awardedDate: string; // YYYY-MM-DD
  tenderType: TenderType;
  projectDescription: string;
  sourceDocumentUrl: string;
  status?: 'Awarded' | 'Completed' | 'Under Audit' | 'Executed' | 'In Execution' | 'Active';
}

export interface PoliticianTenure {
  departmentOrMinistry: string;
  role: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD or undefined for Present
  jurisdictionKeywords: string[];
}

export interface FlaggedContract {
  id: string;
  contract: GovtContract;
  contractor: Contractor;
  relative: Relative;
  politician: Politician;
  conflictDepartment: string;
  politicianRoleDuringContract: string;
  tenurePeriod: string;
  flagReasons: string[];
  flagSeverity: 'High' | 'Medium' | 'Informational';
  sourceDocumentUrl: string;
  evidenceSource: string;
}

export interface OwnerGrowthBreakdown {
  baseline: number;
  latest: number;
  growthPercent: number;
  isFlagged: boolean;
}

export interface AssetTimelinePoint {
  year: number;
  self: number;
  spouse: number;
  dependent: number;
  total: number;
  sourceDoc: string;
}

export interface AssetGrowthReport {
  politicianId: string;
  politicianName: string;
  partyAbbr: string;
  partyColor: string;
  alliance: Alliance;
  baselineYear: number;
  baselineValue: number;
  latestYear: number;
  latestValue: number;
  absoluteGrowth: number;
  percentageGrowth: number;
  cagrPercent: number;
  isFlagged: boolean;
  thresholdUsed: number;
  breakdownByOwner: {
    self: OwnerGrowthBreakdown;
    spouse: OwnerGrowthBreakdown;
    dependent: OwnerGrowthBreakdown;
  };
  timelinePoints: AssetTimelinePoint[];
}

export interface ManifestoPromise {
  id: string;
  title: string;
  party: string;
  partyAbbr: string;
  partyColor: string;
  alliance: Alliance;
  manifestoName: string; // e.g. "BJP Sankalp Patra 2024", "Congress Nyay Patra 2024"
  year: number;
  sector: 'Economy & Jobs' | 'Agriculture & Farmers' | 'Infrastructure & Energy' | 'Social Welfare & Justice' | 'Healthcare & Education' | 'Governance & Legal' | 'Defence & Foreign Policy' | 'Digital & Tech';
  description: string;
  status: PromiseStatus;
  progressPercent: number;
  deliveryTimeline: string;
  actionsTaken: string[];
  legislativeAction?: string;
  budgetAllocatedCr?: number;
  citationSource: string;
  relatedMinistersOrMPs?: string[];
}

