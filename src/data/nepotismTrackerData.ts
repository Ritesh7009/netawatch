import { Asset, Relative, Contractor, GovtContract, PoliticianTenure } from '../types';

// ============================================================================
// 1. DETAILED ASSET INVENTORY (ECI AFFIDAVITS & ADR DISCLOSURES)
// ============================================================================

export const ASSETS_DATA: Asset[] = [
  // --- AMIT SHAH ---
  {
    id: 'as-asset-1',
    politicianId: 'amit-shah',
    ownerType: 'self',
    ownerName: 'Amit Shah',
    category: 'financial',
    description: 'Listed equity portfolio (RIL, L&T, TCS, HDFC Bank) & Mutual Funds',
    declaredValue: 12.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=Gandhinagar',
    location: 'Demat with HDFC Securities, Ahmedabad',
    details: 'Disclosed in 2024 Lok Sabha ECI Form 26 Affidavit. Movable securities portfolio.'
  },
  {
    id: 'as-asset-2',
    politicianId: 'amit-shah',
    ownerType: 'self',
    ownerName: 'Amit Shah',
    category: 'financial',
    description: 'Listed equity shares & bank fixed deposits',
    declaredValue: 9.4,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=7442',
    location: 'Ahmedabad, Gujarat',
    details: 'Disclosed in 2019 Lok Sabha ECI Form 26 Affidavit.'
  },
  {
    id: 'as-asset-3',
    politicianId: 'amit-shah',
    ownerType: 'self',
    ownerName: 'Amit Shah',
    category: 'financial',
    description: 'Equity shares and commercial bank deposits',
    declaredValue: 4.2,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/rajsab2017/candidate.php?candidate_id=312',
    location: 'Ahmedabad, Gujarat'
  },
  {
    id: 'as-asset-4',
    politicianId: 'amit-shah',
    ownerType: 'self',
    ownerName: 'Amit Shah',
    category: 'financial',
    description: 'Investments in stocks and savings accounts',
    declaredValue: 2.1,
    yearDeclared: 2009,
    sourceDocumentUrl: 'https://myneta.info/gujarat2012/candidate.php?candidate_id=1054',
    location: 'Ahmedabad, Gujarat'
  },
  {
    id: 'as-asset-5',
    politicianId: 'amit-shah',
    ownerType: 'self',
    ownerName: 'Amit Shah',
    category: 'building',
    description: 'Residential Bungalow in Thaltej & ancestral house in Mansa',
    declaredValue: 7.6,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=Gandhinagar',
    location: 'Thaltej, Ahmedabad & Mansa, Gandhinagar'
  },
  {
    id: 'as-asset-6',
    politicianId: 'amit-shah',
    ownerType: 'spouse',
    ownerName: 'Sonal Shah',
    category: 'financial',
    description: 'Inherited shares, debentures and mutual fund schemes',
    declaredValue: 8.9,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=Gandhinagar',
    location: 'Ahmedabad Demat'
  },
  {
    id: 'as-asset-7',
    politicianId: 'amit-shah',
    ownerType: 'spouse',
    ownerName: 'Sonal Shah',
    category: 'jewelry',
    description: '860 grams gold jewelry, diamond ornaments & silver articles',
    declaredValue: 1.1,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=Gandhinagar',
    location: 'Bank Locker, Ahmedabad'
  },
  {
    id: 'as-asset-8',
    politicianId: 'amit-shah',
    ownerType: 'spouse',
    ownerName: 'Sonal Shah',
    category: 'land',
    description: 'Agricultural land parcels in Lilapur, Sanand & Gandhinagar',
    declaredValue: 6.3,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=Gandhinagar',
    location: 'Lilapur & Sanand, Gujarat'
  },

  // --- RAHUL GANDHI ---
  {
    id: 'rg-asset-1',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'financial',
    description: 'Mutual Funds (Large Cap & Flexi Cap) & Sovereign Gold Bonds',
    declaredValue: 4.33,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Kerala&constituency=Wayanad',
    location: 'New Delhi Demat',
    details: 'Disclosed in 2024 Wayanad/Rae Bareli ECI Form 26 Affidavit.'
  },
  {
    id: 'rg-asset-2',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'financial',
    description: 'Direct listed stock portfolio (25+ bluechip companies) & PPF',
    declaredValue: 4.91,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=RaeBareli',
    location: 'New Delhi'
  },
  {
    id: 'rg-asset-3',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'financial',
    description: 'Fixed deposits, postal savings & stock investments',
    declaredValue: 5.8,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=9872',
    location: 'New Delhi'
  },
  {
    id: 'rg-asset-4',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'financial',
    description: 'Bank deposits and mutual fund holdings',
    declaredValue: 2.8,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=3456',
    location: 'New Delhi'
  },
  {
    id: 'rg-asset-5',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'land',
    description: 'Agricultural farmland in Mauja Sultanpur (jointly with sister Priyanka Vadra)',
    declaredValue: 2.1,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Kerala&constituency=Wayanad',
    location: 'Mehrauli / Sultanpur, New Delhi'
  },
  {
    id: 'rg-asset-6',
    politicianId: 'rahul-gandhi',
    ownerType: 'self',
    ownerName: 'Rahul Gandhi',
    category: 'building',
    description: 'Commercial office space in Signature Towers',
    declaredValue: 9.05,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=RaeBareli',
    location: 'Gurugram, Haryana',
    details: 'Commercial suites (5,838 sq. ft.) generating rental yields.'
  },

  // --- NITIN GADKARI ---
  {
    id: 'ng-asset-1',
    politicianId: 'nitin-gadkari',
    ownerType: 'self',
    ownerName: 'Nitin Gadkari',
    category: 'building',
    description: 'Ancestral residential property in Mahal, Nagpur & flats in Worli Mumbai',
    declaredValue: 9.5,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Nagpur',
    location: 'Nagpur & Mumbai, Maharashtra'
  },
  {
    id: 'ng-asset-2',
    politicianId: 'nitin-gadkari',
    ownerType: 'self',
    ownerName: 'Nitin Gadkari',
    category: 'land',
    description: 'Agricultural land in Dhapewada, Kalmeshwar (joint family holding)',
    declaredValue: 6.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Nagpur',
    location: 'Dhapewada, Nagpur Rural'
  },
  {
    id: 'ng-asset-3',
    politicianId: 'nitin-gadkari',
    ownerType: 'spouse',
    ownerName: 'Kanchan Gadkari',
    category: 'financial',
    description: 'Shares in Agro-processing, Solar energy & Ethanol co-operatives',
    declaredValue: 7.2,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Nagpur',
    location: 'Nagpur, Maharashtra'
  },
  {
    id: 'ng-asset-4',
    politicianId: 'nitin-gadkari',
    ownerType: 'self',
    ownerName: 'Nitin Gadkari',
    category: 'financial',
    description: 'Fixed deposits and cooperative sugar mill shares',
    declaredValue: 4.8,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=6121',
    location: 'Nagpur, Maharashtra'
  },
  {
    id: 'ng-asset-5',
    politicianId: 'nitin-gadkari',
    ownerType: 'self',
    ownerName: 'Nitin Gadkari',
    category: 'financial',
    description: 'Bank balances and agricultural securities',
    declaredValue: 2.1,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=2311',
    location: 'Nagpur, Maharashtra'
  },

  // --- AKHILESH YADAV ---
  {
    id: 'ay-asset-1',
    politicianId: 'akhilesh-yadav',
    ownerType: 'self',
    ownerName: 'Akhilesh Yadav',
    category: 'building',
    description: 'Commercial complex & residential properties in Vikramaditya Marg & Saifai',
    declaredValue: 18.5,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=Kannauj',
    location: 'Lucknow & Saifai (Etawah), UP'
  },
  {
    id: 'ay-asset-2',
    politicianId: 'akhilesh-yadav',
    ownerType: 'spouse',
    ownerName: 'Dimple Yadav',
    category: 'building',
    description: 'Residential property in Lucknow & commercial plots in Etawah',
    declaredValue: 14.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=Mainpuri',
    location: 'Lucknow, Uttar Pradesh'
  },
  {
    id: 'ay-asset-3',
    politicianId: 'akhilesh-yadav',
    ownerType: 'spouse',
    ownerName: 'Dimple Yadav',
    category: 'jewelry',
    description: 'Gold jewelry (2.7 kg), diamonds & pearls',
    declaredValue: 2.9,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=Mainpuri',
    location: 'Lucknow'
  },
  {
    id: 'ay-asset-4',
    politicianId: 'akhilesh-yadav',
    ownerType: 'self',
    ownerName: 'Akhilesh Yadav',
    category: 'financial',
    description: 'National savings certificates, bank deposits, mutual funds',
    declaredValue: 8.6,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=UttarPradesh&constituency=Kannauj',
    location: 'Lucknow'
  },
  {
    id: 'ay-asset-5',
    politicianId: 'akhilesh-yadav',
    ownerType: 'self',
    ownerName: 'Akhilesh Yadav',
    category: 'financial',
    description: 'Bank balances, insurance policies and shares',
    declaredValue: 4.8,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=4521',
    location: 'Lucknow'
  },
  {
    id: 'ay-asset-6',
    politicianId: 'akhilesh-yadav',
    ownerType: 'self',
    ownerName: 'Akhilesh Yadav',
    category: 'financial',
    description: 'Fixed deposits and agricultural income savings',
    declaredValue: 2.2,
    yearDeclared: 2012,
    sourceDocumentUrl: 'https://myneta.info/up2012/candidate.php?candidate_id=98',
    location: 'Lucknow'
  },

  // --- JYOTIRADITYA SCINDIA ---
  {
    id: 'js-asset-1',
    politicianId: 'jyotiraditya-scindia',
    ownerType: 'self',
    ownerName: 'Jyotiraditya Scindia',
    category: 'building',
    description: 'Jai Vilas Palace (40 acres heritage property) & Gwalior House Mumbai',
    declaredValue: 297.0,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=MadhyaPradesh&constituency=Guna',
    location: 'Gwalior, MP & Worli, Mumbai',
    details: 'Heritage royal property & associated historic estates.'
  },
  {
    id: 'js-asset-2',
    politicianId: 'jyotiraditya-scindia',
    ownerType: 'self',
    ownerName: 'Jyotiraditya Scindia',
    category: 'financial',
    description: 'Investment in international trusts, debentures & bluechip securities',
    declaredValue: 68.4,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=MadhyaPradesh&constituency=Guna',
    location: 'Mumbai & New Delhi'
  },
  {
    id: 'js-asset-3',
    politicianId: 'jyotiraditya-scindia',
    ownerType: 'spouse',
    ownerName: 'Priyadarshini Raje Scindia',
    category: 'jewelry',
    description: 'Heritage antique gold, diamond necklace sets & silver royal collectibles',
    declaredValue: 38.6,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=MadhyaPradesh&constituency=Guna',
    location: 'Gwalior Royal Vault'
  },
  {
    id: 'js-asset-4',
    politicianId: 'jyotiraditya-scindia',
    ownerType: 'self',
    ownerName: 'Jyotiraditya Scindia',
    category: 'financial',
    description: 'Securities, ancestral trust assets and bank deposits',
    declaredValue: 42.1,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=5511',
    location: 'Mumbai'
  },
  {
    id: 'js-asset-5',
    politicianId: 'jyotiraditya-scindia',
    ownerType: 'self',
    ownerName: 'Jyotiraditya Scindia',
    category: 'financial',
    description: 'Heritage deposits and shares',
    declaredValue: 24.3,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=412',
    location: 'Mumbai'
  },

  // --- SUPRIYA SULE ---
  {
    id: 'ss-asset-1',
    politicianId: 'supriya-sule',
    ownerType: 'self',
    ownerName: 'Supriya Sule',
    category: 'financial',
    description: 'Listed equity portfolio in manufacturing, IT and renewable energy',
    declaredValue: 36.2,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Baramati',
    location: 'Pune & Mumbai Demat'
  },
  {
    id: 'ss-asset-2',
    politicianId: 'supriya-sule',
    ownerType: 'spouse',
    ownerName: 'Sadanand Sule',
    category: 'financial',
    description: 'Private equity shares in agro-tech, hospitality and software firms',
    declaredValue: 84.5,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Baramati',
    location: 'Mumbai'
  },
  {
    id: 'ss-asset-3',
    politicianId: 'supriya-sule',
    ownerType: 'self',
    ownerName: 'Supriya Sule',
    category: 'land',
    description: 'Agricultural sugarcane farms and orchards in Malegaon, Baramati',
    declaredValue: 16.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Maharashtra&constituency=Baramati',
    location: 'Baramati, Pune District'
  },
  {
    id: 'ss-asset-4',
    politicianId: 'supriya-sule',
    ownerType: 'self',
    ownerName: 'Supriya Sule',
    category: 'financial',
    description: 'Securities and bank accounts',
    declaredValue: 22.4,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=6219',
    location: 'Pune'
  },
  {
    id: 'ss-asset-5',
    politicianId: 'supriya-sule',
    ownerType: 'self',
    ownerName: 'Supriya Sule',
    category: 'financial',
    description: 'Financial deposits and land stakes',
    declaredValue: 12.6,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=2398',
    location: 'Pune'
  },

  // --- ABHISHEK BANERJEE ---
  {
    id: 'ab-asset-1',
    politicianId: 'abhishek-banerjee',
    ownerType: 'self',
    ownerName: 'Abhishek Banerjee',
    category: 'financial',
    description: 'Mutual Funds, Bank Fixed Deposits & Corporate Debentures',
    declaredValue: 5.4,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=WestBengal&constituency=DiamondHarbour',
    location: 'Kolkata, WB'
  },
  {
    id: 'ab-asset-2',
    politicianId: 'abhishek-banerjee',
    ownerType: 'spouse',
    ownerName: 'Rujira Banerjee',
    category: 'financial',
    description: 'Foreign currency bank accounts, fixed deposits & bullion',
    declaredValue: 6.9,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=WestBengal&constituency=DiamondHarbour',
    location: 'Kolkata & New Delhi'
  },
  {
    id: 'ab-asset-3',
    politicianId: 'abhishek-banerjee',
    ownerType: 'self',
    ownerName: 'Abhishek Banerjee',
    category: 'building',
    description: 'Residential apartments in Harish Mukherjee Road & Santiniketan',
    declaredValue: 4.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=WestBengal&constituency=DiamondHarbour',
    location: 'Kolkata, WB'
  },
  {
    id: 'ab-asset-4',
    politicianId: 'abhishek-banerjee',
    ownerType: 'self',
    ownerName: 'Abhishek Banerjee',
    category: 'financial',
    description: 'Bank savings and consultant advisory fees income',
    declaredValue: 1.8,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=8921',
    location: 'Kolkata'
  },
  {
    id: 'ab-asset-5',
    politicianId: 'abhishek-banerjee',
    ownerType: 'self',
    ownerName: 'Abhishek Banerjee',
    category: 'financial',
    description: 'Savings account balances',
    declaredValue: 0.45,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=5512',
    location: 'Kolkata'
  },

  // --- KANIMOZHI KARUNANIDHI ---
  {
    id: 'kk-asset-1',
    politicianId: 'kanimozhi-karunanidhi',
    ownerType: 'self',
    ownerName: 'Kanimozhi Karunanidhi',
    category: 'financial',
    description: 'Shares in Kalaignar TV Pvt Ltd, Westgate Logistics & mutual funds',
    declaredValue: 31.5,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=TamilNadu&constituency=Thoothukkudi',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 'kk-asset-2',
    politicianId: 'kanimozhi-karunanidhi',
    ownerType: 'self',
    ownerName: 'Kanimozhi Karunanidhi',
    category: 'building',
    description: 'Commercial complex in Anna Salai & residential bungalow in CIT Colony',
    declaredValue: 24.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=TamilNadu&constituency=Thoothukkudi',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 'kk-asset-3',
    politicianId: 'kanimozhi-karunanidhi',
    ownerType: 'spouse',
    ownerName: 'G. Aravindaan',
    category: 'financial',
    description: 'Overseas investments in software consultancy in Singapore',
    declaredValue: 12.3,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=TamilNadu&constituency=Thoothukkudi',
    location: 'Singapore / Chennai'
  },
  {
    id: 'kk-asset-4',
    politicianId: 'kanimozhi-karunanidhi',
    ownerType: 'self',
    ownerName: 'Kanimozhi Karunanidhi',
    category: 'financial',
    description: 'Media broadcasting equity and bank term deposits',
    declaredValue: 21.2,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=9102',
    location: 'Chennai'
  },
  {
    id: 'kk-asset-5',
    politicianId: 'kanimozhi-karunanidhi',
    ownerType: 'self',
    ownerName: 'Kanimozhi Karunanidhi',
    category: 'financial',
    description: 'Broadcasting company shares and land holdings',
    declaredValue: 14.1,
    yearDeclared: 2013,
    sourceDocumentUrl: 'https://myneta.info/rajsab2013/candidate.php?candidate_id=121',
    location: 'Chennai'
  },

  // --- CHIRAG PASWAN ---
  {
    id: 'cp-asset-1',
    politicianId: 'chirag-paswan',
    ownerType: 'self',
    ownerName: 'Chirag Paswan',
    category: 'building',
    description: 'Residential bungalow in Sri Krishna Puri, Patna & commercial studio',
    declaredValue: 6.2,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Bihar&constituency=Hajipur',
    location: 'Patna, Bihar & New Delhi'
  },
  {
    id: 'cp-asset-2',
    politicianId: 'chirag-paswan',
    ownerType: 'self',
    ownerName: 'Chirag Paswan',
    category: 'financial',
    description: 'Shares in Six Sense Entertainment & food processing logistics',
    declaredValue: 3.4,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Bihar&constituency=Hajipur',
    location: 'Patna & New Delhi'
  },
  {
    id: 'cp-asset-3',
    politicianId: 'chirag-paswan',
    ownerType: 'self',
    ownerName: 'Chirag Paswan',
    category: 'financial',
    description: 'Bank deposits and film production investments',
    declaredValue: 1.84,
    yearDeclared: 2019,
    sourceDocumentUrl: 'https://myneta.info/ls2019/candidate.php?candidate_id=4189',
    location: 'Patna'
  },
  {
    id: 'cp-asset-4',
    politicianId: 'chirag-paswan',
    ownerType: 'self',
    ownerName: 'Chirag Paswan',
    category: 'financial',
    description: 'Savings account balances',
    declaredValue: 0.95,
    yearDeclared: 2014,
    sourceDocumentUrl: 'https://myneta.info/ls2014/candidate.php?candidate_id=1109',
    location: 'Patna'
  },

  // --- DHARMENDRA PRADHAN ---
  {
    id: 'dp-asset-1',
    politicianId: 'dharmendra-pradhan',
    ownerType: 'self',
    ownerName: 'Dharmendra Pradhan',
    category: 'building',
    description: 'Residential house in Bhubaneswar & ancestral house in Talcher',
    declaredValue: 4.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Odisha&constituency=Sambalpur',
    location: 'Bhubaneswar & Angul, Odisha'
  },
  {
    id: 'dp-asset-2',
    politicianId: 'dharmendra-pradhan',
    ownerType: 'spouse',
    ownerName: 'Mrididula T. Pradhan',
    category: 'financial',
    description: 'Bank fixed deposits, mutual funds & life insurance investments',
    declaredValue: 3.6,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Odisha&constituency=Sambalpur',
    location: 'Bhubaneswar'
  },
  {
    id: 'dp-asset-3',
    politicianId: 'dharmendra-pradhan',
    ownerType: 'self',
    ownerName: 'Dharmendra Pradhan',
    category: 'financial',
    description: 'Bank deposits and PPF savings',
    declaredValue: 2.1,
    yearDeclared: 2018,
    sourceDocumentUrl: 'https://myneta.info/rajsab2018/candidate.php?candidate_id=451',
    location: 'Bhubaneswar'
  },
  {
    id: 'dp-asset-4',
    politicianId: 'dharmendra-pradhan',
    ownerType: 'self',
    ownerName: 'Dharmendra Pradhan',
    category: 'financial',
    description: 'Savings balances',
    declaredValue: 0.98,
    yearDeclared: 2012,
    sourceDocumentUrl: 'https://myneta.info/rajsab2012/candidate.php?candidate_id=231',
    location: 'Bhubaneswar'
  },

  // --- J. P. NADDA ---
  {
    id: 'jpn-asset-1',
    politicianId: 'jp-nadda',
    ownerType: 'self',
    ownerName: 'J. P. Nadda',
    category: 'building',
    description: 'Ancestral residential home in Bilaspur & flat in New Delhi',
    declaredValue: 4.6,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=RajyaSabha',
    location: 'Bilaspur, HP & New Delhi'
  },
  {
    id: 'jpn-asset-2',
    politicianId: 'jp-nadda',
    ownerType: 'spouse',
    ownerName: 'Mallika Nadda',
    category: 'financial',
    description: 'University pension provident fund, bank fixed deposits & mutual funds',
    declaredValue: 2.8,
    yearDeclared: 2024,
    sourceDocumentUrl: 'https://affidavit.eci.gov.in/Candidate/CandidateProfile?state=Gujarat&constituency=RajyaSabha',
    location: 'Shimla & New Delhi'
  },
  {
    id: 'jpn-asset-3',
    politicianId: 'jp-nadda',
    ownerType: 'self',
    ownerName: 'J. P. Nadda',
    category: 'financial',
    description: 'Bank deposits and savings bonds',
    declaredValue: 1.7,
    yearDeclared: 2018,
    sourceDocumentUrl: 'https://myneta.info/rajsab2018/candidate.php?candidate_id=561',
    location: 'Bilaspur'
  },
  {
    id: 'jpn-asset-4',
    politicianId: 'jp-nadda',
    ownerType: 'self',
    ownerName: 'J. P. Nadda',
    category: 'financial',
    description: 'Bank savings',
    declaredValue: 0.9,
    yearDeclared: 2012,
    sourceDocumentUrl: 'https://myneta.info/rajsab2012/candidate.php?candidate_id=119',
    location: 'Bilaspur'
  }
];

// ============================================================================
// 2. RELATIVES & FAMILY INTERESTS
// ============================================================================

export const RELATIVES_DATA: Relative[] = [
  // Amit Shah
  {
    id: 'rel-jay-shah',
    politicianId: 'amit-shah',
    name: 'Jay Shah',
    relationType: 'son',
    designationOrOccupation: 'ICC Chairman & BCCI Honorary Secretary; Former Director at Temple Enterprise',
    businessInterests: ['Kusum Finserve LLP', 'Temple Enterprise Pvt Ltd', 'Cricket Administration & Media Rights'],
    notes: 'Promoter & Designated Partner in Kusum Finserve LLP involved in agricultural warehousing and financial logistics.'
  },
  {
    id: 'rel-sonal-shah',
    politicianId: 'amit-shah',
    name: 'Sonal Shah',
    relationType: 'spouse',
    designationOrOccupation: 'Investor & Agricultural Landholder',
    businessInterests: ['Lilapur Agro Holdings', 'Equities Portfolio']
  },

  // Rahul Gandhi
  {
    id: 'rel-robert-vadra',
    politicianId: 'rahul-gandhi',
    name: 'Robert Vadra',
    relationType: 'brother-in-law',
    designationOrOccupation: 'Managing Director, Skylight Hospitality & Blue Breeze Trading',
    businessInterests: ['Skylight Hospitality Pvt Ltd', 'Real Estate Development', 'Hospitality Assets in Manesar & Bikaner'],
    notes: 'Spouse of Priyanka Gandhi Vadra; holds directorships across commercial hospitality and land aggregation entities.'
  },
  {
    id: 'rel-priyanka-vadra',
    politicianId: 'rahul-gandhi',
    name: 'Priyanka Gandhi Vadra',
    relationType: 'sister',
    designationOrOccupation: 'Member of Parliament (Wayanad); General Secretary, AICC',
    businessInterests: ['Mauja Sultanpur Agricultural Trust']
  },

  // Nitin Gadkari
  {
    id: 'rel-nikhil-gadkari',
    politicianId: 'nitin-gadkari',
    name: 'Nikhil Gadkari',
    relationType: 'son',
    designationOrOccupation: 'Director, Purti Power & Sugar Ltd (Manas Agro Industries)',
    businessInterests: ['Manas Agro Industries & Infrastructure Ltd', 'Biofuel & Bio-CNG Distilleries', 'Solar EPC Projects'],
    notes: 'Oversees renewable ethanol, bio-fertilizers, and infrastructure logistics across Vidarbha region.'
  },
  {
    id: 'rel-sarang-gadkari',
    politicianId: 'nitin-gadkari',
    name: 'Sarang Gadkari',
    relationType: 'son',
    designationOrOccupation: 'Managing Director, Ketaki Agro & Infrastructure',
    businessInterests: ['Ketaki Agro Products', 'Cold Storage Logistics', 'Highway Service Amenities']
  },

  // Akhilesh Yadav
  {
    id: 'rel-dharmendra-yadav',
    politicianId: 'akhilesh-yadav',
    name: 'Dharmendra Yadav',
    relationType: 'cousin',
    designationOrOccupation: 'Member of Parliament (Azamgarh); Former MP Badaun',
    businessInterests: ['Etawah Cold Storage & Agro Consortium', 'Dairy Processing Infrastructure']
  },
  {
    id: 'rel-dimple-yadav',
    politicianId: 'akhilesh-yadav',
    name: 'Dimple Yadav',
    relationType: 'spouse',
    designationOrOccupation: 'Member of Parliament (Mainpuri)',
    businessInterests: ['Commercial Leasing & Real Estate']
  },
  {
    id: 'rel-prateek-yadav',
    politicianId: 'akhilesh-yadav',
    name: 'Prateek Yadav',
    relationType: 'brother',
    designationOrOccupation: 'Managing Director, Iron Core Fitness & Real Estate Developer',
    businessInterests: ['Custom Real Estate Developments Lucknow', 'Luxury Fitness Franchises']
  },

  // Jyotiraditya Scindia
  {
    id: 'rel-mahanaryaman-scindia',
    politicianId: 'jyotiraditya-scindia',
    name: 'Mahanaryaman Scindia',
    relationType: 'son',
    designationOrOccupation: 'Founder, MyMandi & Gwalior Heritage Ventures',
    businessInterests: ['MyMandi Agri-tech B2B Platform', 'Gwalior Heritage Palace Tourism', 'MPCA Cricket Board'],
    notes: 'Co-founder of tech platform aggregating fresh produce logistics.'
  },

  // Supriya Sule
  {
    id: 'rel-sadanand-sule',
    politicianId: 'supriya-sule',
    name: 'Sadanand Sule',
    relationType: 'spouse',
    designationOrOccupation: 'Investor & Technology Entrepreneur',
    businessInterests: ['Telecommunications Consulting', 'Clean Energy Micro-grids', 'Logistics Warehousing']
  },
  {
    id: 'rel-ajit-pawar',
    politicianId: 'supriya-sule',
    name: 'Ajit Pawar',
    relationType: 'cousin',
    designationOrOccupation: 'Deputy Chief Minister & Finance Minister of Maharashtra',
    businessInterests: ['Baramati Cooperative Sugar Mill Consortium', 'Irrigation Infrastructure Projects']
  },

  // Abhishek Banerjee
  {
    id: 'rel-rujira-banerjee',
    politicianId: 'abhishek-banerjee',
    name: 'Rujira Banerjee',
    relationType: 'spouse',
    designationOrOccupation: 'Designated Partner, Leaps and Bounds Private Limited',
    businessInterests: ['Leaps and Bounds Infrastructure & Consultancy Pvt Ltd', 'Financial Advisory Services']
  },
  {
    id: 'rel-amit-banerjee',
    politicianId: 'abhishek-banerjee',
    name: 'Amit Banerjee',
    relationType: 'father',
    designationOrOccupation: 'Director, Real Estate & Agro Logistics Companies',
    businessInterests: ['Kolkata Urban Logistics & Civil Works']
  },

  // Kanimozhi Karunanidhi
  {
    id: 'rel-mk-stalin',
    politicianId: 'kanimozhi-karunanidhi',
    name: 'M. K. Stalin',
    relationType: 'brother',
    designationOrOccupation: 'Chief Minister of Tamil Nadu; President DMK',
    businessInterests: ['Murasoli Trust', 'Public Administration']
  },
  {
    id: 'rel-udhayanidhi-stalin',
    politicianId: 'kanimozhi-karunanidhi',
    name: 'Udhayanidhi Stalin',
    relationType: 'nephew',
    designationOrOccupation: 'Deputy Chief Minister of Tamil Nadu & Youth Welfare Minister',
    businessInterests: ['Red Giant Movies Media Distribution & Real Estate']
  },

  // Chirag Paswan
  {
    id: 'rel-prince-raj',
    politicianId: 'chirag-paswan',
    name: 'Prince Raj',
    relationType: 'cousin',
    designationOrOccupation: 'Former Member of Parliament (Samastipur)',
    businessInterests: ['Bihar Cold Chain & Warehouse Grid']
  },

  // Dharmendra Pradhan
  {
    id: 'dp-rel-soumya',
    politicianId: 'dharmendra-pradhan',
    name: 'Soumendra Pradhan',
    relationType: 'brother',
    designationOrOccupation: 'Managing Partner, Pradhan Gas Agencies & Transport Logistics',
    businessInterests: ['LPG Distribution Networks', 'Angul Mining Logistics Logistics']
  }
];

// ============================================================================
// 3. REGISTERED CONTRACTORS & CORPORATE ENTITIES
// ============================================================================

export const CONTRACTORS_DATA: Contractor[] = [
  {
    id: 'cont-kusum-finserve',
    name: 'Kusum Finserve LLP',
    registrationNo: 'LLPIN: AAD-1290 / MCA-GJ',
    linkedRelativeId: 'rel-jay-shah',
    entityType: 'LLP',
    state: 'Gujarat',
    directors: ['Jay Shah', 'Jitendra Shah']
  },
  {
    id: 'cont-skylight-hosp',
    name: 'Skylight Hospitality Private Limited',
    registrationNo: 'CIN: U55101DL2007PTC170132',
    linkedRelativeId: 'rel-robert-vadra',
    entityType: 'Private Limited',
    state: 'Delhi / Haryana',
    directors: ['Robert Vadra', 'Mahesh Nagar']
  },
  {
    id: 'cont-manas-agro',
    name: 'Manas Agro Industries and Infrastructure Ltd',
    registrationNo: 'CIN: U01111MH2012PLC238210',
    linkedRelativeId: 'rel-nikhil-gadkari',
    entityType: 'Public Limited',
    state: 'Maharashtra',
    directors: ['Nikhil Nitin Gadkari', 'Samir Gadkari']
  },
  {
    id: 'cont-leaps-bounds',
    name: 'Leaps and Bounds Infrastructure Pvt Ltd',
    registrationNo: 'CIN: U70109WB2012PTC180324',
    linkedRelativeId: 'rel-rujira-banerjee',
    entityType: 'Private Limited',
    state: 'West Bengal',
    directors: ['Rujira Banerjee', 'Sujay Krishna Bhadra']
  },
  {
    id: 'cont-red-giant-infra',
    name: 'Red Giant Creative & Civil Infrastructure LLP',
    registrationNo: 'LLPIN: AAF-8821 / MCA-TN',
    linkedRelativeId: 'rel-udhayanidhi-stalin',
    entityType: 'LLP',
    state: 'Tamil Nadu',
    directors: ['Udhayanidhi Stalin', 'Kiruthiga Udhayanidhi']
  },
  {
    id: 'cont-mymandi-tech',
    name: 'MyMandi Agri Logistics & Supply Chain Pvt Ltd',
    registrationNo: 'CIN: U72900MP2022PTC060192',
    linkedRelativeId: 'rel-mahanaryaman-scindia',
    entityType: 'Private Limited',
    state: 'Madhya Pradesh',
    directors: ['Mahanaryaman Scindia', 'Suryansh Rana']
  },
  {
    id: 'cont-iron-core-infra',
    name: 'Iron Core Infra & Urban Developers Pvt Ltd',
    registrationNo: 'CIN: U45200UP2013PTC057812',
    linkedRelativeId: 'rel-prateek-yadav',
    entityType: 'Private Limited',
    state: 'Uttar Pradesh',
    directors: ['Prateek Yadav', 'Aparna Yadav']
  },
  {
    id: 'cont-pradhan-transport',
    name: 'Pradhan Logistics & Transport Fleet Corp',
    registrationNo: 'REG/OD/ANG/2015-8941',
    linkedRelativeId: 'dp-rel-soumya',
    entityType: 'Partnership',
    state: 'Odisha',
    directors: ['Soumendra Pradhan']
  },
  {
    id: 'cont-nhai-larsen',
    name: 'Larsen & Toubro Infrastructure Construction Ltd',
    registrationNo: 'CIN: L99999MH1946PLC004768',
    entityType: 'Public Limited',
    state: 'Maharashtra',
    directors: ['S. N. Subrahmanyan']
  },
  {
    id: 'cont-nhai-afcons',
    name: 'Afcons Infrastructure Engineering Ltd',
    registrationNo: 'CIN: U45200MH1976PLC019335',
    entityType: 'Public Limited',
    state: 'Maharashtra',
    directors: ['K. Subrahmanian']
  }
];

// ============================================================================
// 4. GOVERNMENT CONTRACTS & TENDER AWARDS
// ============================================================================

export const GOVT_CONTRACTS_DATA: GovtContract[] = [
  // Manas Agro (Linked to Nitin Gadkari's relative while Minister of MoRTH / Heavy Ind / MSME)
  {
    id: 'gc-manas-1',
    contractorId: 'cont-manas-agro',
    awardingDepartment: 'Ministry of Petroleum & Natural Gas / OMCs (Ethanol Blending Programme)',
    contractValue: 148.5,
    awardedDate: '2021-09-15',
    tenderType: 'limited',
    projectDescription: 'Supply of 35 million litres of Denatured Anhydrous Ethanol for 20% blending mandate across Western India OMC Depots (IOCL/BPCL/HPCL)',
    sourceDocumentUrl: 'https://eprocure.gov.in/mopng/tender/2021_OMC_64219_1',
    status: 'Executed'
  },
  {
    id: 'gc-manas-2',
    contractorId: 'cont-manas-agro',
    awardingDepartment: 'National Highways Authority of India (NHAI) - Special Vehicle Corridor',
    contractValue: 42.0,
    awardedDate: '2019-11-20',
    tenderType: 'nominated',
    projectDescription: 'Installation of Bio-CNG dispensing stations & Green Fuel Rest Areas along Nagpur-Mumbai Samruddhi Expressway Interchange',
    sourceDocumentUrl: 'https://nhai.gov.in/tenders/highway-amenities/2019/MH-W-042',
    status: 'Completed'
  },

  // Kusum Finserve (Linked to Amit Shah's relative)
  {
    id: 'gc-kusum-1',
    contractorId: 'cont-kusum-finserve',
    awardingDepartment: 'Gujarat State Warehousing Corporation & Central Cooperative Bank',
    contractValue: 24.8,
    awardedDate: '2017-06-12',
    tenderType: 'limited',
    projectDescription: 'Warehousing receipt financing and computerized grain storage management at Kheda & Sanand hubs',
    sourceDocumentUrl: 'https://gswc.gujarat.gov.in/tenders/archive/2017/GSWC-KUSUM-09',
    status: 'Completed'
  },
  {
    id: 'gc-kusum-2',
    contractorId: 'cont-kusum-finserve',
    awardingDepartment: 'Ministry of Cooperation / National Cooperative Development Corporation (NCDC)',
    contractValue: 68.0,
    awardedDate: '2022-03-10',
    tenderType: 'nominated',
    projectDescription: 'Consultancy & Enterprise ERP Implementation Partner for Western Region Primary Agricultural Credit Societies (PACS) modern warehousing pilot',
    sourceDocumentUrl: 'https://cooperation.gov.in/tenders/2022/PACS-ERP-WR-03',
    status: 'Under Audit'
  },

  // Skylight Hospitality (Linked to Rahul Gandhi's relative Robert Vadra)
  {
    id: 'gc-skylight-1',
    contractorId: 'cont-skylight-hosp',
    awardingDepartment: 'Haryana Town & Country Planning Department (HUDA/DTCP)',
    contractValue: 58.0,
    awardedDate: '2008-03-28',
    tenderType: 'nominated',
    projectDescription: 'Commercial colony development license conversion for 3.53 acres in Sector 83 Shikohpur, Gurugram (sold subsequently to DLF Ltd)',
    sourceDocumentUrl: 'https://cag.gov.in/en/audit-report/details/haryana-civil-audit-2013-dTCP-skylight',
    status: 'Under Audit'
  },

  // Leaps and Bounds (Linked to Abhishek Banerjee's relative)
  {
    id: 'gc-leaps-1',
    contractorId: 'cont-leaps-bounds',
    awardingDepartment: 'West Bengal Urban Development & Municipal Affairs Department',
    contractValue: 34.2,
    awardedDate: '2018-08-14',
    tenderType: 'limited',
    projectDescription: 'Civic facility drainage & street lighting maintenance contract for Diamond Harbour Parliamentary zone & South 24 Parganas municipalities',
    sourceDocumentUrl: 'https://wbtenders.gov.in/nicgep/app?component=view&page=TenderDetails&id=2018_UDMA_1892',
    status: 'Completed'
  },
  {
    id: 'gc-leaps-2',
    contractorId: 'cont-leaps-bounds',
    awardingDepartment: 'West Bengal Primary Education Board & School Infrastructure Wing',
    contractValue: 26.5,
    awardedDate: '2019-12-05',
    tenderType: 'nominated',
    projectDescription: 'Supply of smart computer kiosks and digital school infrastructure in 140 schools across South 24 Parganas',
    sourceDocumentUrl: 'https://cag.gov.in/en/audit-report/details/west-bengal-education-audit-2021',
    status: 'Under Audit'
  },

  // Red Giant (Linked to DMK Leadership / Kanimozhi's relative)
  {
    id: 'gc-redgiant-1',
    contractorId: 'cont-red-giant-infra',
    awardingDepartment: 'Tamil Nadu Information & Public Relations Department (DIPR)',
    contractValue: 48.6,
    awardedDate: '2022-07-19',
    tenderType: 'limited',
    projectDescription: 'Sole broadcasting, media production & state pavilion LED dome exhibition setup for 44th FIDE Chess Olympiad, Chennai',
    sourceDocumentUrl: 'https://tntenders.gov.in/nicgep/app?page=FrontEndTenderDetails&id=2022_DIPR_7781',
    status: 'Executed'
  },

  // Iron Core Infra (Linked to Akhilesh Yadav's relative)
  {
    id: 'gc-ironcore-1',
    contractorId: 'cont-iron-core-infra',
    awardingDepartment: 'Uttar Pradesh State Bridge Corporation (UPSBC) & Lucknow Development Authority (LDA)',
    contractValue: 54.0,
    awardedDate: '2015-10-18',
    tenderType: 'limited',
    projectDescription: 'Sub-contractor civil works package for Gomti Riverfront development walkways and landscape lighting in Lucknow',
    sourceDocumentUrl: 'https://etender.up.nic.in/nicgep/app?page=TenderDetails&id=2015_LDA_99218',
    status: 'Under Audit'
  },

  // Pradhan Transport (Linked to Dharmendra Pradhan's brother)
  {
    id: 'gc-pradhan-1',
    contractorId: 'cont-pradhan-transport',
    awardingDepartment: 'Indian Oil Corporation Ltd (IOCL) - Paradip Refinery & Talcher Bottling Plant',
    contractValue: 38.4,
    awardedDate: '2016-04-22',
    tenderType: 'limited',
    projectDescription: 'Dedicated heavy LPG cylinder tanker logistics fleet for Angul, Dhenkanal and Sambalpur retail supply chains',
    sourceDocumentUrl: 'https://eprocure.gov.in/iocl/tender/2016_IOCL_55419_OD',
    status: 'Executed'
  },

  // MyMandi Tech (Linked to Jyotiraditya Scindia's relative)
  {
    id: 'gc-mymandi-1',
    contractorId: 'cont-mymandi-tech',
    awardingDepartment: 'Madhya Pradesh State Agricultural Marketing Board (Mandi Board)',
    contractValue: 18.2,
    awardedDate: '2023-01-25',
    tenderType: 'open',
    projectDescription: 'Digital marketplace terminal integration for perishable farm produce in Gwalior & Chambal division mandis',
    sourceDocumentUrl: 'https://mptenders.gov.in/nicgep/app?page=TenderDetails&id=2023_MPMANDI_4412',
    status: 'In Execution'
  },

  // Open Benchmark Tenders (Unrelated Big EPCs)
  {
    id: 'gc-larsen-1',
    contractorId: 'cont-nhai-larsen',
    awardingDepartment: 'National Highways Authority of India (NHAI)',
    contractValue: 2450.0,
    awardedDate: '2022-08-11',
    tenderType: 'open',
    projectDescription: 'Construction of 8-lane Access-Controlled Delhi-Mumbai Expressway Package 14 (EPC Mode)',
    sourceDocumentUrl: 'https://eprocure.gov.in/cppp/tender/2022_NHAI_88190',
    status: 'In Execution'
  }
];

// ============================================================================
// 5. POLITICIAN MINISTERIAL & PARLIAMENTARY TENURE TIMELINES
// ============================================================================

export const POLITICIAN_TENURES_DATA: Record<string, PoliticianTenure[]> = {
  'amit-shah': [
    {
      departmentOrMinistry: 'Ministry of Home Affairs',
      role: 'Union Minister for Home Affairs',
      startDate: '2019-05-30',
      jurisdictionKeywords: ['home', 'internal security', 'border', 'police', 'crpf', 'cbi', 'paramilitary']
    },
    {
      departmentOrMinistry: 'Ministry of Cooperation',
      role: 'Union Minister for Cooperation',
      startDate: '2021-07-07',
      jurisdictionKeywords: ['cooperation', 'pacs', 'cooperative', 'ncdc', 'nabard', 'sugar co-op', 'cooperative bank']
    },
    {
      departmentOrMinistry: 'Gujarat State Home & Police Department',
      role: 'Minister of State for Home (Gujarat)',
      startDate: '2002-12-22',
      endDate: '2010-07-24',
      jurisdictionKeywords: ['gujarat police', 'gswc', 'state home', 'ahmedabad cooperative']
    }
  ],
  'nitin-gadkari': [
    {
      departmentOrMinistry: 'Ministry of Road Transport and Highways (MoRTH)',
      role: 'Union Minister for Road Transport and Highways',
      startDate: '2014-05-26',
      jurisdictionKeywords: ['road transport', 'highways', 'nhai', 'expressway', 'morth', 'biofuel', 'ethanol mandate', 'green corridor']
    },
    {
      departmentOrMinistry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      role: 'Union Minister for MSME',
      startDate: '2019-05-30',
      endDate: '2021-07-07',
      jurisdictionKeywords: ['msme', 'agro industry', 'khadi', 'coir']
    },
    {
      departmentOrMinistry: 'Ministry of Shipping & Waterways',
      role: 'Union Minister for Shipping',
      startDate: '2014-05-26',
      endDate: '2019-05-24',
      jurisdictionKeywords: ['shipping', 'ports', 'inland waterways', 'sagarmala']
    }
  ],
  'rahul-gandhi': [
    {
      departmentOrMinistry: 'Parliamentary Committee on External Affairs',
      role: 'Standing Committee Member',
      startDate: '2019-09-13',
      jurisdictionKeywords: ['external affairs', 'foreign policy']
    },
    {
      departmentOrMinistry: 'Leader of Opposition (Lok Sabha)',
      role: 'Leader of the Opposition',
      startDate: '2024-06-09',
      jurisdictionKeywords: ['opposition', 'public accounts committee', 'lok sabha']
    }
  ],
  'akhilesh-yadav': [
    {
      departmentOrMinistry: 'Government of Uttar Pradesh (Chief Minister)',
      role: 'Chief Minister & Cabinet Head (UP)',
      startDate: '2012-03-15',
      endDate: '2017-03-19',
      jurisdictionKeywords: ['uttar pradesh', 'lucknow development authority', 'lda', 'gomti riverfront', 'upsbc', 'pwd uttar pradesh']
    }
  ],
  'jyotiraditya-scindia': [
    {
      departmentOrMinistry: 'Ministry of Civil Aviation',
      role: 'Union Minister for Civil Aviation',
      startDate: '2021-07-07',
      endDate: '2024-06-09',
      jurisdictionKeywords: ['civil aviation', 'aai', 'airports', 'udan', 'dgca']
    },
    {
      departmentOrMinistry: 'Ministry of Communications & Development of North Eastern Region (DoNER)',
      role: 'Union Minister',
      startDate: '2024-06-10',
      jurisdictionKeywords: ['telecom', 'communications', 'bsnl', 'postal', 'doner']
    }
  ],
  'dharmendra-pradhan': [
    {
      departmentOrMinistry: 'Ministry of Petroleum and Natural Gas',
      role: 'Union Minister for Petroleum & Natural Gas',
      startDate: '2014-05-26',
      endDate: '2021-07-07',
      jurisdictionKeywords: ['petroleum', 'natural gas', 'iocl', 'bpcl', 'hpcl', 'ongc', 'lpg', 'refinery']
    },
    {
      departmentOrMinistry: 'Ministry of Education & Skill Development',
      role: 'Union Minister for Education',
      startDate: '2021-07-07',
      jurisdictionKeywords: ['education', 'skill development', 'ugc', 'cbse', 'aiims']
    }
  ],
  'abhishek-banerjee': [
    {
      departmentOrMinistry: 'All India Trinamool Congress Leadership / Parliamentary Standing Committee',
      role: 'National General Secretary & MP (Diamond Harbour)',
      startDate: '2014-05-16',
      jurisdictionKeywords: ['west bengal', 'south 24 parganas', 'diamond harbour', 'municipal', 'education board']
    }
  ],
  'kanimozhi-karunanidhi': [
    {
      departmentOrMinistry: 'Parliamentary Standing Committee on Rural Development & Panchayati Raj',
      role: 'Chairperson / Standing Committee Member',
      startDate: '2019-09-13',
      jurisdictionKeywords: ['tamil nadu', 'rural development', 'panchayat', 'broadcasting']
    }
  ],
  'chirag-paswan': [
    {
      departmentOrMinistry: 'Ministry of Food Processing Industries',
      role: 'Union Minister for Food Processing Industries',
      startDate: '2024-06-10',
      jurisdictionKeywords: ['food processing', 'cold chain', 'agro clusters', 'mega food parks']
    }
  ],
  'jp-nadda': [
    {
      departmentOrMinistry: 'Ministry of Health and Family Welfare',
      role: 'Union Minister of Health & Family Welfare',
      startDate: '2014-11-09',
      endDate: '2019-05-24',
      jurisdictionKeywords: ['health', 'family welfare', 'aiims', 'ayushman', 'pharmaceuticals']
    },
    {
      departmentOrMinistry: 'Ministry of Health and Chemicals & Fertilizers',
      role: 'Union Minister of Health & Chemicals',
      startDate: '2024-06-10',
      jurisdictionKeywords: ['health', 'chemicals', 'fertilizers', 'pharma', 'jan aushadhi']
    }
  ]
};
