// Google Analytics 4 (GA4) integration utility

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-9ETMBD2ZK8';

/**
 * Track custom events in GA4
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...additionalParams,
    });
  }
}

/**
 * Pre-defined tracking helpers for NetaWatch actions
 */
export const analytics = {
  // Track viewing a politician's dossier
  viewPolitician: (name: string, party: string, constituency: string, state: string) => {
    trackEvent('view_dossier', 'Politicians', name, undefined, {
      politician_name: name,
      party_abbr: party,
      constituency: constituency,
      state: state,
    });
  },

  // Track comparing politicians
  comparePoliticians: (politicianNames: string[]) => {
    trackEvent('compare_leaders', 'Comparison', politicianNames.join(' vs '), politicianNames.length, {
      compared_leaders: politicianNames,
    });
  },

  // Track search queries
  search: (query: string, resultCount: number) => {
    trackEvent('search', 'Engagement', query, resultCount, {
      search_term: query,
      results_count: resultCount,
    });
  },

  // Track switching views
  switchView: (viewMode: string) => {
    trackEvent('switch_view', 'Navigation', viewMode, undefined, {
      view_mode: viewMode,
    });
  },

  // Track 543 MPs AI Dossier Generation
  generateMPDossier: (constituency: string, state: string) => {
    trackEvent('generate_mp_dossier', '543_Directory', `${constituency}, ${state}`, undefined, {
      constituency,
      state,
    });
  },

  // Track sharing an MP dossier
  shareDossier: (politicianName: string, party: string, method: string) => {
    trackEvent('share_dossier', 'Engagement', `${politicianName} (${party}) via ${method}`, undefined, {
      politician_name: politicianName,
      party_abbr: party,
      share_method: method,
    });
  },
};
