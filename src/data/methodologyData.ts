export interface MetricMethodology {
  id: string;
  name: string;
  category: 'Parliamentary Activity' | 'Financial & Assets' | 'Legal & Judicial' | 'Constituency Development' | 'Public Statements';
  officialSource: string;
  sourceUrl: string;
  reportingPeriod: string;
  calculationMethod: string;
  knownLimitations: string;
  ministerVsMemberRule?: string;
}

export const METHODOLOGY_STANDARDS: MetricMethodology[] = [
  {
    id: 'attendance-percent',
    name: 'Parliamentary Attendance Rate (%)',
    category: 'Parliamentary Activity',
    officialSource: 'Lok Sabha Attendance Register / Sansad.in & PRS Legislative Research',
    sourceUrl: 'https://sansad.in/ls',
    reportingPeriod: '18th Lok Sabha (June 2024 to Present)',
    calculationMethod: 'Calculated as: (Days Present / Total Sittings of the Lok Sabha when House was in Session) × 100.',
    knownLimitations: 'Attendance register records physical signature on the House roster before 12:00 PM. Ministers attending Cabinet meetings or answering questions in Rajya Sabha may not sign the Lok Sabha register, leading to statistical variations.',
    ministerVsMemberRule: 'Ministers are exempt from the daily signature roster when on official executive duty or answering questions in the other House. Their parliamentary participation is measured via Ministerial Statements, Replies, and Bills moved.'
  },
  {
    id: 'debates-count',
    name: 'Debate & Speech Interventions',
    category: 'Parliamentary Activity',
    officialSource: 'Sansad Lok Sabha Hansard Official Verbatim Debates',
    sourceUrl: 'https://sansad.in/ls',
    reportingPeriod: '18th Lok Sabha (June 2024 to Present)',
    calculationMethod: 'Count of all distinct recorded speaking interventions in Hansard, including Motion of Thanks, Union Budget discussions, Zero Hour mentions, Rule 377 matters, and legislative clause debates.',
    knownLimitations: 'Brief procedural points of order and short interruptions exceeding 1 sentence may be logged as debate entries depending on Speaker transcription protocol.',
    ministerVsMemberRule: 'For Ministers, debate counts include opening bill presentations, replying to calling-attention motions, and answering debate conclusions. For Opposition and Backbench MPs, counts represent legislative scrutiny and Zero Hour submissions.'
  },
  {
    id: 'questions-asked',
    name: 'Parliamentary Questions Submitted',
    category: 'Parliamentary Activity',
    officialSource: 'Lok Sabha Questions Division (Starred & Unstarred Questions)',
    sourceUrl: 'https://sansad.in/ls',
    reportingPeriod: '18th Lok Sabha (June 2024 to Present)',
    calculationMethod: 'Total count of Starred Questions (requiring oral ministerial reply) and Unstarred Questions (written replies laid on the Table) admitted by the Speaker’s office.',
    knownLimitations: 'Up to 5 MPs can jointly submit a question. A balloting system determines whether a submitted question is selected for oral reply on the floor.',
    ministerVsMemberRule: 'Per Rule 37 of the Rules of Procedure and Conduct of Business in Lok Sabha, Union Cabinet Ministers and Ministers of State do NOT submit questions to the government. They answer questions submitted by other MPs. Displayed as "N/A (Minister)" with full explanatory context.'
  },
  {
    id: 'private-member-bills',
    name: 'Private Member Bills Introduced',
    category: 'Parliamentary Activity',
    officialSource: 'Lok Sabha Bills Division / Sansad Legislative Register',
    sourceUrl: 'https://sansad.in/ls',
    reportingPeriod: '18th Lok Sabha (June 2024 to Present)',
    calculationMethod: 'Count of legislative bills drafted and introduced by non-ministerial MPs for discussion on designated alternate Friday afternoons.',
    knownLimitations: 'Very few Private Member Bills are enacted into law; introduction indicates policy advocacy and legislative initiative rather than government statute passage.',
    ministerVsMemberRule: 'Ministers introduce Government Bills on behalf of the Executive; only non-ministerial MPs introduce Private Member Bills.'
  },
  {
    id: 'mplads-utilization',
    name: 'MPLADS Fund Utilization (%)',
    category: 'Constituency Development',
    officialSource: 'Ministry of Statistics & Programme Implementation (MoSPI) MPLADS Portal',
    sourceUrl: 'https://mplads.gov.in',
    reportingPeriod: '18th Lok Sabha (2024–2029 Cycle)',
    calculationMethod: 'Calculated as: (Total Expenditure Incurred / Total Funds Released by District Authority) × 100.',
    knownLimitations: '₹5 Crore annual entitlement is disbursed in two ₹2.5 Cr tranches upon receipt of utilization certificates from District Collectors. Administrative delays at the district level can depress utilization percentages temporarily.',
    ministerVsMemberRule: 'All Lok Sabha MPs receive equal MPLADS entitlement irrespective of ministerial status, strictly for their elected constituency.'
  },
  {
    id: 'assets-declaration',
    name: 'Asset & Liability Declarations (ECI Form 26)',
    category: 'Financial & Assets',
    officialSource: 'Election Commission of India (ECI) Sworn Affidavits / Association for Democratic Reforms (ADR)',
    sourceUrl: 'https://affidavit.eci.gov.in',
    reportingPeriod: 'General Elections 2024 (Sworn at time of Nomination)',
    calculationMethod: 'Sum of Movable Assets (bank balances, shares, jewelry, vehicles) and Immovable Assets (agricultural land, commercial plots, residential buildings) as declared by the candidate and spouse/dependents.',
    knownLimitations: 'Values represent self-declared market or book value at the time of election filing (April–May 2024). Subsequent appreciation or intra-term acquisitions are declared annually in Parliament or state registers.',
    ministerVsMemberRule: 'Ministers submit additional annual asset declarations to the Prime Minister’s Office (PMO) under the Union Code of Conduct for Ministers.'
  },
  {
    id: 'criminal-records',
    name: 'Disclosed Criminal Cases & Chargesheets',
    category: 'Legal & Judicial',
    officialSource: 'ECI Form 26 Affidavits & National Judicial Data Grid / e-Courts Portal',
    sourceUrl: 'https://affidavit.eci.gov.in',
    reportingPeriod: 'General Elections 2024 (Form 26 Filings) & Judicial Trackers',
    calculationMethod: 'Direct categorization of cases where cognizance has been taken, charges framed, or FIRs lodged as disclosed under Section 33A of the Representation of the People Act, 1951.',
    knownLimitations: 'Filing of an FIR or framing of charges does not constitute conviction. The presumption of innocence applies until final judicial determination by competent courts. Cases arising from political demonstrations and protests are explicitly segregated from financial or violent offences.',
    ministerVsMemberRule: 'Applicable uniformly to all citizens and candidates under the Representation of the People Act, 1951.'
  },
  {
    id: 'public-statements',
    name: 'Verified Public Statements',
    category: 'Public Statements',
    officialSource: 'Sansad Lok Sabha Hansard, PIB Press Releases, Official Spokesperson Records',
    sourceUrl: 'https://pib.gov.in',
    reportingPeriod: '18th Lok Sabha (June 2024 to Present)',
    calculationMethod: 'Exact transcription of spoken debate excerpts or verified press releases with explicit attribution, date, topic tag, and direct source hyperlink.',
    knownLimitations: 'Statements are logged only from official public record sources to eliminate selective out-of-context bias. Direct quotes are strictly separated from neutral context summaries.',
    ministerVsMemberRule: 'Statements made by Ministers inside Parliament carry official policy weight; political statements in personal or party capacity outside Parliament are logged with corresponding venue attribution.'
  }
];

export const DATA_FRESHNESS_INFO = {
  reportingPeriod: '18th Lok Sabha — June 2024 to Present',
  lastAuditDate: 'January 2025',
  parliamentarySessionCoverage: '18th Lok Sabha (Session 1 & Session 2 Winter 2024)',
  affidavitFilingCycle: 'General Elections 2024 (ECI Form 26)',
  mpladsCycle: '18th Lok Sabha 2024–2025 First & Second Tranche Releases',
  disclaimer: 'NetaWatch is an independent, non-partisan civic research platform. All metrics are derived from verified official repositories of the Parliament of India (sansad.in), Election Commission of India (eci.gov.in), and Ministry of Statistics and Programme Implementation (mospi.gov.in).'
};
