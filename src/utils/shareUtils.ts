import { Politician } from '../types';

/**
 * Generates an absolute deep-link URL for a given politician
 */
export function getPoliticianDeepLink(politicianId: string): string {
  if (typeof window === 'undefined') {
    return `https://netawatch.india/?mp=${encodeURIComponent(politicianId)}`;
  }
  const url = new URL(window.location.href);
  url.searchParams.set('mp', politicianId);
  return url.toString();
}

/**
 * Generates a clean, rich social media formatted summary of the MP's dossier
 */
export function generateSocialShareSummary(politician: Politician, deepLinkUrl?: string): string {
  const url = deepLinkUrl || getPoliticianDeepLink(politician.id);
  
  const assetFormatted = `₹${
    politician.assets.totalCr >= 100 
      ? politician.assets.totalCr.toFixed(0) 
      : politician.assets.totalCr.toFixed(1)
  } Cr`;
  
  const liabilityFormatted = `₹${politician.assets.liabilitiesCr} Cr`;
  
  const casesSummary = politician.criminalRecords.totalCases === 0
    ? '0 Cases (Clean Affidavit)'
    : `${politician.criminalRecords.totalCases} Charges (${politician.criminalRecords.seriousCases} Serious IPC)`;

  const attendance = `${politician.parliamentaryRecord.attendancePercent}%`;
  const mplads = `${politician.mplads.utilizationPercent}% (₹${politician.mplads.spentCr} Cr spent)`;

  return `🏛️ NetaWatch MP Dossier: ${politician.name} (${politician.partyAbbr})
📍 ${politician.constituency}, ${politician.state} • ${politician.house}
💼 Role: ${politician.currentRole}

📊 Key Verified Parliamentary & Civic Records:
• Declared Assets: ${assetFormatted} (Liabilities: ${liabilityFormatted})
• Lok Sabha Attendance: ${attendance} | ${politician.parliamentaryRecord.debatesCount} Debates
• MPLADS Fund Delivery: ${mplads}
• ECI Form 26 Affidavits: ${casesSummary}

🔍 Audit full verified dossier & disclosures on NetaWatch:
${url}

#NetaWatch #LokSabha #CivicTransparency #ECI #Form26 #IndianPolitics`;
}

/**
 * Generates a compact version suitable for platforms with strict character limits (e.g. X/Twitter)
 */
export function generateShortTweetText(politician: Politician): string {
  const assetFormatted = `₹${
    politician.assets.totalCr >= 100 
      ? politician.assets.totalCr.toFixed(0) 
      : politician.assets.totalCr.toFixed(1)
  }Cr`;
  
  const cases = politician.criminalRecords.totalCases === 0 
    ? '0 Cases (Clean)' 
    : `${politician.criminalRecords.totalCases} Cases (${politician.criminalRecords.seriousCases} Serious)`;

  return `🏛️ MP Civic Record: ${politician.name} (${politician.partyAbbr}, ${politician.constituency})
• Assets: ${assetFormatted}
• Attendance: ${politician.parliamentaryRecord.attendancePercent}%
• MPLADS Spent: ${politician.mplads.utilizationPercent}%
• Criminal Affidavits: ${cases}

Audit full verified dossier on @NetaWatch:`;
}

/**
 * Copies formatted summary or link to clipboard with browser fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}

/**
 * External social sharing destination URLs
 */
export interface ShareDestination {
  id: string;
  name: string;
  url: string;
  color: string;
}

export function getShareDestinations(politician: Politician, deepLinkUrl: string): ShareDestination[] {
  const shortText = generateShortTweetText(politician);
  const fullSummary = generateSocialShareSummary(politician, deepLinkUrl);
  const encodedUrl = encodeURIComponent(deepLinkUrl);
  const encodedFullSummary = encodeURIComponent(fullSummary);
  const encodedShortText = encodeURIComponent(shortText);

  return [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedFullSummary}`,
      color: '#25D366',
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodedShortText}&url=${encodedUrl}&hashtags=NetaWatch,LokSabha,CivicTransparency`,
      color: '#000000',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedShortText}`,
      color: '#229ED9',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: '#0A66C2',
    },
    {
      id: 'reddit',
      name: 'Reddit',
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`MP Dossier: ${politician.name} (${politician.partyAbbr}, ${politician.constituency}) - NetaWatch Public Record`)}`,
      color: '#FF4500',
    },
    {
      id: 'email',
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(`NetaWatch MP Civic Dossier: ${politician.name}`)}&body=${encodedFullSummary}`,
      color: '#4B5563',
    },
  ];
}
