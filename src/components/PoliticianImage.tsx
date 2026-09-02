import React, { useState, useEffect } from 'react';
import { 
  VERIFIED_POLITICIAN_PHOTOS, 
  getVerifiedPoliticianPhoto, 
  normalizeLeaderKey,
  generateCandidatePhotoUrls
} from '../data/politicianPhotos';
import { Landmark } from 'lucide-react';

interface PoliticianImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  partyColor?: string;
  name?: string;
  constituency?: string;
  state?: string;
}

// Global in-memory cache to share fetched photos across all components
const globalClientPhotoCache = new Map<string, string>();

export const PoliticianImage: React.FC<PoliticianImageProps> = ({
  src,
  alt,
  className = 'h-full w-full object-cover',
  partyColor = '#1a1a1a',
  name = '',
  constituency = '',
  state = '',
}) => {
  const politicianName = name || alt || '';
  const cacheKey = `${politicianName.toLowerCase().trim()}_${(constituency || '').toLowerCase().trim()}`;

  // Generate ordered array of candidate image URLs for this MP
  const getCandidateList = (): string[] => {
    const list: string[] = [];

    // 0. Check global client photo cache
    if (globalClientPhotoCache.has(cacheKey)) {
      list.push(globalClientPhotoCache.get(cacheKey)!);
    }

    // 1. Explicitly passed source if valid
    if (src && typeof src === 'string' && src.startsWith('http') && !src.includes('photo-1544005313-94ddf0286df2')) {
      if (!list.includes(src)) list.push(src);
    }

    // 2. Direct verified lookup
    const verified = getVerifiedPoliticianPhoto(politicianName);
    if (verified && !list.includes(verified)) {
      list.push(verified);
    }

    // 3. Candidate URLs from registry & Wikimedia
    const candidates = generateCandidatePhotoUrls(politicianName);
    for (const cand of candidates) {
      if (cand && !list.includes(cand)) {
        list.push(cand);
      }
    }

    return list;
  };

  const [candidates, setCandidates] = useState<string[]>(getCandidateList());
  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasAttemptedApi, setHasAttemptedApi] = useState<boolean>(false);

  useEffect(() => {
    const nextList = getCandidateList();
    setCandidates(nextList);
    setCandidateIndex(0);
    setHasAttemptedApi(false);
    setHasError(nextList.length === 0);
    setIsLoading(nextList.length > 0);
  }, [src, name, alt, constituency]);

  // If all static candidate URLs fail, query the live online resolver (/api/politician-photo)
  const fetchLivePhoto = async () => {
    if (hasAttemptedApi || !politicianName) return;
    setHasAttemptedApi(true);

    try {
      const queryParams = new URLSearchParams({
        name: politicianName,
        constituency: constituency || '',
        state: state || '',
      });

      const res = await fetch(`/api/politician-photo?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.photo && typeof data.photo === 'string' && data.photo.startsWith('http')) {
          globalClientPhotoCache.set(cacheKey, data.photo);
          setCandidates((prev) => [data.photo, ...prev]);
          setCandidateIndex(0);
          setHasError(false);
          setIsLoading(true);
          return;
        }
      }
    } catch {
      // ignore network errors
    }

    setHasError(true);
    setIsLoading(false);
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return 'MP';
    const parts = fullName
      .replace(/^(Shri|Dr\.|Smt\.|Mr\.|Mrs\.|Adv\.|Prof\.|Km\.|Sushri|Chaudhary|Ch\.)\s+/i, '')
      .trim()
      .split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleImageError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else if (!hasAttemptedApi) {
      fetchLivePhoto();
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (candidates[candidateIndex]) {
      globalClientPhotoCache.set(cacheKey, candidates[candidateIndex]);
    }
  };

  const currentUrl = candidates[candidateIndex];

  if (hasError || !currentUrl) {
    return (
      <div 
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-[#1a1a1a]/15 p-2 select-none shadow-inner"
        style={{
          backgroundColor: '#fcfbf8',
        }}
      >
        {/* Subtle Parliament Silhouette Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Landmark className="h-4/5 w-4/5 text-[#1a1a1a]" />
        </div>

        {/* Top party indicator line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: partyColor }}
        />

        {/* Dignified Avatar Badge */}
        <div 
          className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#1a1a1a]/20 shadow-xs"
          style={{
            backgroundColor: `${partyColor}18`,
            color: partyColor,
          }}
        >
          <span className="font-serif text-sm sm:text-base font-black tracking-tight uppercase">
            {getInitials(politicianName)}
          </span>
        </div>

        <span className="mt-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#66625b] truncate max-w-full px-1">
          18th LS • MP
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f2eee5]">
      <img
        src={currentUrl}
        alt={alt || name}
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f7f5ef] animate-pulse">
          <Landmark className="h-6 w-6 text-[#8a8479]/40" />
        </div>
      )}
    </div>
  );
};
