import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  MapPin, 
  GitFork, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck,
  ExternalLink,
  Layers
} from 'lucide-react';
import { LocationHierarchyNode } from '../../types/representation';

interface PoliticalHierarchyTreeProps {
  nodes: LocationHierarchyNode[];
  onSelectPerson?: (personId: string) => void;
}

export const PoliticalHierarchyTree: React.FC<PoliticalHierarchyTreeProps> = ({
  nodes,
  onSelectPerson,
}) => {
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({
    'National': true,
    'State': true,
    'District': true,
    'Subdistrict': true,
    'Urban / Rural Body': true,
    'Ward / Panchayat': true,
  });

  const toggleTier = (tier: string) => {
    setExpandedTiers(prev => ({
      ...prev,
      [tier]: !prev[tier],
    }));
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'National':
        return <Landmark className="w-4 h-4 text-[#c44d31]" />;
      case 'State':
        return <Building2 className="w-4 h-4 text-[#2563eb]" />;
      case 'District':
      case 'Subdistrict':
        return <Layers className="w-4 h-4 text-[#059669]" />;
      case 'Urban / Rural Body':
      case 'Ward / Panchayat':
        return <MapPin className="w-4 h-4 text-[#d97706]" />;
      default:
        return <GitFork className="w-4 h-4 text-[#71717a]" />;
    }
  };

  return (
    <div className="bg-white border border-[#18181b]/10 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#18181b]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#18181b]/5 text-[#18181b] rounded-lg">
              <GitFork className="w-4 h-4" />
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#18181b]">
              Jurisdictional Hierarchy Explorer
            </h3>
          </div>
          <p className="text-xs text-[#71717a] mt-0.5">
            Full relational map from the Union of India down to your local municipal ward
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const allExpanded = Object.values(expandedTiers).every(Boolean);
            const newState: Record<string, boolean> = {};
            nodes.forEach(n => newState[n.tier] = !allExpanded);
            setExpandedTiers(newState);
          }}
          className="text-xs font-semibold text-[#71717a] hover:text-[#18181b] px-2.5 py-1 bg-[#f4f2ea] hover:bg-[#ece8df] rounded-lg transition-colors"
        >
          {Object.values(expandedTiers).every(Boolean) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Visual Hierarchy Nodes */}
      <div className="mt-4 space-y-3 relative pl-4 border-l-2 border-[#18181b]/10 ml-2">
        {nodes.map((node, index) => {
          const isExpanded = expandedTiers[node.tier] ?? true;

          return (
            <div key={node.unitId || index} className="relative group">
              {/* Connector dot */}
              <div className="absolute -left-[23px] top-3.5 w-3 h-3 rounded-full bg-white border-2 border-[#18181b]/40 group-hover:border-[#c44d31] transition-colors" />

              <div className="bg-[#f8f6f0] border border-[#18181b]/10 rounded-xl p-3.5 hover:bg-white hover:shadow-xs transition-all">
                {/* Node Header */}
                <div 
                  onClick={() => toggleTier(node.tier)}
                  className="flex items-center justify-between gap-2 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1 bg-white rounded-md border border-[#18181b]/10 shrink-0">
                      {getTierIcon(node.tier)}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#71717a]">
                          {node.tier}
                        </span>
                        <span className="text-[10px] font-mono text-[#a1a1aa] bg-[#e4e4e7] px-1.5 py-0.2 rounded">
                          {node.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#18181b] truncate mt-0.5">
                        {node.name}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 text-[#71717a]">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>

                {/* Node Details (Elected Representative info) */}
                {isExpanded && node.representative && (
                  <div className="mt-3 pt-3 border-t border-[#18181b]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-[#18181b]/5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: node.representative.partyColor || '#18181b' }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs text-[#18181b] truncate">
                            {node.representative.personName}
                          </span>
                          <span 
                            className="text-[10px] font-bold text-white px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: node.representative.partyColor || '#18181b' }}
                          >
                            {node.representative.partyAbbr}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#71717a] font-medium">
                          {node.representative.officeTitle} ({node.representative.termSpan})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[10px] font-mono text-[#15803d] bg-[#f0fdf4] px-2 py-0.5 rounded border border-[#86efac]/50 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>

                      {onSelectPerson && (
                        <button
                          type="button"
                          onClick={() => onSelectPerson(node.representative!.personId)}
                          className="text-[11px] font-semibold text-[#18181b] hover:text-[#c44d31] underline underline-offset-2 flex items-center gap-1"
                        >
                          Profile
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
