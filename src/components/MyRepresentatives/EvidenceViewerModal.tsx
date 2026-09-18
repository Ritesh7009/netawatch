import React from 'react';
import { X, FileCheck2, ExternalLink, ShieldCheck, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { EvidenceRecord } from '../../types/representation';

interface EvidenceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceRecord[];
}

export const EvidenceViewerModal: React.FC<EvidenceViewerModalProps> = ({
  isOpen,
  onClose,
  evidence,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181b]/60 backdrop-blur-xs">
      <div className="bg-white border border-[#18181b]/15 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-[#18181b]/10 flex items-center justify-between bg-[#f8f6f0]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-[#16a34a]/10 text-[#16a34a] rounded-xl">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#18181b]">
                Statutory Evidence & Public Records
              </h3>
              <p className="text-xs text-[#71717a]">
                Verified government notifications, Form 26 affidavits, and gazette citations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#71717a] hover:text-[#18181b] hover:bg-[#18181b]/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evidence List */}
        <div className="p-5 overflow-y-auto space-y-3.5">
          {evidence.map((item) => (
            <div 
              key={item.id}
              className="p-4 bg-[#f8f6f0] border border-[#18181b]/10 rounded-xl hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#18181b] text-white px-2 py-0.5 rounded">
                      {item.documentType}
                    </span>
                    <span className="text-[11px] font-mono text-[#15803d] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {item.verificationStatus}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#18181b] mt-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#52525b] mt-1 font-medium">
                    Authority: {item.sourceName}
                  </p>
                </div>

                {item.confidenceScore && (
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-[#71717a] block">Confidence</span>
                    <span className="text-xs font-mono font-bold text-[#15803d]">
                      {Math.round(item.confidenceScore * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {item.notes && (
                <p className="text-xs text-[#71717a] mt-2 italic bg-white p-2 rounded-lg border border-[#18181b]/5">
                  "{item.notes}"
                </p>
              )}

              <div className="mt-3 pt-3 border-t border-[#18181b]/10 flex items-center justify-between text-xs text-[#71717a]">
                <span className="font-mono text-[11px]">
                  Published: {item.publicationDate}
                </span>

                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#18181b] hover:text-[#c44d31] underline underline-offset-2 flex items-center gap-1"
                  >
                    View Official Document
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#18181b]/10 bg-[#f8f6f0] flex items-center justify-between text-xs text-[#71717a]">
          <span>Strict non-hallucinatory standard enforced</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#18181b] text-white text-xs font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
