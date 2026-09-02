import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Politician } from '../types';
import { Landmark, MessageSquare, FileText, HelpCircle, Users2, Award } from 'lucide-react';

interface AttendanceRadarProps {
  politician: Politician;
  compact?: boolean;
  showBenchmark?: boolean;
  className?: string;
}

export const AttendanceRadar: React.FC<AttendanceRadarProps> = ({
  politician,
  compact = false,
  showBenchmark = true,
  className = '',
}) => {
  const { parliamentaryRecord, partyColor, name } = politician;
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // Normalize parliamentary stats for balanced 0-100 radar scaling
  // 1. Attendance: 0 - 100%
  const attendanceScore = Math.min(100, Math.max(0, parliamentaryRecord.attendancePercent || 0));
  const nationalAvgAttendance = parliamentaryRecord.nationalAvgAttendance || 79;

  // 2. Debates: Normalized where 50 debates = 100 (national benchmark ~ 30)
  const debatesCount = parliamentaryRecord.debatesCount || 0;
  const debatesScore = Math.min(100, Math.max(5, Math.round((debatesCount / 50) * 100)));
  const debatesBenchmark = 55; // represents ~28 debates national average

  // 3. Private Member Bills: Normalized where 4 bills = 100 (national benchmark ~ 1 bill = 30)
  const pmBillsCount = parliamentaryRecord.privateMemberBills || 0;
  const pmBillsScore = Math.min(100, Math.max(10, pmBillsCount === 0 ? 15 : Math.round((pmBillsCount / 3.5) * 100)));
  const pmBillsBenchmark = 30; // represents ~1 bill national average

  // 4. Questions Asked: Normalized where 150 questions = 100 (national benchmark ~ 80)
  const questionsCount = parliamentaryRecord.questionsAsked || 0;
  const questionsScore = Math.min(100, Math.max(10, Math.round((questionsCount / 140) * 100)));
  const questionsBenchmark = 55; // represents ~75 questions national average

  // 5. Committee Participation: Normalized score based on assignments
  const committeeCount = parliamentaryRecord.committeeMemberships?.length || 1;
  const committeeScore = Math.min(100, Math.max(20, committeeCount * 35));
  const committeeBenchmark = 50;

  const radarData = [
    {
      metric: 'Attendance',
      label: 'Attendance',
      score: attendanceScore,
      benchmark: nationalAvgAttendance,
      raw: `${parliamentaryRecord.attendancePercent}%`,
      benchmarkRaw: `${nationalAvgAttendance}%`,
      subtext: 'Session Presence',
      icon: Landmark,
    },
    {
      metric: 'Debates',
      label: 'Debates',
      score: debatesScore,
      benchmark: debatesBenchmark,
      raw: `${debatesCount} Debates`,
      benchmarkRaw: '28 Avg',
      subtext: 'Floor Speeches',
      icon: MessageSquare,
    },
    {
      metric: 'PM Bills',
      label: 'PM Bills',
      score: pmBillsScore,
      benchmark: pmBillsBenchmark,
      raw: `${pmBillsCount} Bills`,
      benchmarkRaw: '1 Bill Avg',
      subtext: 'Private Member Bills',
      icon: FileText,
    },
    {
      metric: 'Questions',
      label: 'Questions',
      score: questionsScore,
      benchmark: questionsBenchmark,
      raw: `${questionsCount} Asked`,
      benchmarkRaw: '75 Avg',
      subtext: 'Parliamentary Inquiries',
      icon: HelpCircle,
    },
    {
      metric: 'Committees',
      label: 'Committees',
      score: committeeScore,
      benchmark: committeeBenchmark,
      raw: `${committeeCount} Assigned`,
      benchmarkRaw: '2 Avg',
      subtext: 'Standing Committees',
      icon: Users2,
    },
  ];

  // Custom Tooltip with Broadsheet Aesthetic
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const Icon = dataPoint.icon || Landmark;
      const isAboveBenchmark = dataPoint.score >= dataPoint.benchmark;

      return (
        <div className="border-2 border-[#1a1a1a] bg-[#1a1a1a] p-2.5 text-white shadow-xl min-w-[160px] text-xs font-mono">
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-white/20">
            <Icon className="h-3.5 w-3.5 text-[#f97316]" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-white">
              {dataPoint.subtext}
            </span>
          </div>

          <div className="flex justify-between items-baseline py-0.5">
            <span className="text-[#a8a29e] text-[10px] uppercase">MP Record:</span>
            <span className="font-serif text-sm font-black text-[#4ade80]">
              {dataPoint.raw}
            </span>
          </div>

          <div className="flex justify-between items-baseline py-0.5">
            <span className="text-[#a8a29e] text-[10px] uppercase">Nat'l Benchmark:</span>
            <span className="text-white/80 text-[11px]">
              {dataPoint.benchmarkRaw}
            </span>
          </div>

          <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between text-[9px]">
            <span className="text-[#d6d3d1]">Performance Index:</span>
            <span className={`font-bold px-1 py-0.2 ${isAboveBenchmark ? 'bg-[#22c55e]/20 text-[#4ade80]' : 'bg-[#f59e0b]/20 text-[#fbbf24]'}`}>
              {dataPoint.score}/100 ({isAboveBenchmark ? 'Above Avg' : 'Below Avg'})
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartHeight = compact ? 175 : 230;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Spider Chart Canvas */}
      <div className="relative w-full bg-[#fbf9f4] border border-[#1a1a1a]/15 p-1 rounded-none shadow-inner flex items-center justify-center">
        {/* Subtle Watermark/Legend inside Radar */}
        <div className="absolute top-1.5 left-2 flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-[#66625b]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: partyColor }}></span>
            <strong className="text-[#1a1a1a]">{name.split(' ')[0]}</strong>
          </span>
          {showBenchmark && (
            <span className="flex items-center gap-1 text-[#8a8479]">
              <span className="inline-block h-2 w-2 border border-dashed border-[#8a8479]"></span>
              <span>Nat'l Avg</span>
            </span>
          )}
        </div>

        <div className="w-full" style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="54%" 
              outerRadius={compact ? "66%" : "72%"} 
              data={radarData}
            >
              <PolarGrid stroke="#1a1a1a" strokeOpacity={0.12} strokeDasharray="2 2" />
              <PolarAngleAxis
                dataKey="label"
                tick={{ 
                  fill: '#1a1a1a', 
                  fontSize: compact ? 9 : 10, 
                  fontFamily: 'serif',
                  fontWeight: 700 
                }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              
              {/* National Benchmark Polygon */}
              {showBenchmark && (
                <Radar
                  name="National Benchmark"
                  dataKey="benchmark"
                  stroke="#78716c"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  fill="#78716c"
                  fillOpacity={0.12}
                />
              )}

              {/* MP's Radar Polygon */}
              <Radar
                name={name}
                dataKey="score"
                stroke={partyColor}
                strokeWidth={2}
                fill={partyColor}
                fillOpacity={0.4}
                dot={{
                  r: compact ? 2.5 : 3.5,
                  fill: partyColor,
                  stroke: '#ffffff',
                  strokeWidth: 1.5,
                }}
              />
              
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Micro-Stats Ribbon */}
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {/* Attendance Pill */}
        <div 
          onMouseEnter={() => setActiveMetric('Attendance')}
          onMouseLeave={() => setActiveMetric(null)}
          className={`p-1.5 border transition cursor-default text-center ${
            activeMetric === 'Attendance' 
              ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' 
              : 'border-[#1a1a1a]/15 bg-[#fcfbf8] text-[#1a1a1a]'
          }`}
        >
          <div className="text-[8px] font-mono uppercase tracking-wider text-[#8a8479]">Attendance</div>
          <div className="font-serif font-black text-xs text-[#2d6a4f]">{parliamentaryRecord.attendancePercent}%</div>
          <div className="text-[8px] font-mono text-[#8a8479]">Avg: {nationalAvgAttendance}%</div>
        </div>

        {/* Debates Pill */}
        <div 
          onMouseEnter={() => setActiveMetric('Debates')}
          onMouseLeave={() => setActiveMetric(null)}
          className={`p-1.5 border transition cursor-default text-center ${
            activeMetric === 'Debates' 
              ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' 
              : 'border-[#1a1a1a]/15 bg-[#fcfbf8] text-[#1a1a1a]'
          }`}
        >
          <div className="text-[8px] font-mono uppercase tracking-wider text-[#8a8479]">Debates</div>
          <div className="font-serif font-black text-xs text-[#1a1a1a]">{debatesCount}</div>
          <div className="text-[8px] font-mono text-[#8a8479]">Floor debates</div>
        </div>

        {/* PM Bills Pill */}
        <div 
          onMouseEnter={() => setActiveMetric('PM Bills')}
          onMouseLeave={() => setActiveMetric(null)}
          className={`p-1.5 border transition cursor-default text-center ${
            activeMetric === 'PM Bills' 
              ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' 
              : 'border-[#1a1a1a]/15 bg-[#fcfbf8] text-[#1a1a1a]'
          }`}
        >
          <div className="text-[8px] font-mono uppercase tracking-wider text-[#8a8479]">PM Bills</div>
          <div className="font-serif font-black text-xs text-[#c44d31]">{pmBillsCount}</div>
          <div className="text-[8px] font-mono text-[#8a8479]">Private bills</div>
        </div>
      </div>
    </div>
  );
};
