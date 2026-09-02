import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CuriosityTicker } from './components/CuriosityTicker';
import { InvestigativeTickerBar } from './components/InvestigativeTickerBar';
import { AmbientMeshCanvas } from './components/AmbientMeshCanvas';
import { HeroOverview } from './components/HeroOverview';
import { TornadoModuleShowcase } from './components/TornadoModuleShowcase';
import { MPNewsDialDeck } from './components/MPNewsDialDeck';
import { TrustPillars } from './components/TrustPillars';
import { TabbedFeatureVault } from './components/TabbedFeatureVault';
import { NetaWatchArcDeck } from './components/NetaWatchArcDeck';
import { TrendingShowcaseGallery } from './components/TrendingShowcaseGallery';
import { AuditUpdatesStrip } from './components/AuditUpdatesStrip';
import { Footer } from './components/Footer';

import { PoliticianDossierModal } from './components/PoliticianDossierModal';
import { CompareModal } from './components/CompareModal';
import { TableView } from './components/TableView';
import { AnalyticsView } from './components/AnalyticsView';
import { InteractiveMapPage } from './components/InteractiveMapPage';
import { ManifestoTracker } from './components/ManifestoTracker';
import { NepotismAssetTrackerView } from './components/NepotismAssetTrackerView';
import { LegalRegistryView } from './components/LegalRegistryView';
import { TransparencyGuideModal } from './components/TransparencyGuideModal';
import { AllIndiaMPRegistryModal } from './components/AllIndiaMPRegistryModal';
import { AgentNotificationToast } from './components/AgentNotificationToast';
import { useWebMCP } from './webmcp/useWebMCP';
import { WebMCPAgentWorkspace } from './webmcp/WebMCPAgentWorkspace';
import { WebMCPStateControllers } from './webmcp/types';
import { ComparisonFocusArea } from './components/CompareModal';

import { POLITICIANS_DATA, ALL_543_POLITICIANS } from './data/politicians';
import { Politician, ViewMode } from './types';
import { UserLocationInfo, detectUserLocation } from './utils/geolocation';
import { Scale, ArrowRight, LayoutGrid, Gavel, Map, FileCheck, Sparkles, BarChart3, TrendingUp, Cpu } from 'lucide-react';
import { PoliticianImage } from './components/PoliticianImage';
import { analytics } from './utils/analytics';

export default function App() {
  const [politicians, setPoliticians] = useState<Politician[]>(ALL_543_POLITICIANS);
  const [selectedPolitician, setSelectedPolitician] = useState<Politician | null>(null);
  const [compareList, setCompareList] = useState<Politician[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparisonFocusArea, setComparisonFocusArea] = useState<ComparisonFocusArea>('all');
  const [isTransparencyGuideOpen, setIsTransparencyGuideOpen] = useState(false);
  const [isAllIndiaDirectoryOpen, setIsAllIndiaDirectoryOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocationInfo | null>(null);

  // WebMCP State Controllers for Actuation
  const controllers: WebMCPStateControllers = useMemo(() => ({
    setSelectedPoliticianId: (id: string | null) => {
      if (!id) {
        setSelectedPolitician(null);
      } else {
        const p = politicians.find((pol) => pol.id === id) || null;
        setSelectedPolitician(p);
      }
    },
    setCompareList: (updater: (prev: string[]) => string[]) => {
      setCompareList((prevList) => {
        const prevIds = prevList.map((p) => p.id);
        const newIds = updater(prevIds);
        return politicians.filter((p) => newIds.includes(p.id));
      });
    },
    openCompareModalWithPoliticians: (ids: string[], focusArea?: string) => {
      const matched = politicians.filter((p) => ids.includes(p.id));
      if (matched.length > 0) {
        setCompareList(matched);
      }
      if (focusArea) {
        setComparisonFocusArea(focusArea as ComparisonFocusArea);
      }
      setIsCompareModalOpen(true);
    },
    setViewMode: (mode: ViewMode) => {
      setViewMode(mode);
    },
    openDossierModal: (politicianId: string) => {
      const p = politicians.find((pol) => pol.id === politicianId);
      if (p) {
        setSelectedPolitician(p);
      }
    },
  }), [politicians]);

  // Initialize WebMCP hook & tool registry
  const {
    isWebMCPSupported,
    agentStatus,
    logs,
    tools,
    isWorkspaceOpen,
    setIsWorkspaceOpen,
    activeInvestigation,
    setActiveInvestigation,
    agentNotification,
    setAgentNotification,
    executeAgentTool,
    clearLogs
  } = useWebMCP({ controllers });

  const handleInvestigateWithAgent = (politicianIds: string[], promptObjective?: string) => {
    setActiveInvestigation({
      politicianIds,
      focusArea: comparisonFocusArea || 'all',
      lastUpdated: Date.now()
    });
    setIsWorkspaceOpen(true);
    if (politicianIds.length === 1) {
      executeAgentTool('get_politician_profile', { politician_id: politicianIds[0] });
    } else if (politicianIds.length >= 2) {
      executeAgentTool('compare_politicians_matrix', { politician_ids: politicianIds, focus_area: 'all' });
    }
  };

  // Initialize Geolocation once at root level for regional metrics
  useEffect(() => {
    let isMounted = true;
    detectUserLocation().then((loc) => {
      if (isMounted) setUserLocation(loc);
    }).catch((err) => console.error(err));
    return () => {
      isMounted = false;
    };
  }, []);

  // Deep-linking URL Support: Read URL query param ?mp=<id> on load & popstate
  useEffect(() => {
    const handleUrlDeepLink = () => {
      if (typeof window === 'undefined') return;
      const urlParams = new URLSearchParams(window.location.search);
      const mpParam = urlParams.get('mp') || urlParams.get('id');
      const hashParam = window.location.hash.replace(/^#(mp-|dossier-)?/, '');
      
      const targetParam = mpParam || (hashParam ? hashParam : null);
      if (!targetParam) return;

      const normalized = targetParam.toLowerCase().trim();
      const matched = politicians.find(
        (p) =>
          p.id.toLowerCase() === normalized ||
          p.name.toLowerCase().replace(/\s+/g, '-') === normalized ||
          p.name.toLowerCase() === normalized
      );

      if (matched) {
        setSelectedPolitician(matched);
        analytics.viewPolitician(matched.name, matched.partyAbbr, matched.constituency, matched.state);
      }
    };

    handleUrlDeepLink();
    window.addEventListener('popstate', handleUrlDeepLink);
    return () => window.removeEventListener('popstate', handleUrlDeepLink);
  }, [politicians]);

  // Keep browser URL and SEO Document Title synchronized when politician is opened/closed or view changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (selectedPolitician) {
      document.title = `${selectedPolitician.name} (${selectedPolitician.partyAbbr}) - MP Dossier | NetaWatch`;
      url.searchParams.set('mp', selectedPolitician.id);
      window.history.replaceState({ mpId: selectedPolitician.id }, '', url.toString());
    } else {
      // Dynamic view-based SEO titles
      const viewTitles: Record<ViewMode, string> = {
        grid: 'NetaWatch - Indian Political Intelligence & Leader Dossiers | 18th Lok Sabha',
        compare: 'Compare Leaders - 18th Lok Sabha Side-by-Side Matrix | NetaWatch',
        statements: 'Verified Public & Parliamentary Statements Explorer | NetaWatch',
        methodology: 'Civic Research Methodology & Source Standards | NetaWatch',
        'legal-registry': 'Criminal Affidavits & Serious Charges Ledger | NetaWatch',
        table: '543 Lok Sabha MPs Master Directory | NetaWatch',
        map: 'Interactive 543 Lok Sabha Constituency Map | NetaWatch',
        manifesto: '2024 Manifesto Promises & Delivery Tracker | NetaWatch',
        'nepotism-tracker': 'Dynasty & Nepotism Lineage Radar | NetaWatch',
        tracker: 'Wealth Surge & Conflict of Interest Radar | NetaWatch',
        analytics: 'Parliamentary Wealth & Attendance Analytics | NetaWatch',
        regional: 'State-by-State Parliamentary Breakdown | NetaWatch',
      };
      document.title = viewTitles[viewMode] || 'NetaWatch - Indian Political Intelligence & Leader Dossiers';

      if (url.searchParams.has('mp') || url.searchParams.has('id')) {
        url.searchParams.delete('mp');
        url.searchParams.delete('id');
        const cleanUrl = url.pathname + (url.search ? url.search : '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }
  }, [selectedPolitician, viewMode]);

  // Handle adding newly generated MP dossier
  const handleAddNewPolitician = (newP: Politician) => {
    setPoliticians((prev) => {
      const exists = prev.some((p) => p.id === newP.id || p.name.toLowerCase() === newP.name.toLowerCase());
      if (exists) {
        return prev.map((p) => (p.id === newP.id ? newP : p));
      }
      return [newP, ...prev];
    });
  };

  // Compare List Management
  const handleToggleCompare = (p: Politician) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === p.id);
      if (exists) {
        return prev.filter((item) => item.id !== p.id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), p];
        }
        return [...prev, p];
      }
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddToCompare = (p: Politician) => {
    if (!compareList.some((item) => item.id === p.id)) {
      if (compareList.length >= 4) {
        setCompareList([...compareList.slice(1), p]);
      } else {
        setCompareList([...compareList, p]);
      }
    }
  };

  const handleOpenCompareWith = (p: Politician) => {
    handleAddToCompare(p);
    setSelectedPolitician(null);
    setIsCompareModalOpen(true);
  };

  // Helper to open politician by name from promises or external triggers
  const handleSelectPoliticianByName = (name: string) => {
    const p = politicians.find(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(item.name.toLowerCase())
    );
    if (p) {
      analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
      setSelectedPolitician(p);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#18181b] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative w-full max-w-full overflow-x-hidden">
      
      {/* Background Interactive Ambient Canvas */}
      <AmbientMeshCanvas />

      {/* 1. GLOBAL NAV (Sticky, collapsing on scroll) */}
      <Navbar
        politicians={politicians}
        selectedPolitician={selectedPolitician}
        onSelectPolitician={(p) => {
          analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
          setSelectedPolitician(p);
        }}
        viewMode={viewMode}
        onViewModeChange={(m) => {
          analytics.switchView(m);
          setViewMode(m);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        compareList={compareList}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenTransparencyGuide={() => setIsTransparencyGuideOpen(true)}
        onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onOpenAgentWorkspace={() => setIsWorkspaceOpen(true)}
        agentCallCount={logs.length}
        isWebMCPReady={isWebMCPSupported}
      />

      {/* 2. LIVE CIVIC AUDIT MARQUEE TICKER */}
      <CuriosityTicker
        politicians={politicians}
        onSelectPolitician={(p) => {
          analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
          setSelectedPolitician(p);
        }}
        onNavigateToView={(view) => {
          setViewMode(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full relative z-10 pb-20 md:pb-0">
        
        {/* HOMEPAGE VIEW: Full Showcase Sequence */}
        {viewMode === 'grid' && (
          <div className="space-y-0">
            
            {/* 3. HERO SECTION */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <HeroOverview
                politicians={politicians}
                onSelectPolitician={(p) => {
                  analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                  setSelectedPolitician(p);
                }}
                onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
                onOpenTransparencyGuide={() => setIsTransparencyGuideOpen(true)}
                onNavigateToView={(v) => {
                  setViewMode(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAgentWorkspace={() => setIsWorkspaceOpen(true)}
              />
            </div>

            {/* 4. TORNADO CARDS — MODULE SHOWCASE (Scattered Tilted Arc) */}
            <TornadoModuleShowcase
              onNavigateToView={(v) => {
                setViewMode(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
            />

            {/* 5. MP NEWS DIAL DECK (Animated Live Scrutiny Decks) */}
            <MPNewsDialDeck
              politicians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onNavigateToView={(v) => {
                setViewMode(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. TRUST / VALUE PILLARS (Three-Row List) */}
            <TrustPillars />

            {/* 7. TABBED FEATURE VAULT (Filter & Sort Surface) */}
            <TabbedFeatureVault
              politicians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
              onNavigateToView={(v) => {
                setViewMode(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 8. CURVED RADIAL ARC DECK SPOTLIGHT */}
            <NetaWatchArcDeck
              politicians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onNavigateToView={(v) => {
                setViewMode(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
            />

            {/* 9. NEWSLETTER / UPDATES STRIP */}
            <AuditUpdatesStrip />

          </div>
        )}

        {/* VIEW 6: MP PERFORMANCE MATRIX (Dedicated sortable data table) */}
        {viewMode === 'table' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <TableView
              politicians={politicians}
              onSelect={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              onBackToOverview={() => setViewMode('grid')}
            />
          </div>
        )}

        {/* VIEW 7: NATIONAL ANALYTICS & CHARTS (Dedicated aggregate visualizers) */}
        {viewMode === 'analytics' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <AnalyticsView
              politicians={politicians}
              onSelect={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onBackToOverview={() => setViewMode('grid')}
            />
          </div>
        )}

        {/* VIEW 2: LEGAL REGISTRY OF ALL CASES */}
        {viewMode === 'legal-registry' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <LegalRegistryView
              politicians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onBackToOverview={() => setViewMode('grid')}
            />
          </div>
        )}

        {/* VIEW 3: INTERACTIVE INDIA MAP */}
        {viewMode === 'map' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <InteractiveMapPage
              preloadedPoliticians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onBackToOverview={() => setViewMode('grid')}
              userLocation={userLocation}
            />
          </div>
        )}

        {/* VIEW 4: 2024 MANIFESTO & PROMISE TRACKER */}
        {viewMode === 'manifesto' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <ManifestoTracker
              onSelectPoliticianByName={handleSelectPoliticianByName}
              onBackToOverview={() => setViewMode('grid')}
            />
          </div>
        )}

        {/* VIEW 5: NEPOTISM & ASSET GROWTH TRACKER */}
        {viewMode === 'nepotism-tracker' && (
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6">
            <NepotismAssetTrackerView
              politicians={politicians}
              onSelectPolitician={(p) => {
                analytics.viewPolitician(p.name, p.partyAbbr, p.constituency, p.state);
                setSelectedPolitician(p);
              }}
              onBackToOverview={() => setViewMode('grid')}
            />
          </div>
        )}

      </main>

      {/* 10. FOOTER (With giant outlined NETAWATCH wordmark) */}
      <Footer
        onNavigateToView={(v) => {
          setViewMode(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTransparencyGuide={() => setIsTransparencyGuideOpen(true)}
        onOpenAllIndiaDirectory={() => setIsAllIndiaDirectoryOpen(true)}
      />

      {/* Floating Compare Dock (when leaders are added to compare) */}
      {compareList.length > 0 && !isCompareModalOpen && (
        <div className="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-30 flex max-w-[94vw] w-max items-center gap-2.5 sm:gap-3 border-2 border-[#18181b] bg-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 rounded-full">
          <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
            {compareList.map((p) => (
              <div key={p.id} className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden border-2 border-white bg-[#f1ede4] rounded-full">
                <PoliticianImage
                  src={p.photo}
                  alt={p.name}
                  name={p.name}
                  partyColor={p.partyColor}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-[11px] sm:text-xs font-medium text-[#18181b] truncate">
            <strong className="font-serif font-black">{compareList.length}</strong> <span className="hidden xs:inline">to compare</span>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 border border-[#18181b] bg-[#18181b] px-3 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#c44d31] hover:border-[#c44d31] transition flex-shrink-0 touch-manipulation min-h-[32px] sm:min-h-[36px] rounded-full cursor-pointer"
          >
            <span>Compare</span>
            <Scale className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Dock (Phone Screens Only) */}
      <nav 
        aria-label="Mobile Navigation Bar" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f8f6f0]/95 backdrop-blur-md border-t border-[#18181b]/20 px-2 py-1.5 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      >
        <button
          onClick={() => {
            setViewMode('grid');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xs min-w-[50px] transition-colors ${
            viewMode === 'grid' ? 'text-[#c44d31] font-bold' : 'text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="text-[9px] uppercase tracking-wider font-mono">Overview</span>
        </button>

        <button
          onClick={() => {
            analytics.switchView('legal-registry');
            setViewMode('legal-registry');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xs min-w-[50px] transition-colors ${
            viewMode === 'legal-registry' ? 'text-[#c44d31] font-bold' : 'text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Gavel className="h-4 w-4" />
          <span className="text-[9px] uppercase tracking-wider font-mono">Cases</span>
        </button>

        <button
          onClick={() => {
            analytics.switchView('map');
            setViewMode('map');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xs min-w-[50px] transition-colors ${
            viewMode === 'map' ? 'text-[#c44d31] font-bold' : 'text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <Map className="h-4 w-4" />
          <span className="text-[9px] uppercase tracking-wider font-mono">Map</span>
        </button>

        <button
          onClick={() => {
            analytics.switchView('manifesto');
            setViewMode('manifesto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xs min-w-[50px] transition-colors ${
            viewMode === 'manifesto' ? 'text-[#c44d31] font-bold' : 'text-[#71717a] hover:text-[#18181b]'
          }`}
        >
          <FileCheck className="h-4 w-4" />
          <span className="text-[9px] uppercase tracking-wider font-mono">Promises</span>
        </button>

        <button
          onClick={() => setIsAllIndiaDirectoryOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xs min-w-[50px] text-[#18181b] hover:text-[#c44d31] transition-colors"
        >
          <div className="flex h-4 w-4 items-center justify-center rounded-xs bg-[#18181b] text-white">
            <Sparkles className="h-2.5 w-2.5 text-amber-300" />
          </div>
          <span className="text-[9px] uppercase tracking-wider font-mono font-bold">543 MPs</span>
        </button>
      </nav>

      {/* Deep-Dive Politician Dossier Modal */}
      {selectedPolitician && (
        <PoliticianDossierModal
          politician={selectedPolitician}
          onClose={() => setSelectedPolitician(null)}
          isCompared={compareList.some((c) => c.id === selectedPolitician.id)}
          onToggleCompare={handleToggleCompare}
          onOpenCompareWith={handleOpenCompareWith}
          onInvestigateWithAgent={handleInvestigateWithAgent}
        />
      )}

      {/* Side-by-Side Matrix Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareList={compareList}
        allPoliticians={politicians}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCompare={handleAddToCompare}
        initialFocusArea={comparisonFocusArea}
        onInvestigateWithAgent={handleInvestigateWithAgent}
        onSelectPolitician={(p) => {
          setIsCompareModalOpen(false);
          setSelectedPolitician(p);
        }}
      />

      {/* Transparency & Citizen Guide Modal */}
      <TransparencyGuideModal
        isOpen={isTransparencyGuideOpen}
        onClose={() => setIsTransparencyGuideOpen(false)}
      />

      {/* All-India 543 Parliamentary Constituencies Directory Modal */}
      <AllIndiaMPRegistryModal
        isOpen={isAllIndiaDirectoryOpen}
        onClose={() => setIsAllIndiaDirectoryOpen(false)}
        allPreloadedPoliticians={politicians}
        onSelectPolitician={(p) => setSelectedPolitician(p)}
        onAddNewPolitician={handleAddNewPolitician}
      />

      {/* WebMCP Autonomous Agent Live Workspace & Activity Log Modal */}
      <WebMCPAgentWorkspace
        isOpen={isWorkspaceOpen}
        onClose={() => setIsWorkspaceOpen(false)}
        isWebMCPSupported={isWebMCPSupported}
        agentStatus={agentStatus}
        logs={logs}
        tools={tools}
        activeInvestigation={activeInvestigation}
        onExecuteTool={executeAgentTool}
        onClearLogs={clearLogs}
        onOpenCompareModal={(ids, focusArea) => {
          const matched = politicians.filter((p) => ids.includes(p.id));
          if (matched.length > 0) {
            setCompareList(matched);
            setComparisonFocusArea((focusArea as ComparisonFocusArea) || 'all');
            setIsCompareModalOpen(true);
            setIsWorkspaceOpen(false);
          }
        }}
      />

      {/* Real-Time Agent Notification Toast (WebMCP Actuation Feedback) */}
      <AgentNotificationToast
        notification={agentNotification}
        onDismiss={() => setAgentNotification(null)}
        onOpenInspector={() => setIsWorkspaceOpen(true)}
      />

      {/* Floating WebMCP Live Agent Button (Desktop Bottom-Right) */}
      <div className="hidden lg:block fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsWorkspaceOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-[#18181b] hover:bg-[#c44d31] text-white px-3.5 py-2 rounded-full shadow-2xl border-2 border-white/80 transition-transform hover:scale-105 cursor-pointer font-mono text-xs font-bold"
          title="Open WebMCP Agent Inspector & Developer Workspace"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>WebMCP Inspector</span>
          {logs.length > 0 && (
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {logs.length}
            </span>
          )}
        </button>
      </div>

    </div>
  );
}
