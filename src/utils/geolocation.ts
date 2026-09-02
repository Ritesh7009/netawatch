import { MPConstituencyEntry, ALL_CONSTITUENCIES_DIRECTORY } from '../data/allConstituencies';
import { Politician } from '../types';

export interface UserLocationInfo {
  city: string;
  district: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  matchedConstituency: string;
  detectionMethod: 'gps' | 'ip' | 'manual' | 'default';
  timestamp: number;
}

// Major Indian constituencies with reference coordinates (Centroids)
export const CONSTITUENCY_COORDINATES: { [key: string]: { lat: number; lng: number; state: string } } = {
  // Delhi
  'New Delhi': { lat: 28.6139, lng: 77.2090, state: 'Delhi (NCT)' },
  'Chandni Chowk': { lat: 28.6506, lng: 77.2303, state: 'Delhi (NCT)' },
  'East Delhi': { lat: 28.6280, lng: 77.2950, state: 'Delhi (NCT)' },
  'North East Delhi': { lat: 28.7000, lng: 77.2700, state: 'Delhi (NCT)' },

  // Uttar Pradesh
  'Varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
  'Lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
  'Rae Bareli': { lat: 26.2303, lng: 81.2409, state: 'Uttar Pradesh' },
  'Kannauj': { lat: 27.0553, lng: 79.9149, state: 'Uttar Pradesh' },
  'Mainpuri': { lat: 27.2300, lng: 79.0300, state: 'Uttar Pradesh' },
  'Faizabad (Ayodhya)': { lat: 26.7731, lng: 82.1460, state: 'Uttar Pradesh' },
  'Mathura': { lat: 27.4924, lng: 77.6737, state: 'Uttar Pradesh' },
  'Meerut': { lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh' },
  'Gorakhpur': { lat: 26.7606, lng: 83.3732, state: 'Uttar Pradesh' },
  'Nagina': { lat: 29.4444, lng: 78.4314, state: 'Uttar Pradesh' },
  'Gautam Buddha Nagar (Noida)': { lat: 28.5355, lng: 77.3910, state: 'Uttar Pradesh' },
  'Ghaziabad': { lat: 28.6692, lng: 77.4538, state: 'Uttar Pradesh' },
  'Agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
  'Kanpur': { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
  'Prayagraj (Allahabad)': { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh' },
  'Amethi': { lat: 26.1550, lng: 81.8150, state: 'Uttar Pradesh' },

  // Maharashtra
  'Mumbai North': { lat: 19.2288, lng: 72.8541, state: 'Maharashtra' },
  'Mumbai South': { lat: 18.9388, lng: 72.8354, state: 'Maharashtra' },
  'Mumbai North Central': { lat: 19.0657, lng: 72.8447, state: 'Maharashtra' },
  'Thane': { lat: 19.2183, lng: 72.9781, state: 'Maharashtra' },
  'Kalyan': { lat: 19.2437, lng: 73.1355, state: 'Maharashtra' },
  'Pune': { lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  'Baramati': { lat: 18.1519, lng: 74.5771, state: 'Maharashtra' },
  'Nagpur': { lat: 21.1458, lng: 79.0882, state: 'Maharashtra' },
  'Nashik': { lat: 19.9975, lng: 73.7898, state: 'Maharashtra' },
  'Kolhapur': { lat: 16.7050, lng: 74.2433, state: 'Maharashtra' },
  'Chhatrapati Sambhajinagar': { lat: 19.8762, lng: 75.3433, state: 'Maharashtra' },

  // Karnataka
  'Bangalore South': { lat: 12.9249, lng: 77.5833, state: 'Karnataka' },
  'Bangalore Central': { lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  'Bangalore North': { lat: 13.0358, lng: 77.5970, state: 'Karnataka' },
  'Bangalore Rural': { lat: 12.9800, lng: 77.4500, state: 'Karnataka' },
  'Mandya': { lat: 12.5218, lng: 76.8951, state: 'Karnataka' },
  'Shimoga': { lat: 13.9299, lng: 75.5681, state: 'Karnataka' },

  // Gujarat
  'Gandhinagar': { lat: 23.2156, lng: 72.6369, state: 'Gujarat' },
  'Navsari': { lat: 20.9467, lng: 72.9520, state: 'Gujarat' },
  'Surat': { lat: 21.1702, lng: 72.8311, state: 'Gujarat' },
  'Rajkot': { lat: 22.3039, lng: 70.8022, state: 'Gujarat' },
  'Porbandar': { lat: 21.6417, lng: 69.6293, state: 'Gujarat' },

  // Tamil Nadu
  'Chennai South': { lat: 12.9800, lng: 80.2200, state: 'Tamil Nadu' },
  'Chennai Central': { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  'Thoothukkudi': { lat: 8.7642, lng: 78.1348, state: 'Tamil Nadu' },
  'Coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu' },
  'Madurai': { lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu' },

  // West Bengal
  'Kolkata South': { lat: 22.5200, lng: 88.3500, state: 'West Bengal' },
  'Kolkata North': { lat: 22.5800, lng: 88.3700, state: 'West Bengal' },
  'Diamond Harbour': { lat: 22.1900, lng: 88.1900, state: 'West Bengal' },
  'Krishnanagar': { lat: 23.4000, lng: 88.5000, state: 'West Bengal' },
  'Darjeeling': { lat: 27.0410, lng: 88.2663, state: 'West Bengal' },

  // Telangana & Andhra Pradesh
  'Hyderabad': { lat: 17.3850, lng: 78.4867, state: 'Telangana' },
  'Secunderabad': { lat: 17.4399, lng: 78.4983, state: 'Telangana' },
  'Chevella': { lat: 17.3078, lng: 78.1348, state: 'Telangana' },
  'Guntur': { lat: 16.3067, lng: 80.4365, state: 'Andhra Pradesh' },
  'Visakhapatnam': { lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh' },

  // Kerala
  'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366, state: 'Kerala' },
  'Ernakulam': { lat: 9.9816, lng: 76.2999, state: 'Kerala' },
  'Thrissur': { lat: 10.5276, lng: 76.2144, state: 'Kerala' },
  'Wayanad': { lat: 11.6854, lng: 76.1320, state: 'Kerala' },

  // Bihar
  'Patna Sahib': { lat: 25.5941, lng: 85.1376, state: 'Bihar' },
  'Hajipur': { lat: 25.6858, lng: 85.2146, state: 'Bihar' },
  'Saran': { lat: 25.7796, lng: 84.7499, state: 'Bihar' },
  'Gaya': { lat: 24.7914, lng: 85.0002, state: 'Bihar' },

  // Madhya Pradesh & Rajasthan
  'Indore': { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
  'Vidisha': { lat: 23.5251, lng: 77.8081, state: 'Madhya Pradesh' },
  'Guna': { lat: 24.6469, lng: 77.3110, state: 'Madhya Pradesh' },
  'Kota': { lat: 25.2138, lng: 75.8648, state: 'Rajasthan' },
  'Bikaner': { lat: 28.0229, lng: 73.3119, state: 'Rajasthan' },

  // Others
  'Mandi': { lat: 31.5892, lng: 76.9182, state: 'Himachal Pradesh' },
  'Hamirpur': { lat: 31.6862, lng: 76.5213, state: 'Himachal Pradesh' },
  'Jorhat': { lat: 26.7509, lng: 94.2037, state: 'Assam' },
  'Srinagar': { lat: 34.0837, lng: 74.7973, state: 'Jammu & Kashmir' },
};

// Haversine distance in kilometers
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find closest constituency by GPS coordinates
export function findClosestConstituencyByCoords(lat: number, lng: number): { constituency: string; state: string; distanceKm: number } {
  let closestName = 'New Delhi';
  let closestState = 'Delhi (NCT)';
  let minDistance = Infinity;

  for (const [name, data] of Object.entries(CONSTITUENCY_COORDINATES)) {
    const dist = getDistanceKm(lat, lng, data.lat, data.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestName = name;
      closestState = data.state;
    }
  }

  return { constituency: closestName, state: closestState, distanceKm: Math.round(minDistance) };
}

// State normalization map for matching API responses
const STATE_ALIASES: { [key: string]: string } = {
  'delhi': 'Delhi (NCT)',
  'national capital territory of delhi': 'Delhi (NCT)',
  'nct of delhi': 'Delhi (NCT)',
  'new delhi': 'Delhi (NCT)',
  'up': 'Uttar Pradesh',
  'uttar pradesh': 'Uttar Pradesh',
  'maharashtra': 'Maharashtra',
  'karnataka': 'Karnataka',
  'tamil nadu': 'Tamil Nadu',
  'west bengal': 'West Bengal',
  'gujarat': 'Gujarat',
  'telangana': 'Telangana',
  'andhra pradesh': 'Andhra Pradesh',
  'kerala': 'Kerala',
  'bihar': 'Bihar',
  'madhya pradesh': 'Madhya Pradesh',
  'rajasthan': 'Rajasthan',
  'punjab': 'Punjab',
  'haryana': 'Haryana',
  'himachal pradesh': 'Himachal Pradesh',
  'jammu and kashmir': 'Jammu & Kashmir',
  'jammu & kashmir': 'Jammu & Kashmir',
  'assam': 'Assam',
  'odisha': 'Odisha',
  'orissa': 'Odisha',
  'jharkhand': 'Jharkhand',
  'chhattisgarh': 'Chhattisgarh',
  'uttarakhand': 'Uttarakhand',
  'goa': 'Goa',
};

export function normalizeStateName(rawState: string): string {
  if (!rawState) return 'Delhi (NCT)';
  const key = rawState.toLowerCase().trim();
  return STATE_ALIASES[key] || rawState;
}

const STORAGE_KEY = 'netawatch_user_location';

/**
 * Get stored location or detect automatically
 */
export function getSavedUserLocation(): UserLocationInfo | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // ignore localStorage errors
  }
  return null;
}

export function saveUserLocation(info: UserLocationInfo) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
  } catch (e) {
    // ignore
  }
}

/**
 * Detect User Location using Browser GPS + IP Fallback
 */
export async function detectUserLocation(): Promise<UserLocationInfo> {
  // Check if already in cache and not older than 12 hours
  const cached = getSavedUserLocation();
  if (cached && Date.now() - cached.timestamp < 12 * 60 * 60 * 1000) {
    return cached;
  }

  // 1. Try Browser Geolocation API if available
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 300000, // 5 min cache
          enableHighAccuracy: false,
        });
      });

      const { latitude, longitude } = position.coords;
      const closest = findClosestConstituencyByCoords(latitude, longitude);

      // Attempt reverse geocode for exact district/city
      let city = closest.constituency;
      let district = closest.constituency;
      let state = closest.state;

      try {
        const revRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (revRes.ok) {
          const revData = await revRes.json();
          if (revData.principalSubdivision) {
            state = normalizeStateName(revData.principalSubdivision);
          }
          if (revData.city || revData.locality) {
            city = revData.city || revData.locality;
          }
        }
      } catch (e) {
        // use closest coords mapping
      }

      const result: UserLocationInfo = {
        city: city || closest.constituency,
        district: district || closest.constituency,
        state: state || closest.state,
        country: 'India',
        latitude,
        longitude,
        matchedConstituency: closest.constituency,
        detectionMethod: 'gps',
        timestamp: Date.now(),
      };

      saveUserLocation(result);
      return result;
    } catch (gpsError) {
      console.log('[NetaWatch Geolocation] GPS skipped or permission prompt dismissed, checking IP location...');
    }
  }

  // 2. IP Location Fallback (Fast & non-intrusive)
  try {
    const ipRes = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3500),
    });
    if (ipRes.ok) {
      const data = await ipRes.json();
      const state = normalizeStateName(data.region || data.region_name || 'Delhi (NCT)');
      const city = data.city || 'New Delhi';
      const lat = data.latitude;
      const lng = data.longitude;

      let matchedConstituency = 'New Delhi';
      if (lat && lng) {
        matchedConstituency = findClosestConstituencyByCoords(lat, lng).constituency;
      } else {
        // match by state
        const stateConstituency = ALL_CONSTITUENCIES_DIRECTORY.find((c) => c.state.toLowerCase() === state.toLowerCase());
        if (stateConstituency) {
          matchedConstituency = stateConstituency.constituency;
        }
      }

      const result: UserLocationInfo = {
        city: city,
        district: data.region || city,
        state: state,
        country: data.country_name || 'India',
        latitude: lat,
        longitude: lng,
        matchedConstituency,
        detectionMethod: 'ip',
        timestamp: Date.now(),
      };

      saveUserLocation(result);
      return result;
    }
  } catch (ipError) {
    console.log('[NetaWatch Geolocation] IP fetch timed out, applying default Indian capital region');
  }

  // 3. Safe Default (National Capital Region)
  const defaultLoc: UserLocationInfo = {
    city: 'New Delhi',
    district: 'New Delhi',
    state: 'Delhi (NCT)',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    matchedConstituency: 'New Delhi',
    detectionMethod: 'default',
    timestamp: Date.now(),
  };

  saveUserLocation(defaultLoc);
  return defaultLoc;
}

/**
 * Get nearby/adjacent constituencies in the same state or region
 */
export function getNearbyConstituencies(
  currentConstituency: string,
  state: string,
  limit: number = 4
): MPConstituencyEntry[] {
  const normState = normalizeStateName(state);

  // 1. Same state entries first (excluding current)
  const sameState = ALL_CONSTITUENCIES_DIRECTORY.filter(
    (c) => c.state.toLowerCase() === normState.toLowerCase() && c.constituency.toLowerCase() !== currentConstituency.toLowerCase()
  );

  if (sameState.length >= limit) {
    return sameState.slice(0, limit);
  }

  // 2. If fewer in same state, add others
  const others = ALL_CONSTITUENCIES_DIRECTORY.filter(
    (c) => c.state.toLowerCase() !== normState.toLowerCase() && c.constituency.toLowerCase() !== currentConstituency.toLowerCase()
  );

  return [...sameState, ...others].slice(0, limit);
}

/**
 * Find major Union Ministers, Cabinet Ministers, CMs, or key leaders representing a State
 */
export function getStateMajorMinisters(state: string, allPoliticians: Politician[]): Politician[] {
  const normState = normalizeStateName(state);

  // Match leaders from this state who hold major ministerial roles or party leadership
  const stateLeaders = allPoliticians.filter((p) => {
    const pState = normalizeStateName(p.state.includes('/') ? p.state.split('/')[0].trim() : p.state);
    const pSecondState = p.state.includes('/') ? normalizeStateName(p.state.split('/')[1].trim()) : '';
    return pState.toLowerCase() === normState.toLowerCase() || pSecondState.toLowerCase() === normState.toLowerCase();
  });

  // Sort ministers and high-profile roles first
  return stateLeaders.sort((a, b) => {
    const aIsMinister = a.currentRole.toLowerCase().includes('minister') || a.currentRole.toLowerCase().includes('prime minister') ? 2 : 1;
    const bIsMinister = b.currentRole.toLowerCase().includes('minister') || b.currentRole.toLowerCase().includes('prime minister') ? 2 : 1;
    if (bIsMinister !== aIsMinister) return bIsMinister - aIsMinister;
    return b.assets.totalCr - a.assets.totalCr;
  });
}
