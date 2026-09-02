/**
 * NetaWatch WebMCP Protocol Types & Interfaces
 * Compatible with W3C Web Machine Learning CG & OpenAI WebMCP Specification
 */

import { ViewMode } from '../types';

export type AgentStatus =
  | 'idle'
  | 'searching'
  | 'retrieving'
  | 'comparing'
  | 'updating_view'
  | 'retrieving_evidence'
  | 'completed'
  | 'error';

export interface WebMCPToolExecutionLog {
  id: string;
  toolName: string;
  timestamp: number;
  input: Record<string, any>;
  outputSummary: string;
  status: 'success' | 'error';
  executionTimeMs: number;
}

export interface ActiveInvestigation {
  objective?: string;
  politicianIds: string[];
  focusArea?: 'all' | 'parliamentary' | 'financial' | 'legal' | 'initiatives';
  evidenceType?: 'criminal_cases' | 'asset_affidavits' | 'contracts_and_conflicts' | 'all';
  activeEvidence?: any;
  lastUpdated: number;
}

/**
 * Standard WebMCP Tool Definition
 * Ref: document.modelContext.registerTool(toolDefinition)
 */
export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description?: string;
      enum?: readonly string[] | string[];
      items?: {
        type: string;
        enum?: readonly string[] | string[];
        description?: string;
      };
      default?: any;
      minItems?: number;
      maxItems?: number;
    }>;
    required?: string[];
  };
  execute: (input: Record<string, any>) => Promise<any>;
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
  exposedTo?: string[];
}

/**
 * Browser Model Context Global Interface
 */
export interface DocumentModelContext {
  registerTool?: (tool: WebMCPToolDefinition) => void | Promise<void>;
  unregisterTool?: (name: string) => void | Promise<void>;
  provideContext?: (tools: WebMCPToolDefinition[]) => void | Promise<void>;
  clearContext?: () => void | Promise<void>;
  listTools?: () => WebMCPToolDefinition[];
}

declare global {
  interface Document {
    modelContext?: DocumentModelContext;
  }
  interface Window {
    __webmcp_neta_watch__?: {
      tools: WebMCPToolDefinition[];
      executeTool: (name: string, input: Record<string, any>) => Promise<any>;
      isNative: boolean;
      version: string;
    };
  }
}

/**
 * UI State Controllers for WebMCP Actuation
 */
export interface WebMCPStateControllers {
  setSelectedPoliticianId: (id: string | null) => void;
  setCompareList: (updater: (prev: string[]) => string[]) => void;
  openCompareModalWithPoliticians: (ids: string[], focusArea?: string) => void;
  setViewMode: (mode: ViewMode) => void;
  openDossierModal: (politicianId: string) => void;
  notifyAgentAction?: (notification: AgentNotification) => void;
}

export interface AgentNotification {
  id: string;
  title: string;
  subtitle?: string;
  focusArea?: string;
  politicians?: string[];
  timestamp: number;
}

