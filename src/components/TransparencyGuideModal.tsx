import React from 'react';
import { X, BookOpen, FileCheck, ShieldAlert, Landmark, TrendingUp } from 'lucide-react';

interface TransparencyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransparencyGuideModal: React.FC<TransparencyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div 
        id="transparency-guide-content"
        className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col border border-[#18181b]/30 bg-[#faf9f6] shadow-2xl overflow-hidden text-[#18181b] rounded-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#18181b]/15 bg-[#f1ede4] px-5 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-white text-[#18181b] border border-[#18181b]/20 shadow-2xs">
              <BookOpen className="h-5 w-5 text-[#c44d31]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-black text-[#18181b] uppercase tracking-tight">
                Citizen Intelligence & Transparency Guide
              </h3>
              <p className="text-xs text-[#71717a]">
                Audit methodology for election affidavits, parliamentary performance, and MPLADS spending
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="border border-[#18181b]/20 bg-white p-2 text-[#18181b] hover:bg-[#c44d31] hover:text-white transition rounded-xs shadow-2xs"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-[#2c2925] bg-[#faf9f6]">
          
          {/* Section 1 */}
          <div className="border border-[#18181b]/15 bg-white p-4 space-y-2 rounded-xs shadow-2xs">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#c44d31] flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              1. ECI Form 26 & ADR Sworn Affidavits
            </h4>
            <p className="leading-relaxed text-[#52525b]">
              Every candidate contesting Lok Sabha, Rajya Sabha, or State Assembly elections is legally mandated under the Representation of the People Act 1951 to file Form 26 under oath. This details movable assets (cash, bank accounts, shares, jewelry), immovable properties (agricultural land, residential flats), liabilities, and ongoing criminal proceedings.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border border-[#18181b]/15 bg-white p-4 space-y-2 rounded-xs shadow-2xs">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#18181b] flex items-center gap-2">
              <Landmark className="h-4 w-4 text-[#c44d31]" />
              2. Parliamentary Attendance & Debate Metrics
            </h4>
            <p className="leading-relaxed text-[#52525b]">
              Attendance records are compiled directly from the Lok Sabha and Rajya Sabha Secretariat registers. The national average attendance for Lok Sabha MPs stands at approximately <strong className="text-[#18181b]">79%</strong>. Ministers representing the Government of India do not ask questions in the House as per parliamentary convention, but actively lead and respond to legislative debates.
            </p>
          </div>

          {/* Section 3 */}
          <div className="border border-[#18181b]/15 bg-white p-4 space-y-2 rounded-xs shadow-2xs">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1b6b47] flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              3. MPLADS Fund Execution & Guidelines
            </h4>
            <p className="leading-relaxed text-[#52525b]">
              The Member of Parliament Local Area Development Scheme (MPLADS) enables MPs to recommend developmental works of capital nature in their constituencies with an annual entitlement of <strong className="text-[#18181b]">₹5 Crore</strong> (totaling ₹25 Crore per 5-year term). Key priority sectors include public healthcare infrastructure, drinking water schemes, primary education classrooms, and rural connecting roads.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border border-[#18181b]/15 bg-white p-4 space-y-2 rounded-xs shadow-2xs">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#c44d31] flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              4. Classification of Criminal Disclosures
            </h4>
            <p className="leading-relaxed text-[#52525b]">
              Association for Democratic Reforms (ADR) classifies legal cases into Serious vs Non-Serious categories based on maximum imprisonment terms under IPC (now BNS). Cases arising out of political protest or peaceful dharna are distinguished from serious offences involving financial fraud, violence, or corruption.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-[#18181b]/15 bg-[#f1ede4] px-5 sm:px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="border border-[#18181b] bg-[#18181b] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition rounded-xs shadow-2xs"
          >
            Got it, Back to Dossiers
          </button>
        </div>

      </div>
    </div>
  );
};
