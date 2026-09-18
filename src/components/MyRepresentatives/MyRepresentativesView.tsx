import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck2, 
  History, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';
import { LocationResolutionService, LocationResolutionInput } from '../../services/LocationResolutionService';
import { ResolvedLocationResponse, EvidenceRecord } from '../../types/representation';
import { LocationInputSelector } from './LocationInputSelector';
import { RepresentativeCard } from './RepresentativeCard';
import { PoliticalHierarchyTree } from './PoliticalHierarchyTree';
import { HistoricalTermsModal } from './HistoricalTermsModal';
import { EvidenceViewerModal } from './EvidenceViewerModal';
import { DataQualityAuditModal } from './DataQualityAuditModal';

interface MyRepresentativesViewProps {
  onSelectPoliticianId: (id: string) => void;
  onBackToOverview: () => void;
}

export const MyRepresentativesView: React.FC<MyRepresentativesViewProps> = ({
  onSelectPoliticianId,
  onBackToOverview,
}) => {
  const [resolutionData, setResolutionData] = useState<ResolvedLocationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'cards' | 'hierarchy'>('cards');

  // Modals state
  const [selectedHistoricalConstituency, setSelectedHistoricalConstituency] = useState<string | null>(null);
  const [selectedEvidenceList, setSelectedEvidenceList] = useState<EvidenceRecord[] | null>(null);
  const [isDataQualityModalOpen, setIsDataQualityModalOpen] = useState<boolean>(false);

  // Initial resolution on mount (defaults to standard hub, e.g. 462001 Bhopal Central or detected coordinates)
  useEffect(() => {
    handleResolveLocation({ pinCode: '462001' });
  }, []);

  const handleResolveLocation = async (input: LocationResolutionInput) => {
    setIsLoading(true);
    try {
      const data = await LocationResolutionService.resolveLocation(input);
      setResolutionData(data);
    } catch (err) {
      console.error('Failed to resolve location:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetectGPS = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handleResolveLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn('Geolocation failed or denied, using fallback:', err);
          handleResolveLocation({ pinCode: '110001' }); // Default to New Delhi on denial
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      handleResolveLocation({ pinCode: '110001' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f4f2ea] p-4 rounded-2xl border border-[#18181b]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#c44d31] text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded">
              INDIA-WIDE DISCOVERY
            </span>
            <span className="text-xs font-mono text-[#71717a]">
              Location → Boundary → Hierarchy → Representatives
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#18181b] mt-1">
            My Representatives Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDataQualityModalOpen(true)}
            className="text-xs font-semibold text-[#18181b] hover:text-[#c44d31] bg-white border border-[#18181b]/15 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Data Audit</span>
          </button>

          <button
            type="button"
            onClick={onBackToOverview}
            className="text-xs font-semibold text-[#71717a] hover:text-[#18181b] bg-white border border-[#18181b]/15 px-3 py-1.5 rounded-xl transition-colors"
          >
            Back to Overview
          </button>
        </div>
      </div>

      {/* 1. Location Input & Search Engine */}
      <LocationInputSelector
        currentAddress={resolutionData?.resolvedLocation.formattedAddress}
        pinCode={resolutionData?.resolvedLocation.pinCode}
        isLoading={isLoading}
        onSearch={handleResolveLocation}
        onDetectGPS={handleDetectGPS}
      />

      {/* 2. State & Governance Summary Ribbon */}
      {resolutionData && (
        <div className="bg-white border border-[#18181b]/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#c44d31]/10 text-[#c44d31] rounded-xl font-bold font-serif text-lg">
              {resolutionData.resolvedLocation.stateCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#18181b]">
                  {resolutionData.resolvedLocation.state}
                </h3>
                <span className="text-[10px] font-mono font-bold bg-[#e4e4e7] text-[#27272a] px-2 py-0.5 rounded">
                  {resolutionData.resolvedLocation.isBicameral ? 'Bicameral Assembly' : 'Unicameral Assembly'}
                </span>
              </div>
              <p className="text-xs text-[#71717a] mt-0.5">
                District: <strong>{resolutionData.resolvedLocation.district}</strong> • Local Body: <strong>{resolutionData.resolvedLocation.localBodyName}</strong>
              </p>
            </div>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center bg-[#f4f2ea] p-1 rounded-xl gap-1 text-xs font-medium self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'cards' 
                  ? 'bg-white text-[#18181b] shadow-xs font-semibold' 
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              All Representatives
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hierarchy')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'hierarchy' 
                  ? 'bg-white text-[#18181b] shadow-xs font-semibold' 
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              Jurisdiction Tree
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Views (Representative Cards OR Hierarchy Tree) */}
      {resolutionData && (
        <>
          {activeTab === 'cards' && (
            <div className="space-y-6">
              {/* Grid of Multi-Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {resolutionData.electoralHierarchy.map((tier, idx) => {
                  const levelColors: Record<string, string> = {
                    national: '#c44d31',
                    state: '#2563eb',
                    urban_local: '#d97706',
                    rural_local: '#059669',
                    autonomous: '#7c3aed',
                  };

                  const levelLabels: Record<string, string> = {
                    national: 'National Parliament',
                    state: 'State Legislature',
                    urban_local: 'Urban Civic Governance',
                    rural_local: 'Rural Panchayati Raj',
                    autonomous: 'Autonomous Council',
                  };

                  if (!tier.isDataAvailable || !tier.currentRepresentative) {
                    return (
                      <div 
                        key={tier.office || idx}
                        className="bg-white border border-[#18181b]/10 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span 
                              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                              style={{ backgroundColor: `${levelColors[tier.level]}15`, color: levelColors[tier.level] }}
                            >
                              {levelLabels[tier.level]}
                            </span>
                            <span className="text-[10px] font-mono text-[#a1a1aa] bg-[#f4f2ea] px-2 py-0.5 rounded">
                              Pending Gazette Sync
                            </span>
                          </div>

                          <h3 className="text-base font-bold font-serif text-[#18181b]">
                            {tier.office}
                          </h3>
                          <p className="text-xs text-[#71717a] mt-1">
                            Jurisdiction: {tier.constituency.officialName}
                          </p>

                          <div className="mt-4 p-4 bg-[#f8f6f0] rounded-xl border border-[#18181b]/5 flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                            <p className="text-xs text-[#71717a] leading-relaxed">
                              {tier.unavailabilityReason || 'Official government notifications for this hyper-local ward are currently being verified from State Election Commission records.'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#18181b]/10 text-xs text-[#71717a] font-mono">
                          Zero-tolerance non-hallucinatory standard enforced
                        </div>
                      </div>
                    );
                  }

                  return (
                    <RepresentativeCard
                      key={tier.office || idx}
                      levelLabel={levelLabels[tier.level] || tier.level}
                      tierColor={levelColors[tier.level] || '#c44d31'}
                      office={tier.officeDetails}
                      person={tier.currentRepresentative.person}
                      term={tier.currentRepresentative.term}
                      evidence={tier.currentRepresentative.evidence}
                      onOpenDossier={(id) => onSelectPoliticianId(id)}
                      onViewHistory={() => setSelectedHistoricalConstituency(tier.constituency.officialName)}
                      onViewEvidence={(ev) => setSelectedEvidenceList(ev)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'hierarchy' && (
            <PoliticalHierarchyTree
              nodes={resolutionData.administrativeHierarchy}
              onSelectPerson={(id) => onSelectPoliticianId(id)}
            />
          )}
        </>
      )}

      {/* 4. Modals */}
      {selectedHistoricalConstituency && resolutionData && (
        <HistoricalTermsModal
          isOpen={!!selectedHistoricalConstituency}
          onClose={() => setSelectedHistoricalConstituency(null)}
          constituencyName={selectedHistoricalConstituency}
          historicalTerms={
            resolutionData.electoralHierarchy.find(
              h => h.constituency.officialName.toLowerCase() === selectedHistoricalConstituency.toLowerCase()
            )?.historicalRepresentatives || []
          }
          onSelectPerson={(id) => {
            setSelectedHistoricalConstituency(null);
            onSelectPoliticianId(id);
          }}
        />
      )}

      {selectedEvidenceList && (
        <EvidenceViewerModal
          isOpen={!!selectedEvidenceList}
          onClose={() => setSelectedEvidenceList(null)}
          evidence={selectedEvidenceList}
        />
      )}

      <DataQualityAuditModal
        isOpen={isDataQualityModalOpen}
        onClose={() => setIsDataQualityModalOpen(false)}
      />
    </div>
  );
};
