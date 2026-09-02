import React, { useState } from 'react';
import { X, ShieldCheck, FileCheck, Send, CheckCircle2, ExternalLink, HelpCircle } from 'lucide-react';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPoliticianName?: string;
  defaultMetric?: string;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  defaultPoliticianName = '',
  defaultMetric = ''
}) => {
  const [politicianName, setPoliticianName] = useState(defaultPoliticianName);
  const [metricName, setMetricName] = useState(defaultMetric);
  const [discrepancyDetails, setDiscrepancyDetails] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // simulate receipt
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-[#fdfcfa] border border-[#18181b]/20 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#18181b]/15 bg-[#f5f1e8]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center bg-[#18181b] text-white rounded-lg">
              <FileCheck className="h-4 w-4 text-[#b4f82c]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#18181b] leading-tight">
                Request Data Review / Report Discrepancy
              </h3>
              <p className="text-[11px] text-[#71717a] font-mono">
                Evidence-First Civic Research Standard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/10 text-[#71717a] hover:text-[#18181b] transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#18181b]">
                Audit Request Logged
              </h4>
              <p className="text-xs text-[#52525b] max-w-md mx-auto leading-relaxed">
                Thank you for contributing to public data integrity. Our research desk cross-checks all reports against official Gazette records, Lok Sabha Hansard transcripts, and ECI Form 26 affidavits within 48 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-5 py-2 bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#c44d31] transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#f8f5ee] border border-[#18181b]/10 rounded-xl p-3.5 flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-[#c44d31] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#52525b] leading-relaxed">
                  <strong>Verification Requirement:</strong> All correction requests must cite an official government or judicial URL (e.g. <span className="font-mono text-[10px]">sansad.in</span>, <span className="font-mono text-[10px]">affidavit.eci.gov.in</span>, <span className="font-mono text-[10px]">pib.gov.in</span>, or court orders).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#18181b] mb-1">
                    Leader / MP Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Shah, Rahul Gandhi"
                    value={politicianName}
                    onChange={(e) => setPoliticianName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#18181b]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#18181b] mb-1">
                    Metric / Field
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Attendance %, Debates, Question count"
                    value={metricName}
                    onChange={(e) => setMetricName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#18181b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#18181b] mb-1">
                  Official Record Source URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://sansad.in/ls/members/... or https://affidavit.eci.gov.in/..."
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#18181b]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#18181b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#18181b] mb-1">
                  Description of Discrepancy & Suggested Value *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="State the observed difference and reference the specific page/session number in Hansard or Form 26..."
                  value={discrepancyDetails}
                  onChange={(e) => setDiscrepancyDetails(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#18181b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#18181b] mb-1">
                  Researcher / Reporter Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@institution.edu or name@domain.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#18181b]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#18181b]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#18181b]/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-[#52525b] hover:text-[#18181b] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#18181b] hover:bg-[#c44d31] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer shadow-xs"
                >
                  <Send className="h-3 w-3" />
                  <span>Submit for Audit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
