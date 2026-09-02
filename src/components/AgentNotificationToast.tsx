import React from 'react';
import { Sparkles, X, Layers, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { AgentNotification } from '../webmcp/types';

interface AgentNotificationToastProps {
  notification: AgentNotification | null;
  onDismiss: () => void;
  onOpenInspector: () => void;
}

export const AgentNotificationToast: React.FC<AgentNotificationToastProps> = ({
  notification,
  onDismiss,
  onOpenInspector,
}) => {
  if (!notification) return null;

  return (
    <aside 
      aria-label="Agent Activity Notification"
      className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-in slide-in-from-top-4 fade-in duration-200"
    >
      <div className="bg-[#18181b] text-white border border-[#c44d31]/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-start gap-3">
        {/* Pulsing AI Indicator */}
        <div className="h-8 w-8 rounded-lg bg-[#c44d31]/20 border border-[#c44d31]/40 flex items-center justify-center text-[#c44d31] flex-shrink-0 mt-0.5">
          <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
              WebMCP Actuation
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Just now</span>
          </div>

          <h4 className="text-xs font-bold text-white mt-1 leading-snug">
            {notification.title}
          </h4>

          {notification.subtitle && (
            <p className="text-[11px] text-zinc-300 font-mono mt-0.5">
              {notification.subtitle}
            </p>
          )}

          {notification.politicians && notification.politicians.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {notification.politicians.map((id) => (
                <span
                  key={id}
                  className="text-[10px] bg-white/10 text-zinc-200 px-1.5 py-0.5 rounded font-mono"
                >
                  {id}
                </span>
              ))}
            </div>
          )}

          {/* Action Link */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <button
              onClick={onOpenInspector}
              className="text-[#c44d31] hover:text-[#e0684a] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Inspect Agent Telemetry</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          title="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
};
