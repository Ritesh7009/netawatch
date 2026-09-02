import { Politician, ViewMode, StatementTopic } from '../types';

export interface ParsedQueryResult {
  type: 'compare' | 'statements' | 'navigate' | 'select-politician' | 'unknown';
  politicians?: Politician[];
  viewMode?: ViewMode;
  statementTopic?: StatementTopic | 'All';
  selectedPolitician?: Politician;
  feedbackMessage?: string;
}

export function parseNaturalLanguageQuery(
  rawQuery: string,
  allPoliticians: Politician[]
): ParsedQueryResult {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return { type: 'unknown' };

  // 1. Comparison Request Check (e.g. "compare amit shah, rahul gandhi and shivraj", "modi vs rahul")
  const isCompareIntent = 
    query.includes('compare') || 
    query.includes(' vs ') || 
    query.includes(' versus ') || 
    (query.includes(' and ') && query.split(/\s+/).length >= 4);

  // Match multiple politicians mentioned in query
  const matchedPoliticians: Politician[] = [];
  allPoliticians.forEach((p) => {
    const nameLower = p.name.toLowerCase();
    const parts = nameLower.split(/\s+/);
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];

    // Check full name or significant last name
    if (query.includes(nameLower)) {
      if (!matchedPoliticians.some(m => m.id === p.id)) {
        matchedPoliticians.push(p);
      }
    } else if (lastName.length > 4 && query.includes(lastName)) {
      if (!matchedPoliticians.some(m => m.id === p.id)) {
        matchedPoliticians.push(p);
      }
    } else if (firstName.length > 4 && query.includes(firstName) && isCompareIntent) {
      if (!matchedPoliticians.some(m => m.id === p.id)) {
        matchedPoliticians.push(p);
      }
    }
  });

  if (isCompareIntent && matchedPoliticians.length >= 2) {
    return {
      type: 'compare',
      politicians: matchedPoliticians.slice(0, 4),
      viewMode: 'compare',
      feedbackMessage: `Comparing ${matchedPoliticians.map(p => p.name).join(', ')} in the Accountability Matrix.`
    };
  }

  // 2. Statements Intent Check (e.g. "compare statements on agriculture", "statements by rahul gandhi")
  if (query.includes('statement') || query.includes('speech') || query.includes('quote') || query.includes('stance')) {
    let topic: StatementTopic | 'All' = 'All';
    if (query.includes('agri') || query.includes('farm') || query.includes('msp') || query.includes('kisan')) {
      topic = 'Agriculture & Rural Economy';
    } else if (query.includes('job') || query.includes('employ') || query.includes('unemploy') || query.includes('gig')) {
      topic = 'Jobs & Employment';
    } else if (query.includes('secur') || query.includes('terror') || query.includes('police') || query.includes('border')) {
      topic = 'National Security & Law';
    } else if (query.includes('econ') || query.includes('tax') || query.includes('budget') || query.includes('invest')) {
      topic = 'Economy & Taxation';
    } else if (query.includes('caste') || query.includes('census') || query.includes('social justice') || query.includes('obc')) {
      topic = 'Social Justice & Caste Census';
    } else if (query.includes('foreign') || query.includes('diplomacy') || query.includes('global') || query.includes('world')) {
      topic = 'Foreign Policy & Diplomacy';
    } else if (query.includes('constituency') || query.includes('infra') || query.includes('road')) {
      topic = 'Constituency & Infrastructure';
    }

    return {
      type: 'statements',
      viewMode: 'statements',
      statementTopic: topic,
      feedbackMessage: `Opening Public Statements filtered to ${topic}.`
    };
  }

  // 3. Parliamentary / Hansard Intent Check (e.g. "show parliamentary activity only", "attendance ledger")
  if (query.includes('parliament') || query.includes('hansard') || query.includes('attendance') || query.includes('debate') || query.includes('ledger') || query.includes('activity only')) {
    return {
      type: 'navigate',
      viewMode: 'table',
      feedbackMessage: 'Opening Parliamentary Hansard Activity Ledger.'
    };
  }

  // 4. Legal / Criminal Cases Check
  if (query.includes('case') || query.includes('criminal') || query.includes('court') || query.includes('affidavit') || query.includes('ipc') || query.includes('bns')) {
    return {
      type: 'navigate',
      viewMode: 'legal-registry',
      feedbackMessage: 'Opening 251 Disclosed Criminal Charges & Court Registry.'
    };
  }

  // 5. Map / Constituency Intent
  if (query.includes('map') || query.includes('constituency') || query.includes('state') || query.includes('district')) {
    return {
      type: 'navigate',
      viewMode: 'map',
      feedbackMessage: 'Opening 543 Parliamentary Constituency Interactive Map.'
    };
  }

  // 6. Manifesto / Promises Check
  if (query.includes('promise') || query.includes('manifesto') || query.includes('nda') || query.includes('india alliance')) {
    return {
      type: 'navigate',
      viewMode: 'manifesto',
      feedbackMessage: 'Opening Manifesto & Guarantee Audit Tracker.'
    };
  }

  // 7. Methodology & Calculation Formula Check
  if (query.includes('methodology') || query.includes('formula') || query.includes('how this was calculated') || query.includes('source') || query.includes('audit standard')) {
    return {
      type: 'navigate',
      viewMode: 'methodology',
      feedbackMessage: 'Opening Civic Research Methodology & Source Standards.'
    };
  }

  // 8. Single Politician exact / best match
  if (matchedPoliticians.length === 1) {
    return {
      type: 'select-politician',
      selectedPolitician: matchedPoliticians[0],
      feedbackMessage: `Opening verified dossier for ${matchedPoliticians[0].name}.`
    };
  }

  return { type: 'unknown' };
}
