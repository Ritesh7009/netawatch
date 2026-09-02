import { NORTH_CONSTITUENCIES } from './constituencies/north';
import { SOUTH_CONSTITUENCIES } from './constituencies/south';
import { WEST_CONSTITUENCIES } from './constituencies/west';
import { CENTRAL_EAST_CONSTITUENCIES } from './constituencies/centralEast';
import { NORTHEAST_CONSTITUENCIES } from './constituencies/northeast';

export interface LokSabhaConstituency {
  id: string;
  constituency: string;
  state: string;
  stateCode: string;
  mpName: string;
  party: string;
  partyAbbr: string;
  partyColor: string;
  alliance: 'NDA' | 'INDIA' | 'Others' | 'Independent';
  house: 'Lok Sabha' | 'Rajya Sabha';
  estimatedNetWorthCr: number;
  attendancePercent: number;
  criminalCases?: number;
  education?: string;
  preloadedId?: string;
}

export type MPConstituencyEntry = LokSabhaConstituency;

/**
 * Complete, verified, 543 Parliamentary Constituencies of India for the 18th Lok Sabha (2024-2029)
 * Covering all 28 States and 8 Union Territories.
 */
export const ALL_543_LOK_SABHA_CONSTITUENCIES: LokSabhaConstituency[] = [
  ...NORTH_CONSTITUENCIES,
  ...SOUTH_CONSTITUENCIES,
  ...WEST_CONSTITUENCIES,
  ...CENTRAL_EAST_CONSTITUENCIES,
  ...NORTHEAST_CONSTITUENCIES,
];

export const COMPLETE_INDIA_543_CONSTITUENCIES = ALL_543_LOK_SABHA_CONSTITUENCIES;

/**
 * Robust helper to filter constituencies by state name or state code,
 * supporting fuzzy aliases for UTs, renamings, and common spelling differences.
 */
export function getConstituenciesByState(stateQuery: string): LokSabhaConstituency[] {
  if (!stateQuery) return [];
  const q = stateQuery.trim().toLowerCase();

  // Direct state code check
  const byCode = ALL_543_LOK_SABHA_CONSTITUENCIES.filter(
    (c) => c.stateCode.toLowerCase() === q
  );
  if (byCode.length > 0) return byCode;

  // Direct state name match
  const direct = ALL_543_LOK_SABHA_CONSTITUENCIES.filter(
    (c) => c.state.toLowerCase() === q
  );
  if (direct.length > 0) return direct;

  // Normalized alias checks
  if (q.includes('delhi')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'DL');
  }
  if (q.includes('kashmir') || q.includes('jammu')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'JK');
  }
  if (q.includes('orissa') || q.includes('odisha')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'OD');
  }
  if (q.includes('pondicherry') || q.includes('puducherry')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'PY');
  }
  if (q.includes('andaman') || q.includes('nicobar')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'AN');
  }
  if (q.includes('daman') || q.includes('diu') || q.includes('dadra') || q.includes('nagar haveli')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'DN');
  }
  if (q.includes('uttarakhand') || q.includes('uttaranchal')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'UK');
  }
  if (q.includes('ladakh')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'LA');
  }
  if (q.includes('lakshadweep')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'LK');
  }
  if (q.includes('chhattisgarh') || q.includes('chhatisgarh')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'CG');
  }
  if (q.includes('tamil') || q.includes('nadu')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'TN');
  }
  if (q.includes('andhra') || q.includes('pradesh') && q.includes('andhra')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'AP');
  }
  if (q.includes('madhya') || q.includes('mp')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'MP');
  }
  if (q.includes('uttar') && q.includes('pradesh')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'UP');
  }
  if (q.includes('west') && q.includes('bengal')) {
    return ALL_543_LOK_SABHA_CONSTITUENCIES.filter((c) => c.stateCode === 'WB');
  }

  // Broad substring match
  return ALL_543_LOK_SABHA_CONSTITUENCIES.filter(
    (c) =>
      c.state.toLowerCase().includes(q) ||
      q.includes(c.state.toLowerCase()) ||
      c.stateCode.toLowerCase() === q
  );
}

/**
 * Helper to find a specific constituency by ID, slug, or name.
 */
export function findConstituencyById(id: string): LokSabhaConstituency | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();

  return ALL_543_LOK_SABHA_CONSTITUENCIES.find(
    (c) =>
      c.id.toLowerCase() === cleanId ||
      c.constituency.toLowerCase() === cleanId ||
      c.constituency.toLowerCase().replace(/[^a-z0-9]/g, '-') === cleanId ||
      (c.preloadedId && c.preloadedId.toLowerCase() === cleanId) ||
      c.mpName.toLowerCase() === cleanId
  );
}

/**
 * Filter constituencies across all India by search keyword
 */
export function searchConstituencies(query: string): LokSabhaConstituency[] {
  if (!query || !query.trim()) return ALL_543_LOK_SABHA_CONSTITUENCIES;
  const q = query.toLowerCase().trim();

  return ALL_543_LOK_SABHA_CONSTITUENCIES.filter(
    (c) =>
      c.constituency.toLowerCase().includes(q) ||
      c.mpName.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.party.toLowerCase().includes(q) ||
      c.partyAbbr.toLowerCase().includes(q) ||
      c.alliance.toLowerCase().includes(q)
  );
}
