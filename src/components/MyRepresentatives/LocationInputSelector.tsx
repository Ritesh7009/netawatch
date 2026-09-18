import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Building2,
  Navigation,
  Globe2
} from 'lucide-react';
import { PINCODE_DIRECTORY } from '../../data/representation/pincodeDirectory';
import { STATE_GOVERNANCE_PROFILES } from '../../data/representation/statesAndOffices';

interface LocationInputSelectorProps {
  currentAddress?: string;
  pinCode?: string;
  isLoading: boolean;
  onSearch: (query: { pinCode?: string; query?: string; latitude?: number; longitude?: number; state?: string; district?: string; constituency?: string }) => void;
  onDetectGPS: () => void;
}

export const LocationInputSelector: React.FC<LocationInputSelectorProps> = ({
  currentAddress,
  pinCode,
  isLoading,
  onSearch,
  onDetectGPS,
}) => {
  const [activeTab, setActiveTab] = useState<'pin' | 'search' | 'cascade'>('pin');
  const [pinInput, setPinInput] = useState(pinCode || '462001');
  const [searchInput, setSearchInput] = useState('');
  const [selectedState, setSelectedState] = useState<string>('Madhya Pradesh');
  const [selectedConstituency, setSelectedConstituency] = useState<string>('Bhopal');

  // Quick test hubs
  const popularHubs = [
    { label: 'Bhopal (MP)', pin: '462001', state: 'Madhya Pradesh' },
    { label: 'Varanasi (UP)', pin: '221001', state: 'Uttar Pradesh' },
    { label: 'New Delhi (DL)', pin: '110001', state: 'Delhi (NCT)' },
    { label: 'Mumbai South (MH)', pin: '400001', state: 'Maharashtra' },
    { label: 'Bengaluru Central (KA)', pin: '560001', state: 'Karnataka' },
    { label: 'Rae Bareli (UP)', pin: '229001', state: 'Uttar Pradesh' },
    { label: 'Gandhinagar (GJ)', pin: '382010', state: 'Gujarat' },
    { label: 'Indore (MP)', pin: '452001', state: 'Madhya Pradesh' },
  ];

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim()) {
      onSearch({ pinCode: pinInput.trim() });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch({ query: searchInput.trim() });
    }
  };

  const handleCascadeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ state: selectedState, constituency: selectedConstituency });
  };

  return (
    <div className="bg-white border border-[#18181b]/10 rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#18181b]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#c44d31]/10 text-[#c44d31] rounded-lg">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-serif tracking-tight text-[#18181b]">
              Discover My Representatives
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#71717a] mt-0.5">
            Resolve your location into National MP, State MLA, Mayor, and Ward Councillor tiers
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center bg-[#f4f2ea] p-1 rounded-xl gap-1 text-xs font-medium self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('pin')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'pin' 
                ? 'bg-white text-[#18181b] shadow-xs font-semibold' 
                : 'text-[#71717a] hover:text-[#18181b]'
            }`}
          >
            PIN Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'search' 
                ? 'bg-white text-[#18181b] shadow-xs font-semibold' 
                : 'text-[#71717a] hover:text-[#18181b]'
            }`}
          >
            Address / Area
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cascade')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cascade' 
                ? 'bg-white text-[#18181b] shadow-xs font-semibold' 
                : 'text-[#71717a] hover:text-[#18181b]'
            }`}
          >
            State Hierarchy
          </button>
        </div>
      </div>

      {/* Input Form based on Active Tab */}
      <div className="pt-4">
        {activeTab === 'pin' && (
          <form onSubmit={handlePinSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit Indian PIN code (e.g. 462001, 110001, 221001)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8f6f0] border border-[#18181b]/15 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c44d31]/30 focus:border-[#c44d31]"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || pinInput.length < 3}
              className="px-5 py-2.5 bg-[#18181b] hover:bg-[#27272a] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {isLoading ? 'Resolving...' : 'Locate'}
            </button>

            <button
              type="button"
              onClick={onDetectGPS}
              disabled={isLoading}
              className="px-4 py-2.5 bg-[#f8f6f0] hover:bg-[#ece8df] text-[#18181b] border border-[#18181b]/15 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
              title="Use GPS Coordinates (ephemeral & privacy safe)"
            >
              <Navigation className="w-4 h-4 text-[#c44d31]" />
              GPS Detect
            </button>
          </form>
        )}

        {activeTab === 'search' && (
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search neighborhood, ward, tehsil, or city (e.g. Indiranagar, Bhopal North, Indirapuram)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8f6f0] border border-[#18181b]/15 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c44d31]/30 focus:border-[#c44d31]"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !searchInput.trim()}
              className="px-5 py-2.5 bg-[#18181b] hover:bg-[#27272a] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {isLoading ? 'Searching...' : 'Find Area'}
            </button>
          </form>
        )}

        {activeTab === 'cascade' && (
          <form onSubmit={handleCascadeSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 bg-[#f8f6f0] border border-[#18181b]/15 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c44d31]/30"
            >
              {Object.keys(STATE_GOVERNANCE_PROFILES).map((s) => (
                <option key={s} value={s}>
                  {s} {STATE_GOVERNANCE_PROFILES[s].isBicameral ? '(Bicameral)' : ''}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              placeholder="Constituency or District (e.g. Bhopal, Varanasi, Pune)"
              className="px-3 py-2.5 bg-[#f8f6f0] border border-[#18181b]/15 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#c44d31]/30"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#18181b] hover:bg-[#27272a] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Globe2 className="w-4 h-4" />
              Load Hierarchy
            </button>
          </form>
        )}

        {/* Quick Hub Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#18181b]/5 text-xs">
          <span className="text-[#71717a] font-medium mr-1">Quick Hubs:</span>
          {popularHubs.map((hub) => (
            <button
              key={hub.pin}
              type="button"
              onClick={() => {
                setPinInput(hub.pin);
                onSearch({ pinCode: hub.pin });
              }}
              className="px-2 py-1 bg-[#f4f2ea] hover:bg-[#e9e5d9] text-[#18181b] rounded-md font-mono text-[11px] transition-colors flex items-center gap-1"
            >
              <span>{hub.label}</span>
              <span className="text-[#71717a]">({hub.pin})</span>
            </button>
          ))}
        </div>

        {/* Explicit Location Confirmation Banner */}
        {currentAddress && (
          <div className="mt-4 p-3.5 bg-[#f0fdf4] border border-[#86efac]/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#15803d] uppercase tracking-wider">
                    Resolved Jurisdiction:
                  </span>
                  <span className="bg-[#15803d] text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                    VERIFIED ECI & SEC
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#14532d] mt-0.5">
                  {currentAddress}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setActiveTab('pin');
                setPinInput('');
              }}
              className="text-xs text-[#15803d] hover:text-[#14532d] font-semibold underline underline-offset-2 self-end sm:self-auto shrink-0 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
