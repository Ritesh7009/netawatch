import React, { useState } from 'react';
import { 
  X, Check, Copy, Share2, ExternalLink, MessageCircle, Twitter, 
  Send, Linkedin, Globe, Sparkles, CheckCircle2, ShieldCheck,
  FileText, Link2, Smartphone
} from 'lucide-react';
import { Politician } from '../types';
import { 
  getPoliticianDeepLink, 
  generateSocialShareSummary, 
  getShareDestinations, 
  copyToClipboard 
} from '../utils/shareUtils';
import { analytics } from '../utils/analytics';
import { PoliticianImage } from './PoliticianImage';

interface ShareDossierModalProps {
  politician: Politician;
  isOpen: boolean;
  onClose: () => void;
  initialCopied?: boolean;
}

export const ShareDossierModal: React.FC<ShareDossierModalProps> = ({
  politician,
  isOpen,
  onClose,
  initialCopied = false,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(initialCopied);
  const [copiedLinkOnly, setCopiedLinkOnly] = useState(false);

  if (!isOpen) return null;

  const deepLinkUrl = getPoliticianDeepLink(politician.id);
  const formattedSummary = generateSocialShareSummary(politician, deepLinkUrl);
  const shareDestinations = getShareDestinations(politician, deepLinkUrl);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopySummary = async () => {
    const success = await copyToClipboard(formattedSummary);
    if (success) {
      setCopiedSummary(true);
      setCopiedLinkOnly(false);
      analytics.shareDossier(politician.name, politician.partyAbbr, 'clipboard_summary');
      setTimeout(() => setCopiedSummary(false), 3000);
    }
  };

  const handleCopyLinkOnly = async () => {
    const success = await copyToClipboard(deepLinkUrl);
    if (success) {
      setCopiedLinkOnly(true);
      setCopiedSummary(false);
      analytics.shareDossier(politician.name, politician.partyAbbr, 'clipboard_url_only');
      setTimeout(() => setCopiedLinkOnly(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `NetaWatch MP Dossier: ${politician.name}`,
          text: formattedSummary,
          url: deepLinkUrl,
        });
        analytics.shareDossier(politician.name, politician.partyAbbr, 'native_web_share');
      } catch (err) {
        // User cancelled or aborted
      }
    }
  };

  const handleExternalShare = (dest: typeof shareDestinations[0]) => {
    analytics.shareDossier(politician.name, politician.partyAbbr, dest.id);
    window.open(dest.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Share Dialog Container */}
      <div 
        id="share-dossier-modal"
        className="relative z-10 w-full max-w-xl rounded-sm border border-[#18181b]/30 bg-[#faf9f6] shadow-2xl overflow-hidden text-[#18181b] animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Top Accent Stripe */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ backgroundColor: politician.partyColor }} />

        {/* Dialog Header */}
        <div className="flex items-center justify-between border-b border-[#18181b]/15 bg-[#e8e4da] px-4 sm:px-5 py-3 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 bg-white border border-[#18181b]/20 rounded-xs text-[#c44d31]">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#18181b] leading-tight">
                Share Parliamentary Dossier
              </h3>
              <p className="text-[11px] text-[#52525b] truncate">
                Deep-link & verified civic metrics summary for social media
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="border border-[#18181b]/30 bg-[#18181b] p-1.5 text-white hover:bg-[#c44d31] hover:border-[#c44d31] transition rounded-xs touch-manipulation min-h-[34px] min-w-[34px] flex items-center justify-center shadow-2xs"
            aria-label="Close"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Politician Mini Profile Badge */}
          <div className="flex items-center gap-3 p-3 bg-white border border-[#18181b]/15 rounded-xs shadow-2xs">
            <div className="h-12 w-12 overflow-hidden border border-[#18181b]/20 bg-[#f1ede4] flex-shrink-0 rounded-xs">
              <PoliticianImage
                src={politician.photo}
                alt={politician.name}
                partyColor={politician.partyColor}
                name={politician.name}
                constituency={politician.constituency}
                state={politician.state}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="px-1.5 py-0.5 text-[9px] font-bold uppercase border rounded-xs"
                  style={{ backgroundColor: `${politician.partyColor}15`, color: politician.partyColor, borderColor: `${politician.partyColor}40` }}
                >
                  {politician.partyAbbr}
                </span>
                <span className="text-[10px] text-[#71717a] font-mono uppercase">{politician.alliance}</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-[#18181b] truncate mt-0.5">
                {politician.name}
              </h4>
              <p className="text-[11px] text-[#52525b] truncate">
                {politician.constituency}, {politician.state} • {politician.currentRole}
              </p>
            </div>
          </div>

          {/* Quick Copy Action Banner */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#52525b] block font-mono">
              1. Direct Social Media Summary + Deep Link
            </label>
            
            <button
              onClick={handleCopySummary}
              className={`w-full flex items-center justify-center gap-2 border px-4 py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm rounded-xs touch-manipulation min-h-[44px] ${
                copiedSummary
                  ? 'border-[#1b6b47] bg-[#1b6b47] text-white'
                  : 'border-[#18181b] bg-[#18181b] text-white hover:bg-[#c44d31] hover:border-[#c44d31]'
              }`}
            >
              {copiedSummary ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>Summary & Deep Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Formatted Summary & Deep Link</span>
                </>
              )}
            </button>
          </div>

          {/* Formatted Text Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] font-mono">
                Formatted Text Preview
              </span>
              <span className="text-[9px] text-[#1b6b47] font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-xs">
                Formatted for WhatsApp, X, LinkedIn
              </span>
            </div>
            
            <div className="relative border border-[#18181b]/20 bg-[#faf9f6] p-3 rounded-xs text-[11px] font-mono text-[#2c2925] leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto select-all">
              {formattedSummary}
            </div>
          </div>

          {/* Direct Link Only Box */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#52525b] block font-mono">
              2. Permanent Deep-Link URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 border border-[#18181b]/20 bg-white px-3 py-2 text-xs font-mono text-[#18181b] truncate rounded-xs select-all">
                {deepLinkUrl}
              </div>
              <button
                onClick={handleCopyLinkOnly}
                className={`border px-3 py-2 text-xs font-bold uppercase tracking-wider transition rounded-xs flex-shrink-0 touch-manipulation min-h-[38px] flex items-center gap-1.5 ${
                  copiedLinkOnly
                    ? 'border-[#1b6b47] bg-[#1b6b47] text-white'
                    : 'border-[#18181b]/30 bg-white text-[#18181b] hover:bg-[#18181b] hover:text-white'
                }`}
                title="Copy URL Only"
              >
                {copiedLinkOnly ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                <span>{copiedLinkOnly ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          {/* One-Click Social Platforms Grid */}
          <div className="space-y-2 pt-1 border-t border-[#18181b]/10">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#52525b] block font-mono">
              3. One-Click Social Sharing
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              
              {/* WhatsApp */}
              <button
                onClick={() => handleExternalShare(shareDestinations.find(d => d.id === 'whatsapp')!)}
                className="flex items-center justify-center gap-2 border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              {/* X / Twitter */}
              <button
                onClick={() => handleExternalShare(shareDestinations.find(d => d.id === 'twitter')!)}
                className="flex items-center justify-center gap-2 border border-[#18181b]/20 bg-zinc-900 hover:bg-black text-white px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
              >
                <Twitter className="h-4 w-4" />
                <span>X (Twitter)</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleExternalShare(shareDestinations.find(d => d.id === 'telegram')!)}
                className="flex items-center justify-center gap-2 border border-sky-500/30 bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-800 px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
              >
                <Send className="h-4 w-4 text-sky-600" />
                <span>Telegram</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleExternalShare(shareDestinations.find(d => d.id === 'linkedin')!)}
                className="flex items-center justify-center gap-2 border border-blue-600/30 bg-blue-50 hover:bg-blue-700 hover:text-white text-blue-800 px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span>LinkedIn</span>
              </button>

              {/* Reddit */}
              <button
                onClick={() => handleExternalShare(shareDestinations.find(d => d.id === 'reddit')!)}
                className="flex items-center justify-center gap-2 border border-orange-500/30 bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-800 px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
              >
                <ExternalLink className="h-4 w-4 text-orange-600" />
                <span>Reddit</span>
              </button>

              {/* Native Mobile Share if supported */}
              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-2 border border-[#18181b]/30 bg-white hover:bg-[#18181b] hover:text-white text-[#18181b] px-3 py-2.5 text-xs font-bold transition rounded-xs touch-manipulation min-h-[40px] shadow-2xs"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Device Share</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="border-t border-[#18181b]/10 bg-[#f1ede4] px-4 py-2.5 flex items-center justify-between text-[10px] text-[#71717a]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1b6b47]" />
            <span>Audited & verified against official ECI Form 26 & Lok Sabha digital journals</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-[#18181b] hover:text-[#c44d31] uppercase tracking-wider"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
