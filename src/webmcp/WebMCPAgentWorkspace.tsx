/**
 * NetaWatch WebMCP Inspector & Developer Suite
 * Interactive live inspection surface for AI Agent tools, architecture, and live execution telemetry.
 */

import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
  FileCheck2,
  Flame,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Search,
  Scale,
  Code2,
  Workflow,
  Info,
  ExternalLink,
  Check,
  Copy,
  Eye,
  RefreshCw,
  Landmark,
  FileText
} from 'lucide-react';
import { AgentStatus, WebMCPToolExecutionLog, ActiveInvestigation, WebMCPToolDefinition } from './types';
import { POLITICIANS_DATA } from '../data/politicians';

interface WebMCPAgentWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  isWebMCPSupported: boolean;
  agentStatus: AgentStatus;
  logs: WebMCPToolExecutionLog[];
  activeInvestigation: ActiveInvestigation;
  tools?: WebMCPToolDefinition[];
  onExecuteTool: (toolName: string, input: Record<string, any>) => Promise<any>;
  onClearLogs: () => void;
  onOpenCompareModal: (ids: string[], focusArea?: string) => void;
}

export const WebMCPAgentWorkspace: React.FC<WebMCPAgentWorkspaceProps> = ({
  isOpen,
  onClose,
  isWebMCPSupported,
  agentStatus,
  logs,
  activeInvestigation,
  tools = [],
  onExecuteTool,
  onClearLogs,
  onOpenCompareModal
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'activity' | 'tools' | 'runner' | 'evidence'>('activity');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [expandedToolName, setExpandedToolName] = useState<string | null>(null);
  const [isRunningSample, setIsRunningSample] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [evidenceData, setEvidenceData] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Sample prompt workflows for human-agent collaboration
  const samplePrompts = [
    {
      title: '1. Compare 3 Leaders (Multi-Step Investigation)',
      prompt: 'Compare Amit Shah, Rahul Gandhi and Shivraj Singh Chouhan based on recent political activity.',
      description: 'Discovers politician profiles, compiles comparative matrix, and actuates NetaWatch compare view on-screen.',
      action: async () => {
        setIsRunningSample(true);
        setActiveStepIndex(0);
        try {
          await onExecuteTool('search_politicians', { query: 'Amit Shah' });
          setActiveStepIndex(1);
          await onExecuteTool('get_politician_profile', { politician_id: 'amit-shah' });
          setActiveStepIndex(2);
          await onExecuteTool('get_politician_profile', { politician_id: 'rahul-gandhi' });
          setActiveStepIndex(3);
          await onExecuteTool('get_politician_profile', { politician_id: 'shivraj-singh-chouhan' });
          setActiveStepIndex(4);
          await onExecuteTool('compare_politicians_matrix', {
            politician_ids: ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'],
            focus_areas: ['all']
          });
          setActiveStepIndex(5);
          await onExecuteTool('set_comparison_view', {
            politician_ids: ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'],
            open_compare_modal: true,
            focus_area: 'all'
          });
        } finally {
          setIsRunningSample(false);
          setActiveStepIndex(-1);
        }
      }
    },
    {
      title: '2. Refine Focus: Parliamentary Activity Only',
      prompt: 'Only consider parliamentary activity and public statements.',
      description: 'Narrows analytical lens exclusively to Hansard attendance, debates, questions asked, and official stances.',
      action: async () => {
        setIsRunningSample(true);
        setActiveStepIndex(0);
        try {
          await onExecuteTool('get_parliamentary_activity', { politician_id: 'amit-shah' });
          setActiveStepIndex(1);
          await onExecuteTool('get_parliamentary_activity', { politician_id: 'rahul-gandhi' });
          setActiveStepIndex(2);
          await onExecuteTool('get_parliamentary_activity', { politician_id: 'shivraj-singh-chouhan' });
          setActiveStepIndex(3);
          await onExecuteTool('get_political_statements_and_stances', { politician_id: 'rahul-gandhi' });
          setActiveStepIndex(4);
          await onExecuteTool('set_comparison_view', {
            politician_ids: ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'],
            open_compare_modal: true,
            focus_area: 'parliamentary'
          });
        } finally {
          setIsRunningSample(false);
          setActiveStepIndex(-1);
        }
      }
    },
    {
      title: '3. Challenge & Show Verified Evidence',
      prompt: 'Challenge this analysis and show me the verified evidence.',
      description: 'Fetches raw sworn ECI Form 26 affidavits, IPC chargesheets, and judicial case dockets for human audit.',
      action: async () => {
        setIsRunningSample(true);
        try {
          const res1 = await onExecuteTool('get_evidence_and_affidavits', {
            politician_id: 'amit-shah',
            evidence_type: 'all'
          });
          const res2 = await onExecuteTool('get_evidence_and_affidavits', {
            politician_id: 'rahul-gandhi',
            evidence_type: 'all'
          });
          setEvidenceData({ 'amit-shah': res1, 'rahul-gandhi': res2 });
          setActiveTab('evidence');
        } finally {
          setIsRunningSample(false);
        }
      }
    }
  ];

  const getStatusBadge = () => {
    switch (agentStatus) {
      case 'searching':
      case 'retrieving':
      case 'comparing':
      case 'updating_view':
      case 'retrieving_evidence':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Agent Active ({agentStatus.replace('_', ' ')})
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Execution Synced
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-3 h-3 text-red-400" />
            Execution Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            {isWebMCPSupported ? 'WebMCP Native Active' : 'WebMCP Harness Ready'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#0f1115] border-l border-white/10 shadow-2xl text-zinc-200 flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#c44d31]/20 border border-[#c44d31]/40 flex items-center justify-center text-[#c44d31]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">WebMCP Inspector</h3>
              {getStatusBadge()}
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              W3C Model Context Protocol • 8 Verified Tools • Bi-Directional Actuation
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close WebMCP Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-3 border-b border-white/10 bg-black/30 text-xs font-mono overflow-x-auto">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === 'architecture'
              ? 'border-[#c44d31] text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          Architecture
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === 'activity'
              ? 'border-[#c44d31] text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Live Stream ({logs.length})
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === 'tools'
              ? 'border-[#c44d31] text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Exposed Tools (8)
        </button>
        <button
          onClick={() => setActiveTab('runner')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === 'runner'
              ? 'border-[#c44d31] text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Test Runner
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
            activeTab === 'evidence'
              ? 'border-[#c44d31] text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Evidence Vault
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* -------------------------------------------------------------
            TAB 1: ARCHITECTURE (How It Works)
        ------------------------------------------------------------- */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs">
            {/* High level Banner */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Workflow className="w-4 h-4 text-[#c44d31]" />
                <span>How WebMCP Powers NetaWatch</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                NetaWatch exposes its political intelligence capabilities directly to AI agents via the open W3C Model Context Protocol (<code className="text-amber-300">document.modelContext</code>). External AI agents can discover tools, query verified parliamentary ledgers, and actuate the UI in real-time.
              </p>
            </div>

            {/* Visual Architecture Diagram */}
            <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-3 font-mono">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                System Interaction Flow
              </span>
              
              <div className="space-y-2 text-[11px]">
                {/* Step 1 */}
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c44d31] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                    <span className="text-zinc-200 font-bold">User Prompt in Agent Interface</span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">Natural Language</span>
                </div>

                <div className="text-center text-zinc-500 text-[10px]">↓ Invokes Agent Reasoning</div>

                {/* Step 2 */}
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c44d31] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                    <span className="text-zinc-200 font-bold">WebMCP Tool Discovery</span>
                  </div>
                  <span className="text-amber-300 text-[10px]">document.modelContext</span>
                </div>

                <div className="text-center text-zinc-500 text-[10px]">↓ Structured Tool Calls</div>

                {/* Step 3 */}
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c44d31] text-white flex items-center justify-center font-bold text-[10px]">3</span>
                    <span className="text-zinc-200 font-bold">NetaWatch Execution Layer</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">8 Verified Tools</span>
                </div>

                <div className="text-center text-zinc-500 text-[10px]">↓ Returns Ground Truth + Actuates UI</div>

                {/* Step 4 */}
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">4</span>
                    <span className="text-emerald-300 font-bold">Live NetaWatch Workspace &amp; Evidence</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">Synchronized State</span>
                </div>
              </div>
            </div>

            {/* Protocol Spec Details */}
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="p-3 bg-black/30 border border-white/5 rounded-lg space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase">Manifest Path</span>
                <span className="text-white">/public/webmcp.json</span>
              </div>
              <div className="p-3 bg-black/30 border border-white/5 rounded-lg space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase">Global Object</span>
                <span className="text-white">window.__webmcp_neta_watch__</span>
              </div>
              <div className="p-3 bg-black/30 border border-white/5 rounded-lg space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase">Runtime Environment</span>
                <span className={isWebMCPSupported ? 'text-emerald-400' : 'text-blue-400'}>
                  {isWebMCPSupported ? 'Native Browser MCP' : 'In-Browser Test Harness'}
                </span>
              </div>
              <div className="p-3 bg-black/30 border border-white/5 rounded-lg space-y-1">
                <span className="text-zinc-500 block text-[10px] uppercase">Data Verifiability</span>
                <span className="text-emerald-400">ECI + Hansard 100% Grounded</span>
              </div>
            </div>

            {/* Quick Manifest Copy */}
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-mono text-[11px]">Browser Discovery Test Snippet</span>
                <button
                  onClick={() => handleCopy("console.log(window.__webmcp_neta_watch__.tools);", "test_snippet")}
                  className="text-[10px] text-zinc-400 hover:text-white font-mono flex items-center gap-1 bg-white/5 px-2 py-1 rounded"
                >
                  {copiedCode === 'test_snippet' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'test_snippet' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 bg-black/80 rounded font-mono text-[10px] text-zinc-300 overflow-x-auto">
{`// Test WebMCP tools directly in browser console:
window.__webmcp_neta_watch__.executeTool('compare_politicians_matrix', {
  politician_ids: ['amit-shah', 'rahul-gandhi'],
  focus_areas: ['parliamentary']
}).then(console.log);`}
              </pre>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: LIVE STREAM ACTIVITY
        ------------------------------------------------------------- */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
              <span>Real-Time Execution Logs ({logs.length})</span>
              {logs.length > 0 && (
                <button
                  onClick={onClearLogs}
                  className="text-[10px] font-mono hover:text-white underline cursor-pointer"
                >
                  Clear Logs
                </button>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="p-8 border border-dashed border-white/10 rounded-xl text-center space-y-2">
                <Terminal className="w-8 h-8 mx-auto text-zinc-600" />
                <p className="text-sm text-zinc-400">No WebMCP tools executed yet</p>
                <p className="text-xs text-zinc-500 font-mono">
                  When an external AI agent calls tools or you run workflows from the Test Runner tab, real-time telemetry will stream here.
                </p>
                <button
                  onClick={() => setActiveTab('runner')}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c44d31] hover:bg-[#a83c24] text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Test Runner</span>
                </button>
              </div>
            ) : (
              logs.map(log => (
                <div
                  key={log.id}
                  className="p-3 bg-black/40 border border-white/5 rounded-lg text-xs space-y-2 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="text-white font-bold">{log.toolName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <Clock className="w-3 h-3" />
                      <span>{log.executionTimeMs}ms</span>
                      <button
                        onClick={() =>
                          setExpandedLogId(expandedLogId === log.id ? null : log.id)
                        }
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        {expandedLogId === log.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-[11px] bg-white/5 px-2 py-1 rounded">
                    {log.outputSummary}
                  </p>

                  {expandedLogId === log.id && (
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-zinc-400 uppercase">Input Arguments:</p>
                        <button
                          onClick={() => handleCopy(JSON.stringify(log.input, null, 2), log.id)}
                          className="text-[9px] text-zinc-500 hover:text-white"
                        >
                          {copiedCode === log.id ? 'Copied' : 'Copy JSON'}
                        </button>
                      </div>
                      <pre className="p-2 bg-black/80 rounded text-[10px] text-zinc-300 overflow-x-auto">
                        {JSON.stringify(log.input, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: EXPOSED TOOLS & SCHEMAS (8 Tools)
        ------------------------------------------------------------- */}
        {activeTab === 'tools' && (
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-1">
              <span className="font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>8 Registered WebMCP Tools</span>
              </span>
              <p className="text-zinc-400 text-[11px]">
                These tools are registered with <code className="text-amber-300">document.modelContext</code> and discoverable by any WebMCP-compatible client.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  name: 'search_politicians',
                  desc: 'Search 543 Lok Sabha MPs by name, constituency, state, party, or alliance coalition.',
                  readOnly: true,
                  params: ['query', 'alliance', 'state', 'limit']
                },
                {
                  name: 'get_politician_profile',
                  desc: 'Retrieve verified profile factsheet including education, role, bio, and Form 26 affidavit verification.',
                  readOnly: true,
                  params: ['politician_id*']
                },
                {
                  name: 'get_parliamentary_activity',
                  desc: 'Retrieve official attendance %, debates count, questions asked, and committee memberships.',
                  readOnly: true,
                  params: ['politician_id*']
                },
                {
                  name: 'get_political_statements_and_stances',
                  desc: 'Retrieve key public stances, declared policy positions, and sentiment-scored news coverage.',
                  readOnly: true,
                  params: ['politician_id*', 'topic_keyword']
                },
                {
                  name: 'get_political_activity_and_initiatives',
                  desc: 'Retrieve major landmark initiatives, career timeline, and MPLADS fund allocations.',
                  readOnly: true,
                  params: ['politician_id*']
                },
                {
                  name: 'compare_politicians_matrix',
                  desc: 'Perform multi-dimensional comparative analysis of 2 to 4 politicians across all metrics.',
                  readOnly: true,
                  params: ['politician_ids*', 'focus_areas']
                },
                {
                  name: 'set_comparison_view',
                  desc: 'Actuate and synchronize the NetaWatch live user interface (compare modal, focus tab, main view mode).',
                  readOnly: false,
                  params: ['politician_ids*', 'open_compare_modal', 'focus_area', 'switch_view']
                },
                {
                  name: 'get_evidence_and_affidavits',
                  desc: 'Retrieve verified ECI Form 26 sworn affidavits, court case dockets, IPC sections, and conflict flags.',
                  readOnly: true,
                  params: ['politician_id*', 'evidence_type']
                }
              ].map((toolItem) => {
                const isExpanded = expandedToolName === toolItem.name;
                return (
                  <div
                    key={toolItem.name}
                    className="p-3 bg-black/40 border border-white/10 rounded-lg space-y-2 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{toolItem.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded uppercase ${
                            toolItem.readOnly
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {toolItem.readOnly ? 'Read Only' : 'UI Actuation'}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setExpandedToolName(isExpanded ? null : toolItem.name)
                        }
                        className="text-zinc-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-300 font-sans">{toolItem.desc}</p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {toolItem.params.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] bg-white/5 text-zinc-400 px-1.5 py-0.5 rounded"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {isExpanded && (
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <button
                          onClick={() => {
                            if (toolItem.name === 'search_politicians') {
                              onExecuteTool('search_politicians', { query: 'Modi' });
                            } else if (toolItem.name === 'compare_politicians_matrix') {
                              onExecuteTool('compare_politicians_matrix', { politician_ids: ['amit-shah', 'rahul-gandhi'] });
                            } else if (toolItem.name === 'set_comparison_view') {
                              onExecuteTool('set_comparison_view', { politician_ids: ['amit-shah', 'rahul-gandhi'], open_compare_modal: true });
                            } else {
                              onExecuteTool(toolItem.name, { politician_id: 'amit-shah' });
                            }
                            setActiveTab('activity');
                          }}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Test Execute Sample Query</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: TEST RUNNER (Developer Simulation Sandbox)
        ------------------------------------------------------------- */}
        {activeTab === 'runner' && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#c44d31]/10 border border-[#c44d31]/30 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#c44d31]">
                <Flame className="w-4 h-4" />
                <span>Multi-Step Human-Agent Workflow Sandbox</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Simulate full investigation cycles where natural language prompts execute chains of WebMCP tools, synchronizing state with the live interface.
              </p>
            </div>

            <div className="space-y-3">
              {samplePrompts.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-black/40 border border-white/10 rounded-xl space-y-2.5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/10 text-[10px] flex items-center justify-center font-mono text-zinc-300">
                        {idx + 1}
                      </span>
                      {sp.title}
                    </span>
                    <button
                      disabled={isRunningSample}
                      onClick={sp.action}
                      className="px-3 py-1.5 rounded-lg bg-[#c44d31] hover:bg-[#a83c24] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {isRunningSample ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
                      <span>{isRunningSample ? 'Executing...' : 'Run Tools'}</span>
                    </button>
                  </div>

                  <p className="text-zinc-300 font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5">
                    "{sp.prompt}"
                  </p>

                  <p className="text-zinc-400 text-[11px]">
                    {sp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick State Actuation Shortcuts */}
            <div className="pt-2 space-y-2 font-mono">
              <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Direct State Actuation Presets
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    onExecuteTool('set_comparison_view', {
                      politician_ids: ['amit-shah', 'rahul-gandhi'],
                      open_compare_modal: true,
                      focus_area: 'parliamentary'
                    })
                  }
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-xs text-zinc-200 transition-colors cursor-pointer"
                >
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    Amit vs Rahul
                  </div>
                  <div className="text-[10px] text-zinc-400">Parliamentary Focus</div>
                </button>
                <button
                  onClick={() =>
                    onExecuteTool('set_comparison_view', {
                      politician_ids: ['amit-shah', 'rahul-gandhi', 'shivraj-singh-chouhan'],
                      open_compare_modal: true,
                      focus_area: 'financial'
                    })
                  }
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left text-xs text-zinc-200 transition-colors cursor-pointer"
                >
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    3-Way Wealth Audit
                  </div>
                  <div className="text-[10px] text-zinc-400">Declared Assets</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 5: EVIDENCE VAULT
        ------------------------------------------------------------- */}
        {activeTab === 'evidence' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Legal &amp; Asset Evidentiary Records</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Raw evidentiary records synthesized from sworn ECI Form 26 filings, High Court / Supreme Court e-Courts case dockets, and Sansad Hansard attendance logs.
              </p>
            </div>

            {evidenceData ? (
              <div className="space-y-3 font-mono text-[11px]">
                {Object.entries(evidenceData).map(([id, data]: [string, any]) => (
                  <div key={id} className="p-3.5 bg-black/60 border border-white/10 rounded-lg space-y-2.5">
                    <div className="flex items-center justify-between text-zinc-200 font-bold border-b border-white/10 pb-1.5">
                      <span>{data.politician_name} ({data.party})</span>
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{data.verifiedAffidavit ? 'ECI Form 26 Verified' : 'Affidavit Synthesized'}</span>
                      </span>
                    </div>

                    {data.criminalCases && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-400 uppercase">Criminal Cases / Chargesheets:</span>
                        {data.criminalCases.length === 0 ? (
                          <p className="text-emerald-400 text-[10px]">0 declared criminal cases.</p>
                        ) : (
                          data.criminalCases.map((c: any, cIdx: number) => (
                            <div key={cIdx} className="p-2 bg-white/5 rounded text-[10px] space-y-1">
                              <div className="flex items-center justify-between text-amber-300">
                                <span className="font-bold">{c.caseNumber}</span>
                                <span className="text-zinc-400">{c.courtLevel}</span>
                              </div>
                              <p className="text-zinc-300">{c.description}</p>
                              <div className="text-zinc-500">IPC Sections: {c.ipcSections?.join(', ')}</div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {data.assetAffidavits && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] text-zinc-400 uppercase">Sworn Wealth Disclosures:</span>
                        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                          <div className="p-2 bg-white/5 rounded">
                            <span className="text-zinc-500 block">Total Assets:</span>
                            <span className="text-white font-bold">₹{data.assetAffidavits.totalCr} Cr</span>
                          </div>
                          <div className="p-2 bg-white/5 rounded">
                            <span className="text-zinc-500 block">Declared Liabilities:</span>
                            <span className="text-white font-bold">₹{data.assetAffidavits.liabilitiesCr} Cr</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-dashed border-white/10 rounded-xl text-center space-y-3">
                <Search className="w-8 h-8 mx-auto text-zinc-500" />
                <p className="text-zinc-300 text-sm">No evidentiary records loaded yet</p>
                <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
                  Click below to fetch and inspect raw legal filings and asset affidavits for Amit Shah and Rahul Gandhi.
                </p>
                <button
                  onClick={() => samplePrompts[2].action()}
                  className="px-3.5 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold hover:bg-emerald-600/30 transition-colors cursor-pointer"
                >
                  Retrieve Evidence for Amit Shah &amp; Rahul Gandhi
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 bg-black/50 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
        <span>8 Tools Registered</span>
        <span>OpenAI WebMCP Protocol v1.0</span>
      </div>
    </div>
  );
};
