import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Wallet, 
  Landmark, 
  TrendingUp, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Scale, 
  Filter, 
  FileCheck, 
  Sparkles, 
  PieChart as PieIcon,
  ChevronRight,
  RotateCcw,
  Building
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { Politician } from '../types';
import { PoliticianImage } from './PoliticianImage';

interface AnalyticsViewProps {
  politicians: Politician[];
  onSelect: (p: Politician) => void;
  onBackToOverview?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ 
  politicians, 
  onSelect,
  onBackToOverview 
}) => {
  const [selectedAlliance, setSelectedAlliance] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  // Filtered dataset
  const filteredPoliticians = useMemo(() => {
    return politicians.filter((p) => {
      if (selectedAlliance !== 'All' && p.alliance !== selectedAlliance) return false;
      if (selectedState !== 'All' && p.state !== selectedState) return false;
      return true;
    });
  }, [politicians, selectedAlliance, selectedState]);

  const uniqueStates = useMemo(() => {
    return Array.from(new Set(politicians.map((p) => p.state))).sort();
  }, [politicians]);

  // Aggregate Key Stat Metrics
  const summaryMetrics = useMemo(() => {
    const total = filteredPoliticians.length || 1;
    const avgAttendance = Math.round(
      filteredPoliticians.reduce((acc, p) => acc + p.parliamentaryRecord.attendancePercent, 0) / total
    );
    const totalAssetsCr = filteredPoliticians.reduce((acc, p) => acc + p.assets.totalCr, 0);
    const avgAssetsCr = (totalAssetsCr / total).toFixed(1);
    const avgMplads = Math.round(
      filteredPoliticians.reduce((acc, p) => acc + p.mplads.utilizationPercent, 0) / total
    );
    const cleanRecordCount = filteredPoliticians.filter((p) => p.criminalRecords.totalCases === 0).length;
    const cleanRecordPercent = Math.round((cleanRecordCount / total) * 100);

    return {
      total: filteredPoliticians.length,
      avgAttendance,
      totalAssetsCr: Math.round(totalAssetsCr).toLocaleString('en-IN'),
      avgAssetsCr,
      avgMplads,
      cleanRecordCount,
      cleanRecordPercent,
    };
  }, [filteredPoliticians]);

  // 1. Party-wise Average Attendance Data
  const partyAttendanceData = useMemo(() => {
    const partyMap: Record<string, { totalAttendance: number; count: number; partyColor: string; alliance: string }> = {};
    
    filteredPoliticians.forEach((p) => {
      const abbr = p.partyAbbr || 'IND';
      if (!partyMap[abbr]) {
        partyMap[abbr] = {
          totalAttendance: 0,
          count: 0,
          partyColor: p.partyColor || '#18181b',
          alliance: p.alliance,
        };
      }
      partyMap[abbr].totalAttendance += p.parliamentaryRecord.attendancePercent;
      partyMap[abbr].count += 1;
    });

    return Object.entries(partyMap)
      .map(([party, data]) => ({
        party,
        avgAttendance: Math.round(data.totalAttendance / data.count),
        count: data.count,
        partyColor: data.partyColor,
        alliance: data.alliance,
      }))
      .filter((d) => d.count >= (filteredPoliticians.length > 50 ? 2 : 1))
      .sort((a, b) => b.avgAttendance - a.avgAttendance)
      .slice(0, 14);
  }, [filteredPoliticians]);

  // 2. Declared Wealth Tiers Distribution
  const wealthTiersData = useMemo(() => {
    const tiers = [
      { tier: '< ₹1 Cr', count: 0, color: '#2563eb' },
      { tier: '₹1 - 5 Cr', count: 0, color: '#0d9488' },
      { tier: '₹5 - 20 Cr', count: 0, color: '#16a34a' },
      { tier: '₹20 - 50 Cr', count: 0, color: '#eab308' },
      { tier: '₹50 - 100 Cr', count: 0, color: '#f97316' },
      { tier: '> ₹100 Cr', count: 0, color: '#c44d31' },
    ];

    filteredPoliticians.forEach((p) => {
      const cr = p.assets.totalCr;
      if (cr < 1) tiers[0].count += 1;
      else if (cr < 5) tiers[1].count += 1;
      else if (cr < 20) tiers[2].count += 1;
      else if (cr < 50) tiers[3].count += 1;
      else if (cr < 100) tiers[4].count += 1;
      else tiers[5].count += 1;
    });

    const total = filteredPoliticians.length || 1;
    return tiers.map((t) => ({
      ...t,
      percentage: Math.round((t.count / total) * 100),
    }));
  }, [filteredPoliticians]);

  // 3. State-wise Criminal Case Density (Top States)
  const stateCaseDensityData = useMemo(() => {
    const stateMap: Record<string, { totalMPs: number; mpsWithCases: number; seriousCases: number }> = {};

    filteredPoliticians.forEach((p) => {
      const st = p.state;
      if (!stateMap[st]) {
        stateMap[st] = { totalMPs: 0, mpsWithCases: 0, seriousCases: 0 };
      }
      stateMap[st].totalMPs += 1;
      if (p.criminalRecords.totalCases > 0) {
        stateMap[st].mpsWithCases += 1;
      }
      stateMap[st].seriousCases += p.criminalRecords.seriousCases;
    });

    return Object.entries(stateMap)
      .map(([state, d]) => ({
        state: state.length > 12 ? state.slice(0, 10) + '..' : state,
        fullState: state,
        totalMPs: d.totalMPs,
        mpsWithCases: d.mpsWithCases,
        casePercentage: Math.round((d.mpsWithCases / d.totalMPs) * 100),
        seriousCases: d.seriousCases,
      }))
      .filter((d) => d.totalMPs >= 2)
      .sort((a, b) => b.casePercentage - a.casePercentage)
      .slice(0, 10);
  }, [filteredPoliticians]);

  // 4. MPLADS Sector Allocation Aggregate
  const mpladsSectorDistribution = useMemo(() => {
    const sectorTotals: Record<string, number> = {
      'Roads & Infrastructure': 0,
      'Healthcare': 0,
      'Education': 0,
      'Water & Sanitation': 0,
      'Community Centers': 0,
      'Rural Development': 0,
    };

    filteredPoliticians.forEach((p) => {
      const topProjects = p.mplads?.topProjects || [];
      topProjects.forEach((proj) => {
        if (sectorTotals[proj.sector] !== undefined) {
          sectorTotals[proj.sector] += proj.costCr || 0.5;
        } else {
          sectorTotals['Rural Development'] += proj.costCr || 0.5;
        }
      });
    });

    const colors = ['#18181b', '#1b6b47', '#2563eb', '#c44d31', '#d97706', '#7c3aed'];

    return Object.entries(sectorTotals)
      .map(([name, value], idx) => ({
        name,
        value: Number(value.toFixed(1)),
        color: colors[idx % colors.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredPoliticians]);

  // Outliers / Exemplars
  const highestAttendance = useMemo(() => {
    return [...filteredPoliticians].sort((a, b) => b.parliamentaryRecord.attendancePercent - a.parliamentaryRecord.attendancePercent).slice(0, 5);
  }, [filteredPoliticians]);

  const mostDebates = useMemo(() => {
    return [...filteredPoliticians].sort((a, b) => b.parliamentaryRecord.debatesCount - a.parliamentaryRecord.debatesCount).slice(0, 5);
  }, [filteredPoliticians]);

  const highestAssets = useMemo(() => {
    return [...filteredPoliticians].sort((a, b) => b.assets.totalCr - a.assets.totalCr).slice(0, 5);
  }, [filteredPoliticians]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="border border-[#18181b]/15 bg-white p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="mb-2.5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#71717a] hover:text-[#18181b] transition cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Overview</span>
              </button>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#18181b] text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest">
                National Data Visualizations
              </span>
              <span className="bg-amber-50 text-[#c44d31] border border-amber-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                PRS & ECI Aggregates
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#18181b] mt-1">
              National Analytics & Parliamentary Charts
            </h1>
            <p className="text-xs sm:text-sm text-[#52525b] mt-1 max-w-3xl leading-relaxed">
              Aggregate distributions across 543 Lok Sabha seats: party attendance benchmarks, net worth brackets, MPLADS fund utilization, and state-wise criminal proceeding density.
            </p>
          </div>

          {/* Quick Filters in Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedAlliance}
              onChange={(e) => setSelectedAlliance(e.target.value)}
              className="border border-[#18181b]/20 bg-[#faf9f6] text-xs font-bold py-1.5 px-3 rounded-xs focus:outline-none cursor-pointer"
            >
              <option value="All">All Coalitions</option>
              <option value="NDA">NDA Coalition</option>
              <option value="INDIA">INDIA Coalition</option>
              <option value="Others">Others / Regional</option>
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-[#18181b]/20 bg-[#faf9f6] text-xs font-bold py-1.5 px-3 rounded-xs focus:outline-none cursor-pointer max-w-[150px]"
            >
              <option value="All">All States ({uniqueStates.length})</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 National Summary Benchmark Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#18181b]/10">
          
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">MPs Analyzed</span>
              <Landmark className="h-3.5 w-3.5 text-[#18181b]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#18181b] mt-1">
              {summaryMetrics.total}
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">Active Parliamentarians</p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">National Attendance</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#1b6b47]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#1b6b47] mt-1">
              {summaryMetrics.avgAttendance}%
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">National Benchmark: 79%</p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Avg Declared Net Worth</span>
              <Wallet className="h-3.5 w-3.5 text-[#18181b]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#18181b] mt-1">
              ₹{summaryMetrics.avgAssetsCr} Cr
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">Total: ₹{summaryMetrics.totalAssetsCr} Cr</p>
          </div>

          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs">
            <div className="flex items-center justify-between text-[#71717a]">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Clean Slate Ratio</span>
              <ShieldAlert className="h-3.5 w-3.5 text-[#1b6b47]" />
            </div>
            <div className="font-serif font-black text-xl sm:text-2xl text-[#1b6b47] mt-1">
              {summaryMetrics.cleanRecordPercent}%
            </div>
            <p className="text-[10px] text-[#52525b] mt-0.5">{summaryMetrics.cleanRecordCount} MPs with 0 Cases</p>
          </div>

        </div>
      </div>

      {/* Grid of Main Interactive Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: Average Attendance by Party vs 79% Benchmark */}
        <div className="border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-[#18181b]">
                Party Attendance vs National Benchmark
              </h3>
              <p className="text-[11px] text-[#52525b]">
                Average session participation (%) across parties with national average line (79%)
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase bg-emerald-50 text-[#1b6b47] border border-emerald-200 px-2 py-0.5 rounded-xs">
              Hansard Data
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b10" />
                <XAxis 
                  dataKey="party" 
                  tick={{ fontSize: 10, fill: '#18181b' }} 
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  formatter={(val: any) => [`${val}% Attendance`, 'Average']}
                  labelFormatter={(lbl) => `Party: ${lbl}`}
                  contentStyle={{ backgroundColor: '#faf9f6', borderColor: '#18181b', borderRadius: '2px', fontSize: '11px' }}
                />
                <ReferenceLine y={79} stroke="#c44d31" strokeDasharray="4 4" label={{ value: 'National Avg (79%)', fill: '#c44d31', fontSize: 10, position: 'top' }} />
                <Bar dataKey="avgAttendance" radius={[2, 2, 0, 0]}>
                  {partyAttendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.partyColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Wealth Tier Breakdown */}
        <div className="border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-[#18181b]">
                Declared Wealth Distribution Brackets
              </h3>
              <p className="text-[11px] text-[#52525b]">
                Number and % share of Parliamentarians by declared asset value (Form 26 Affidavits)
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase bg-[#f1ede4] text-[#18181b] border border-[#18181b]/15 px-2 py-0.5 rounded-xs">
              ECI Disclosures
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wealthTiersData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b10" />
                <XAxis dataKey="tier" tick={{ fontSize: 10, fill: '#18181b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${val} MPs (${item.payload.percentage}% of Lok Sabha)`,
                    'Count'
                  ]}
                  contentStyle={{ backgroundColor: '#faf9f6', borderColor: '#18181b', borderRadius: '2px', fontSize: '11px' }}
                />
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {wealthTiersData.map((entry, index) => (
                    <Cell key={`tier-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: State-wise Criminal Proceeding Density */}
        <div className="border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-[#18181b]">
                Criminal Case Density by State (% MPs with Cases)
              </h3>
              <p className="text-[11px] text-[#52525b]">
                Share of elected MPs with sworn criminal proceedings across major states
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase bg-red-50 text-[#c44d31] border border-red-200 px-2 py-0.5 rounded-xs">
              ADR Scrutiny
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={stateCaseDensityData} 
                layout="vertical"
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b10" />
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 10, fill: '#71717a' }} />
                <YAxis dataKey="state" type="category" tick={{ fontSize: 10, fill: '#18181b' }} />
                <Tooltip 
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% (${item.payload.mpsWithCases}/${item.payload.totalMPs} MPs, ${item.payload.seriousCases} Serious IPC)`,
                    item.payload.fullState
                  ]}
                  contentStyle={{ backgroundColor: '#faf9f6', borderColor: '#18181b', borderRadius: '2px', fontSize: '11px' }}
                />
                <Bar dataKey="casePercentage" fill="#c44d31" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: MPLADS Local Development Sector Allocation */}
        <div className="border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
            <div>
              <h3 className="font-serif text-base font-bold text-[#18181b]">
                MPLADS Scheme Expenditure by Sector
              </h3>
              <p className="text-[11px] text-[#52525b]">
                Estimated capital allocation (₹ Cr) across constituency priority sectors
              </p>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase bg-emerald-50 text-[#1b6b47] border border-emerald-200 px-2 py-0.5 rounded-xs">
              MoSPI Audit
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mpladsSectorDistribution} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b10" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 9, fill: '#18181b' }} 
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip 
                  formatter={(val: any) => [`₹${val} Cr Sanctioned`, 'Expenditure']}
                  contentStyle={{ backgroundColor: '#faf9f6', borderColor: '#18181b', borderRadius: '2px', fontSize: '11px' }}
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {mpladsSectorDistribution.map((entry, index) => (
                    <Cell key={`sector-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Outlier Leaders & Benchmarks Showcase */}
      <div className="border border-[#18181b]/15 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#18181b]">
              Parliamentary Outliers & Benchmark Leaders
            </h3>
            <p className="text-xs text-[#52525b]">
              Leaders with 100% attendance, highest parliamentary debate participation, and largest disclosed asset holdings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Top Attendance Leaders */}
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-2">
              <span className="text-xs font-serif font-bold text-[#18181b] flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1b6b47]" />
                <span>Highest Attendance</span>
              </span>
              <span className="text-[9px] font-mono text-[#71717a]">PRS Data</span>
            </div>
            <div className="divide-y divide-[#18181b]/10">
              {highestAttendance.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className="py-2 flex items-center justify-between gap-2 hover:bg-[#f1ede4] px-1.5 transition rounded-xs cursor-pointer group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-serif font-bold text-[#18181b] group-hover:text-[#c44d31] truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-[#71717a] truncate">{p.partyAbbr} · {p.constituency}</p>
                  </div>
                  <span className="font-serif font-bold text-xs text-[#1b6b47] flex-shrink-0">
                    {p.parliamentaryRecord.attendancePercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Debates Participated */}
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-2">
              <span className="text-xs font-serif font-bold text-[#18181b] flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-[#c44d31]" />
                <span>Most Debates Logged</span>
              </span>
              <span className="text-[9px] font-mono text-[#71717a]">Hansard</span>
            </div>
            <div className="divide-y divide-[#18181b]/10">
              {mostDebates.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className="py-2 flex items-center justify-between gap-2 hover:bg-[#f1ede4] px-1.5 transition rounded-xs cursor-pointer group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-serif font-bold text-[#18181b] group-hover:text-[#c44d31] truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-[#71717a] truncate">{p.partyAbbr} · {p.constituency}</p>
                  </div>
                  <span className="font-serif font-bold text-xs text-[#18181b] flex-shrink-0">
                    {p.parliamentaryRecord.debatesCount} debates
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highest Declared Assets */}
          <div className="bg-[#faf9f6] border border-[#18181b]/10 p-3.5 rounded-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#18181b]/10 pb-2">
              <span className="text-xs font-serif font-bold text-[#18181b] flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-[#18181b]" />
                <span>Highest Disclosed Assets</span>
              </span>
              <span className="text-[9px] font-mono text-[#71717a]">Form 26</span>
            </div>
            <div className="divide-y divide-[#18181b]/10">
              {highestAssets.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className="py-2 flex items-center justify-between gap-2 hover:bg-[#f1ede4] px-1.5 transition rounded-xs cursor-pointer group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-serif font-bold text-[#18181b] group-hover:text-[#c44d31] truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-[#71717a] truncate">{p.partyAbbr} · {p.constituency}</p>
                  </div>
                  <span className="font-serif font-black text-xs text-[#18181b] flex-shrink-0">
                    ₹{p.assets.totalCr.toFixed(0)} Cr
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
