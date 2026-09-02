/**
 * React Hook for WebMCP Protocol Registration & Agent Workspace State
 * Safely registers tools via document.modelContext when available.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  AgentStatus,
  WebMCPToolExecutionLog,
  ActiveInvestigation,
  WebMCPToolDefinition,
  WebMCPStateControllers,
  AgentNotification
} from './types';
import { createWebMCPTools } from './tools';

export interface UseWebMCPOptions {
  controllers: WebMCPStateControllers;
}

export function useWebMCP({ controllers }: UseWebMCPOptions) {
  const [isWebMCPSupported, setIsWebMCPSupported] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [logs, setLogs] = useState<WebMCPToolExecutionLog[]>([]);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);
  const [agentNotification, setAgentNotification] = useState<AgentNotification | null>(null);
  const notificationTimeoutRef = useRef<any>(null);

  const [activeInvestigation, setActiveInvestigation] = useState<ActiveInvestigation>({
    politicianIds: [],
    focusArea: 'all',
    lastUpdated: Date.now()
  });

  const toolsRef = useRef<WebMCPToolDefinition[]>([]);

  const triggerNotification = useCallback((notification: Omit<AgentNotification, 'id' | 'timestamp'>) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    const notif: AgentNotification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: Date.now()
    };
    setAgentNotification(notif);
    notificationTimeoutRef.current = setTimeout(() => {
      setAgentNotification(null);
    }, 4800);
  }, []);

  // Wrap execute function with telemetry & agent state tracking
  const instrumentTool = useCallback((tool: WebMCPToolDefinition): WebMCPToolDefinition => {
    return {
      ...tool,
      execute: async (input: Record<string, any>) => {
        const startTime = performance.now();
        const logId = `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        
        // Update agent status based on tool being called
        if (tool.name.startsWith('search')) setAgentStatus('searching');
        else if (tool.name.startsWith('compare')) setAgentStatus('comparing');
        else if (tool.name.startsWith('set_')) setAgentStatus('updating_view');
        else if (tool.name.includes('evidence')) setAgentStatus('retrieving_evidence');
        else setAgentStatus('retrieving');

        // Track active investigation context
        if (input.politician_ids && Array.isArray(input.politician_ids)) {
          setActiveInvestigation(prev => ({
            ...prev,
            politicianIds: input.politician_ids,
            focusArea: input.focus_area || prev.focusArea || 'all',
            lastUpdated: Date.now()
          }));
        } else if (input.politician_id && typeof input.politician_id === 'string') {
          setActiveInvestigation(prev => ({
            ...prev,
            politicianIds: prev.politicianIds.includes(input.politician_id)
              ? prev.politicianIds
              : [...prev.politicianIds, input.politician_id].slice(-4),
            lastUpdated: Date.now()
          }));
        }

        // Generate automatic notification for state actuations
        if (tool.name === 'set_comparison_view' && input.politician_ids) {
          triggerNotification({
            title: 'Agent Updated Investigation Matrix',
            subtitle: `Focus: ${input.focus_area || 'all'} dimension`,
            focusArea: input.focus_area || 'all',
            politicians: input.politician_ids
          });
        }

        try {
          const result = await tool.execute(input);
          const executionTimeMs = Math.round(performance.now() - startTime);

          let outputSummary = 'Completed';
          if (result && typeof result === 'object') {
            if (result.totalMatches !== undefined) outputSummary = `Found ${result.totalMatches} matches`;
            else if (result.name) outputSummary = `Profile loaded: ${result.name}`;
            else if (result.attendancePercent !== undefined) outputSummary = `Attendance: ${result.attendancePercent}%`;
            else if (result.comparedCount !== undefined) outputSummary = `Compared ${result.comparedCount} MPs`;
            else if (result.success !== undefined) outputSummary = `UI state applied`;
            else if (result.criminalCases) outputSummary = `${result.criminalCases.length} legal records`;
          }

          const newLog: WebMCPToolExecutionLog = {
            id: logId,
            toolName: tool.name,
            timestamp: Date.now(),
            input,
            outputSummary,
            status: 'success',
            executionTimeMs
          };

          setLogs(prev => [newLog, ...prev.slice(0, 49)]);
          setAgentStatus('completed');
          return result;
        } catch (error: any) {
          const executionTimeMs = Math.round(performance.now() - startTime);
          const errorLog: WebMCPToolExecutionLog = {
            id: logId,
            toolName: tool.name,
            timestamp: Date.now(),
            input,
            outputSummary: error?.message || 'Execution error',
            status: 'error',
            executionTimeMs
          };
          setLogs(prev => [errorLog, ...prev.slice(0, 49)]);
          setAgentStatus('error');
          throw error;
        }
      }
    };
  }, [triggerNotification]);

  // Initialize and register WebMCP tools
  useEffect(() => {
    const rawTools: WebMCPToolDefinition[] = createWebMCPTools(controllers);
    const instrumented: WebMCPToolDefinition[] = rawTools.map(instrumentTool);
    toolsRef.current = instrumented;

    const doc = typeof document !== 'undefined' ? (document as any) : null;
    const hasNativeWebMCP = !!doc?.modelContext;
    setIsWebMCPSupported(hasNativeWebMCP);

    if (hasNativeWebMCP && doc.modelContext) {
      try {
        if (typeof doc.modelContext.provideContext === 'function') {
          doc.modelContext.provideContext(instrumented);
        } else if (typeof doc.modelContext.registerTool === 'function') {
          instrumented.forEach((tool: WebMCPToolDefinition) => {
            doc.modelContext?.registerTool?.(tool);
          });
        }
        setIsRegistered(true);
      } catch (err) {
        console.warn('[WebMCP] Error registering native tools:', err);
      }
    }

    // Expose in-browser testing harness for developers and agents
    if (typeof window !== 'undefined') {
      (window as any).__webmcp_neta_watch__ = {
        tools: instrumented,
        isNative: hasNativeWebMCP,
        version: '1.0.0-lok-sabha-18',
        executeTool: async (name: string, input: Record<string, any>) => {
          const target = toolsRef.current.find(t => t.name === name);
          if (!target) throw new Error(`WebMCP tool '${name}' is not registered.`);
          return target.execute(input);
        }
      };
    }

    return () => {
      if (hasNativeWebMCP && doc?.modelContext) {
        try {
          if (typeof doc.modelContext.clearContext === 'function') {
            doc.modelContext.clearContext();
          } else if (typeof doc.modelContext.unregisterTool === 'function') {
            instrumented.forEach((t: WebMCPToolDefinition) => doc.modelContext?.unregisterTool?.(t.name));
          }
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [controllers, instrumentTool]);

  // Direct manual trigger for agent actions from UI
  const executeAgentTool = useCallback(async (toolName: string, input: Record<string, any>) => {
    const target = toolsRef.current.find(t => t.name === toolName);
    if (!target) {
      console.error(`Tool ${toolName} not found`);
      return null;
    }
    return await target.execute(input);
  }, []);

  const startInvestigation = useCallback((politicianId: string) => {
    setActiveInvestigation({
      politicianIds: [politicianId],
      focusArea: 'all',
      lastUpdated: Date.now()
    });
    setIsWorkspaceOpen(true);
    executeAgentTool('get_politician_profile', { politician_id: politicianId });
  }, [executeAgentTool]);

  const clearLogs = useCallback(() => {
    setLogs([]);
    setAgentStatus('idle');
  }, []);

  return {
    isWebMCPSupported,
    isRegistered,
    agentStatus,
    logs,
    tools: toolsRef.current,
    isWorkspaceOpen,
    setIsWorkspaceOpen,
    activeInvestigation,
    setActiveInvestigation,
    agentNotification,
    setAgentNotification,
    triggerNotification,
    executeAgentTool,
    startInvestigation,
    clearLogs
  };
}
