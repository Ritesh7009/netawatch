/**
 * Vector SVG Path Definitions and Centroids for Indian States & Union Territories.
 * Standardized on high-fidelity projection coordinate canvas: viewBox="0 0 700 780"
 */

export interface StateMapPathData {
  id: string;
  name: string;
  shortCode: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'Northeast' | 'UT';
  path: string;
  centroid: { x: number; y: number };
  labelOffset?: { x: number; y: number };
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number };
  zoneCoords?: { [constituencyName: string]: { x: number; y: number; width?: number; height?: number } };
}

export const INDIA_STATES_MAP_DATA: StateMapPathData[] = [
  // ==================== NORTH ====================
  {
    id: 'ladakh',
    name: 'Ladakh',
    shortCode: 'LA',
    region: 'UT',
    path: 'M 220,50 L 280,45 L 320,60 L 340,95 L 325,135 L 295,145 L 280,120 L 245,115 L 220,95 Z',
    centroid: { x: 280, y: 90 },
    boundingBox: { minX: 220, minY: 45, maxX: 340, maxY: 145 },
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    shortCode: 'JK',
    region: 'North',
    path: 'M 180,95 L 220,95 L 245,115 L 240,150 L 205,170 L 175,145 L 165,115 Z',
    centroid: { x: 205, y: 135 },
    boundingBox: { minX: 165, minY: 95, maxX: 245, maxY: 170 },
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    shortCode: 'HP',
    region: 'North',
    path: 'M 240,150 L 280,120 L 295,145 L 280,185 L 250,195 L 235,175 Z',
    centroid: { x: 260, y: 165 },
    boundingBox: { minX: 235, minY: 120, maxX: 295, maxY: 195 },
  },
  {
    id: 'punjab',
    name: 'Punjab',
    shortCode: 'PB',
    region: 'North',
    path: 'M 195,170 L 235,175 L 240,215 L 210,235 L 180,215 L 185,185 Z',
    centroid: { x: 210, y: 200 },
    boundingBox: { minX: 180, minY: 170, maxX: 240, maxY: 235 },
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    shortCode: 'CH',
    region: 'UT',
    path: 'M 233,195 L 243,195 L 243,205 L 233,205 Z',
    centroid: { x: 238, y: 200 },
    boundingBox: { minX: 233, minY: 195, maxX: 243, maxY: 205 },
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    shortCode: 'UK',
    region: 'North',
    path: 'M 280,185 L 325,180 L 335,215 L 305,240 L 275,225 L 280,195 Z',
    centroid: { x: 300, y: 210 },
    boundingBox: { minX: 275, minY: 180, maxX: 335, maxY: 240 },
  },
  {
    id: 'haryana',
    name: 'Haryana',
    shortCode: 'HR',
    region: 'North',
    path: 'M 225,215 L 260,205 L 270,240 L 255,275 L 220,270 L 215,235 Z',
    centroid: { x: 242, y: 245 },
    boundingBox: { minX: 215, minY: 205, maxX: 270, maxY: 275 },
  },
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    shortCode: 'DL',
    region: 'UT',
    path: 'M 255,248 L 268,248 L 268,260 L 255,260 Z',
    centroid: { x: 261, y: 254 },
    boundingBox: { minX: 255, minY: 248, maxX: 268, maxY: 260 },
  },

  // ==================== WEST & CENTRAL ====================
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    shortCode: 'RJ',
    region: 'West',
    path: 'M 150,230 L 215,220 L 250,265 L 245,330 L 200,355 L 140,330 L 125,270 Z',
    centroid: { x: 185, y: 290 },
    boundingBox: { minX: 125, minY: 220, maxX: 250, maxY: 355 },
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    shortCode: 'UP',
    region: 'North',
    path: 'M 265,240 L 330,225 L 390,250 L 415,295 L 390,340 L 330,340 L 285,320 L 270,275 Z',
    centroid: { x: 340, y: 285 },
    boundingBox: { minX: 265, minY: 225, maxX: 415, maxY: 340 },
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    shortCode: 'GJ',
    region: 'West',
    path: 'M 85,335 L 145,335 L 180,360 L 185,415 L 150,440 L 115,445 L 75,410 L 80,365 Z',
    centroid: { x: 135, y: 390 },
    boundingBox: { minX: 75, minY: 335, maxX: 185, maxY: 445 },
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    shortCode: 'MP',
    region: 'Central',
    path: 'M 205,345 L 285,325 L 345,345 L 365,400 L 320,440 L 245,435 L 195,405 Z',
    centroid: { x: 280, y: 385 },
    boundingBox: { minX: 195, minY: 325, maxX: 365, maxY: 440 },
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    shortCode: 'CG',
    region: 'Central',
    path: 'M 350,375 L 395,365 L 410,430 L 380,500 L 355,490 L 355,420 Z',
    centroid: { x: 375, y: 440 },
    boundingBox: { minX: 350, minY: 365, maxX: 410, maxY: 500 },
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    shortCode: 'MH',
    region: 'West',
    path: 'M 175,425 L 245,430 L 320,435 L 350,470 L 310,540 L 220,535 L 165,490 Z',
    centroid: { x: 250, y: 480 },
    boundingBox: { minX: 165, minY: 425, maxX: 350, maxY: 540 },
  },
  {
    id: 'goa',
    name: 'Goa',
    shortCode: 'GA',
    region: 'West',
    path: 'M 195,545 L 210,545 L 210,565 L 195,565 Z',
    centroid: { x: 202, y: 555 },
    boundingBox: { minX: 195, minY: 545, maxX: 210, maxY: 565 },
  },

  // ==================== EAST & NORTHEAST ====================
  {
    id: 'bihar',
    name: 'Bihar',
    shortCode: 'BR',
    region: 'East',
    path: 'M 395,275 L 470,270 L 485,320 L 420,335 L 395,305 Z',
    centroid: { x: 440, y: 300 },
    boundingBox: { minX: 395, minY: 270, maxX: 485, maxY: 335 },
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    shortCode: 'JH',
    region: 'East',
    path: 'M 405,335 L 475,325 L 480,380 L 415,395 L 395,365 Z',
    centroid: { x: 440, y: 360 },
    boundingBox: { minX: 395, minY: 325, maxX: 480, maxY: 395 },
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    shortCode: 'WB',
    region: 'East',
    path: 'M 475,270 L 505,260 L 500,310 L 530,370 L 485,420 L 465,390 L 475,325 Z',
    centroid: { x: 495, y: 350 },
    boundingBox: { minX: 465, minY: 260, maxX: 530, maxY: 420 },
  },
  {
    id: 'odisha',
    name: 'Odisha',
    shortCode: 'OD',
    region: 'East',
    path: 'M 400,395 L 475,390 L 490,445 L 435,490 L 390,460 Z',
    centroid: { x: 440, y: 440 },
    boundingBox: { minX: 390, minY: 390, maxX: 490, maxY: 490 },
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    shortCode: 'SK',
    region: 'Northeast',
    path: 'M 495,235 L 515,235 L 515,258 L 495,258 Z',
    centroid: { x: 505, y: 246 },
    boundingBox: { minX: 495, minY: 235, maxX: 515, maxY: 258 },
  },
  {
    id: 'assam',
    name: 'Assam',
    shortCode: 'AS',
    region: 'Northeast',
    path: 'M 535,270 L 610,250 L 635,280 L 590,315 L 545,310 Z',
    centroid: { x: 580, y: 285 },
    boundingBox: { minX: 535, minY: 250, maxX: 635, maxY: 315 },
  },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    shortCode: 'AR',
    region: 'Northeast',
    path: 'M 570,210 L 660,205 L 685,255 L 610,250 L 550,255 Z',
    centroid: { x: 625, y: 230 },
    boundingBox: { minX: 550, minY: 205, maxX: 685, maxY: 255 },
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    shortCode: 'NL',
    region: 'Northeast',
    path: 'M 635,275 L 665,275 L 660,315 L 630,310 Z',
    centroid: { x: 648, y: 295 },
    boundingBox: { minX: 630, minY: 275, maxX: 665, maxY: 315 },
  },
  {
    id: 'manipur',
    name: 'Manipur',
    shortCode: 'MN',
    region: 'Northeast',
    path: 'M 625,315 L 655,315 L 650,355 L 620,350 Z',
    centroid: { x: 638, y: 335 },
    boundingBox: { minX: 620, minY: 315, maxX: 655, maxY: 355 },
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    shortCode: 'MZ',
    region: 'Northeast',
    path: 'M 605,355 L 635,355 L 630,405 L 600,400 Z',
    centroid: { x: 618, y: 380 },
    boundingBox: { minX: 600, minY: 355, maxX: 635, maxY: 405 },
  },
  {
    id: 'tripura',
    name: 'Tripura',
    shortCode: 'TR',
    region: 'Northeast',
    path: 'M 570,355 L 598,355 L 595,395 L 565,390 Z',
    centroid: { x: 582, y: 375 },
    boundingBox: { minX: 565, minY: 355, maxX: 598, maxY: 395 },
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    shortCode: 'ML',
    region: 'Northeast',
    path: 'M 535,305 L 585,305 L 585,335 L 535,335 Z',
    centroid: { x: 560, y: 320 },
    boundingBox: { minX: 535, minY: 305, maxX: 585, maxY: 335 },
  },

  // ==================== SOUTH ====================
  {
    id: 'telangana',
    name: 'Telangana',
    shortCode: 'TG',
    region: 'South',
    path: 'M 275,495 L 345,475 L 375,525 L 320,575 L 265,545 Z',
    centroid: { x: 315, y: 530 },
    boundingBox: { minX: 265, minY: 475, maxX: 375, maxY: 575 },
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    shortCode: 'AP',
    region: 'South',
    path: 'M 330,555 L 420,490 L 425,560 L 360,650 L 310,615 L 340,575 Z',
    centroid: { x: 360, y: 585 },
    boundingBox: { minX: 310, minY: 490, maxX: 425, maxY: 650 },
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    shortCode: 'KA',
    region: 'South',
    path: 'M 205,535 L 285,535 L 305,615 L 275,670 L 210,655 L 195,570 Z',
    centroid: { x: 250, y: 605 },
    boundingBox: { minX: 195, minY: 535, maxX: 305, maxY: 670 },
  },
  {
    id: 'kerala',
    name: 'Kerala',
    shortCode: 'KL',
    region: 'South',
    path: 'M 220,660 L 255,660 L 270,735 L 250,755 L 230,730 Z',
    centroid: { x: 245, y: 705 },
    boundingBox: { minX: 220, minY: 660, maxX: 270, maxY: 755 },
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    shortCode: 'TN',
    region: 'South',
    path: 'M 270,640 L 340,635 L 345,710 L 285,760 L 260,730 L 275,665 Z',
    centroid: { x: 305, y: 695 },
    boundingBox: { minX: 260, minY: 635, maxX: 345, maxY: 760 },
  },
  {
    id: 'puducherry',
    name: 'Puducherry',
    shortCode: 'PY',
    region: 'UT',
    path: 'M 335,665 L 347,665 L 347,677 L 335,677 Z',
    centroid: { x: 341, y: 671 },
    boundingBox: { minX: 335, minY: 665, maxX: 347, maxY: 677 },
  },

  // ==================== ISLANDS & UTS ====================
  {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar',
    shortCode: 'AN',
    region: 'UT',
    path: 'M 610,600 L 625,600 L 625,680 L 610,680 Z',
    centroid: { x: 618, y: 640 },
    boundingBox: { minX: 610, minY: 600, maxX: 625, maxY: 680 },
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    shortCode: 'LD',
    region: 'UT',
    path: 'M 165,670 L 180,670 L 180,720 L 165,720 Z',
    centroid: { x: 172, y: 695 },
    boundingBox: { minX: 165, minY: 670, maxX: 180, maxY: 720 },
  },
  {
    id: 'dadra-nagar-haveli',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    shortCode: 'DN',
    region: 'UT',
    path: 'M 165,435 L 180,435 L 180,450 L 165,450 Z',
    centroid: { x: 172, y: 442 },
    boundingBox: { minX: 165, minY: 435, maxX: 180, maxY: 450 },
  },
];

/**
 * Geographic state aliases & mapping helpers
 */
export function getStateMapDataByName(name: string): StateMapPathData | undefined {
  const norm = name.trim().toLowerCase();
  return INDIA_STATES_MAP_DATA.find(
    s => s.name.toLowerCase() === norm || s.id.toLowerCase() === norm || norm.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(norm)
  );
}
