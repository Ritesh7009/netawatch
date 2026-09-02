import { Politician } from '../types';
import { ALL_543_LOK_SABHA_CONSTITUENCIES } from './all543Constituencies';
import { synthesizeMPPolitician } from '../utils/synthesizePolitician';

export const POLITICIANS_DATA: Politician[] = [
  {
    id: 'amit-shah',
    name: 'Amit Shah',
    hindiName: 'अमित शाह',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Amit_Shah_in_2024.jpg/480px-Amit_Shah_in_2024.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Union Minister for Home Affairs & Cooperation',
    state: 'Gujarat',
    constituency: 'Gandhinagar',
    house: 'Lok Sabha',
    age: 60,
    dateOfBirth: '22 October 1964',
    birthPlace: 'Mumbai, Maharashtra',
    education: 'B.Sc. in Biochemistry, CU Shah Science College, Ahmedabad',
    profession: 'Politician, Former Stock Broker & Businessman',
    spouse: 'Sonal Shah',
    bio: 'Amit Anil Chandra Shah is an Indian politician currently serving as the 31st Minister of Home Affairs since 2019 and 1st Minister of Co-operation since 2021. He served as the President of the Bharatiya Janata Party (BJP) from 2014 to 2020 and is the Member of Parliament representing Gandhinagar since 2019.',
    keyStances: [
      'Abrogation of Article 370 & 35A in Jammu & Kashmir',
      'Modernization of Indian criminal justice system (Bharatiya Nyaya Sanhita)',
      'Digital empowerment of primary agricultural credit societies (PACS)',
      'Border security infrastructure and Zero Tolerance to Terrorism',
      'Implementation of the Citizenship Amendment Act (CAA)'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/AmitShah',
      facebook: 'https://facebook.com/AmitShahOnline',
      instagram: 'https://instagram.com/amitshahofficial',
      wikipedia: 'https://en.wikipedia.org/wiki/Amit_Shah'
    },
    parliamentaryRecord: {
      attendancePercent: 92,
      nationalAvgAttendance: 79,
      debatesCount: 84,
      questionsAsked: 0, // Ministers generally don't ask questions as per parliamentary convention
      privateMemberBills: 0,
      committeeMemberships: [
        'Cabinet Committee on Security (CCS)',
        'Cabinet Committee on Political Affairs',
        'Parliamentary Standing Committee on Home Affairs'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.1,
      utilizationPercent: 96.4,
      completedProjects: 148,
      ongoingProjects: 14,
      topProjects: [
        { title: 'Smart Anganwadi Infrastructure Upgradation (45 Units)', costCr: 3.8, sector: 'Education', status: 'Completed', location: 'Gandhinagar Rural' },
        { title: 'Gandhinagar District Multi-Specialty Dialysis Wing', costCr: 4.2, sector: 'Healthcare', status: 'Completed', location: 'Gandhinagar Civil Hospital' },
        { title: 'Solar LED Street Lighting Grid & Green Corridors', costCr: 2.9, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Kalol & Sanand' },
        { title: 'Automated Solid Waste Management & Recycling Station', costCr: 3.5, sector: 'Water & Sanitation', status: 'In Progress', location: 'Ghatlodia' }
      ]
    },
    assets: {
      movableCr: 20.4,
      immovableCr: 16.3,
      totalCr: 36.7,
      liabilitiesCr: 1.2,
      declarationYear: 2024,
      history: [
        { year: 2009, totalCr: 8.8, movableCr: 3.1, immovableCr: 5.7, source: 'Gujarat Assembly Affidavit' },
        { year: 2014, totalCr: 14.2, movableCr: 6.2, immovableCr: 8.0, source: 'Rajya Sabha Election Affidavit' },
        { year: 2019, totalCr: 30.5, movableCr: 15.4, immovableCr: 15.1, source: 'Lok Sabha Election Affidavit' },
        { year: 2024, totalCr: 36.7, movableCr: 20.4, immovableCr: 16.3, source: 'Lok Sabha Election Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'as-case-1',
          caseNumber: 'Special CBI Case No. 01/2012',
          court: 'Special CBI Court, Mumbai',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 302', 'IPC 120B', 'IPC 364'],
          bnsEquivalent: 'BNS Section 103, BNS Section 61, BNS Section 140',
          description: 'Special CBI Court trial regarding 2005-2006 Gujarat police encounters. In December 2014, the Special CBI Court discharged Amit Shah holding that allegations were politically framed and devoid of evidentiary basis. Discharge was upheld by the Bombay High Court.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Other Offences',
          yearFiled: 2010,
          yearResolved: 2014,
          isSerious: true,
          summaryTag: '2014 Special CBI Court Full Discharge Verdict',
          tags: ['Discharged / Quashed', 'Previous', 'Landmark Verdict', 'Special CBI Court']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Passage of Three New Criminal Laws', year: '2023', category: 'Judicial Reform', description: 'Replaced colonial IPC, CrPC, and Indian Evidence Act with Bharatiya Nyaya Sanhita, BNSS, and BSA.', impact: 'Digitized court summons, mandated forensic investigation for major crimes, fixed zero FIR norms.' },
      { title: 'Revocation of Article 370', year: '2019', category: 'Constitutional', description: 'Led the constitutional reorganization of Jammu & Kashmir into two Union Territories.', impact: 'Unified national constitutional jurisdiction, opened private industrial investment and tourism.' },
      { title: 'Vibrant Villages Programme', year: '2022', category: 'Border Security', description: 'Comprehensive development of 2,967 border villages on the northern international border.', impact: 'Stemmed out-migration and established satellite connectivity and micro-hydel power.' }
    ],
    politicalTimeline: [
      { year: '1989', role: 'BJP Gujarat State Secretary', achievement: 'Organized LK Advani’s Ram Rath Yatra in Gujarat.' },
      { year: '1997-2012', role: 'MLA Sarkhej & Naranpura', achievement: 'Won five consecutive terms in Gujarat Legislative Assembly.' },
      { year: '2014-2020', role: 'National President, BJP', achievement: 'Led BJP to historic majority victories in 2014 and 2019 general elections.' },
      { year: '2019-Present', role: 'Union Minister for Home Affairs', achievement: 'Guided major internal security and national legislative reforms.' }
    ],
    news: [
      { id: 'as-1', title: 'Home Minister reviews security preparedness for border regions', source: 'Press Information Bureau', date: '18 Feb 2025', sentiment: 'positive', summary: 'Chaired a high-level apex committee review on cyber threats and border infrastructure surveillance.' },
      { id: 'as-2', title: 'Cooperative sector digitization crosses 60,000 primary PACS', source: 'The Economic Times', date: '04 Jan 2025', sentiment: 'positive', summary: 'Announced full cloud enterprise software integration for rural cooperative credit societies.' }
    ],
    tags: ['Union Minister', 'Home Affairs', 'Cooperation', 'Lok Sabha', 'Gujarat', 'BJP High Command'],
    verifiedAffidavit: true
  },
  {
    id: 'rahul-gandhi',
    name: 'Rahul Gandhi',
    hindiName: 'राहुल गांधी',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rahul_Gandhi_in_2023.jpg/480px-Rahul_Gandhi_in_2023.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'Indian National Congress',
    partyAbbr: 'INC',
    partyColor: '#0ea5e9',
    alliance: 'INDIA',
    currentRole: 'Leader of the Opposition in Lok Sabha',
    state: 'Uttar Pradesh',
    constituency: 'Rae Bareli (also won Wayanad, Kerala in 2024)',
    house: 'Lok Sabha',
    age: 54,
    dateOfBirth: '19 June 1970',
    birthPlace: 'New Delhi',
    education: 'M.Phil. in Development Studies, Trinity College, Cambridge University',
    profession: 'Politician, Social Worker & Strategist',
    spouse: 'Unmarried',
    bio: 'Rahul Gandhi is an Indian politician who serves as the Leader of the Opposition in the 18th Lok Sabha since June 2024. A fifth-term Member of Parliament representing Rae Bareli, he previously served as President of the Indian National Congress from 2017 to 2019 and spearheaded national campaigns including the Bharat Jodo Yatra.',
    keyStances: [
      'National Socio-Economic & Caste Census (X-Ray of India)',
      'Legal guarantee for Minimum Support Price (MSP) as per Swaminathan formula',
      'Constitutional protection of federalism and institutional autonomy',
      'Apprenticeship Right Act guaranteeing 1-year paid training for graduates',
      'Removal of 50% reservation cap through constitutional amendment'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/RahulGandhi',
      facebook: 'https://facebook.com/rahulgandhi',
      instagram: 'https://instagram.com/rahulgandhi',
      wikipedia: 'https://en.wikipedia.org/wiki/Rahul_Gandhi'
    },
    parliamentaryRecord: {
      attendancePercent: 58,
      nationalAvgAttendance: 79,
      debatesCount: 38,
      questionsAsked: 99,
      privateMemberBills: 0,
      committeeMemberships: [
        'Standing Committee on External Affairs',
        'Consultative Committee on Defence',
        'General Purposes Committee (Lok Sabha)'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 21.8,
      utilizationPercent: 87.2,
      completedProjects: 112,
      ongoingProjects: 22,
      topProjects: [
        { title: 'Community Water Purification & Reverse Osmosis Plants', costCr: 3.4, sector: 'Water & Sanitation', status: 'Completed', location: 'Mananthavady & Kalpetta' },
        { title: 'High-School Digital Smart Classrooms & Computer Labs', costCr: 4.1, sector: 'Education', status: 'Completed', location: 'Sultan Bathery & Rae Bareli' },
        { title: 'Tribal Healthcare Mobile Ambulance Clinics', costCr: 2.8, sector: 'Healthcare', status: 'Completed', location: 'Wayanad Hill Tracts' },
        { title: 'Flood Mitigation Culverts and Rural Arterial Roads', costCr: 3.9, sector: 'Roads & Infrastructure', status: 'In Progress', location: 'Nilambur & Salon' }
      ]
    },
    assets: {
      movableCr: 9.24,
      immovableCr: 11.15,
      totalCr: 20.39,
      liabilitiesCr: 0.5,
      declarationYear: 2024,
      history: [
        { year: 2009, totalCr: 2.3, movableCr: 0.9, immovableCr: 1.4, source: 'Lok Sabha Election Affidavit' },
        { year: 2014, totalCr: 9.4, movableCr: 2.8, immovableCr: 6.6, source: 'Lok Sabha Election Affidavit' },
        { year: 2019, totalCr: 15.8, movableCr: 5.8, immovableCr: 10.0, source: 'Lok Sabha Election Affidavit' },
        { year: 2024, totalCr: 20.39, movableCr: 9.24, immovableCr: 11.15, source: 'Lok Sabha Election Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 8,
      seriousCases: 1,
      chargesFramed: 2,
      convicted: false, // Surat conviction stayed by Supreme Court in 2023
      details: [
        {
          id: 'rg-case-1',
          caseNumber: 'CC No. 1871/2019',
          court: 'Chief Judicial Magistrate, Surat (Stayed by Supreme Court)',
          courtLevel: 'Supreme Court',
          ipcSections: ['IPC 499', 'IPC 500'],
          bnsEquivalent: 'BNS Section 356 (Defamation)',
          description: 'Criminal defamation complaint regarding campaign remarks made during an election rally in Kolar in April 2019. Trial court conviction stayed by Supreme Court in August 2023.',
          status: 'Stayed by Supreme Court',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2019,
          isSerious: false,
          summaryTag: 'Kolar Speech Defamation (Surat Trial)',
          tags: ['Defamation', 'Current', 'Stayed by Supreme Court', 'Political Speech', 'Non-Serious']
        },
        {
          id: 'rg-case-2',
          caseNumber: 'CC No. 342/2016',
          court: 'Special MP/MLA Court, Patna',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 500'],
          bnsEquivalent: 'BNS Section 356 (Defamation)',
          description: 'Private criminal defamation complaint filed by a political leader over public statements delivered during parliamentary campaign debates.',
          status: 'Cognizance Taken',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2016,
          isSerious: false,
          summaryTag: 'Patna Speech Defamation Complaint',
          tags: ['Defamation', 'Current', 'Cognizance Taken', 'Non-Serious']
        },
        {
          id: 'rg-case-3',
          caseNumber: 'National Herald Private Complaint',
          court: 'Special CBI / Rouse Avenue Court, New Delhi',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 403', 'IPC 406', 'IPC 420', 'IPC 120B'],
          bnsEquivalent: 'BNS Section 318 (Cheating), BNS Section 61 (Conspiracy)',
          description: 'Private complaint filed in 2012 regarding restructuring of Associated Journals Ltd and equity allocation to Young Indian. Matter pending trial before Special Court.',
          status: 'Under Investigation',
          temporalStatus: 'Current',
          caseType: 'Financial & Corporate',
          yearFiled: 2012,
          isSerious: true,
          summaryTag: 'Young Indian / AJL Equity Restructuring',
          tags: ['Financial / Corporate', 'Current', 'Under Trial', 'Serious Offence', 'Corporate Inquiry']
        },
        {
          id: 'rg-case-4',
          caseNumber: 'Bhiwandi Defamation Case (RSS Speech)',
          court: 'JMFC Court, Bhiwandi, Thane, Maharashtra',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 499', 'IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Defamation complaint filed in 2014 by a volunteer over historical political commentary delivered during a public rally at Sonale grounds in Thane.',
          status: 'Charges Framed',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2014,
          isSerious: false,
          summaryTag: 'Thane Bhiwandi Rally Speech',
          tags: ['Defamation', 'Current', 'Charges Framed', 'Non-Serious']
        },
        {
          id: 'rg-case-5',
          caseNumber: 'Guwahati Defamation Complaint',
          court: 'Chief Judicial Magistrate, Kamrup, Guwahati',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Criminal defamation complaint regarding political statements during the Bharat Jodo Nyay Yatra in Assam (High Court stay in effect).',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2024,
          isSerious: false,
          summaryTag: 'Assam Nyay Yatra Speech',
          tags: ['Defamation', 'Current', 'Stayed by High Court', 'Non-Serious']
        },
        {
          id: 'rg-case-6',
          caseNumber: 'Section 144 Demonstration FIR',
          court: 'Metropolitan Magistrate Court, New Delhi',
          courtLevel: 'District & Sessions Court',
          ipcSections: ['IPC 188', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 126',
          description: 'Protest assembly during national opposition agitation against price rise and unemployment outside Parliament building in August 2022.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2022,
          yearResolved: 2024,
          isSerious: false,
          summaryTag: '2022 Price Rise Opposition Protest',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Public Demonstration']
        },
        {
          id: 'rg-case-7',
          caseNumber: 'Criminal Case No. 42/2018 (Sultanpur MP/MLA Court)',
          court: 'Special MP/MLA Court, Sultanpur, Uttar Pradesh',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Defamation complaint filed by a local leader regarding political campaign remarks delivered during the 2018 Karnataka assembly campaign. Bail granted; proceedings ongoing before Special Court.',
          status: 'Charges Framed',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2018,
          isSerious: false,
          summaryTag: 'Sultanpur Special MP/MLA Court Defamation',
          tags: ['Defamation', 'Current', 'Charges Framed', 'Non-Serious']
        },
        {
          id: 'rg-case-8',
          caseNumber: 'Complaint Case No. 118/2018 (Ranchi Defamation)',
          court: 'Special Judicial Magistrate, Ranchi, Jharkhand',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 499', 'IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Private complaint regarding political speeches delivered at the Congress Plenary session in New Delhi in March 2018. Stay granted by Jharkhand High Court.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2018,
          isSerious: false,
          summaryTag: 'Ranchi Plenary Speech Defamation Complaint',
          tags: ['Defamation', 'Current', 'Stayed by High Court', 'Non-Serious']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Bharat Jodo Yatra & Nyay Yatra', year: '2022-2024', category: 'Mass Mobilization', description: 'Over 10,000 km national foot marches from Kanyakumari to Kashmir, and Manipur to Mumbai.', impact: 'Re-energized national opposition discourse around unemployment, price rise, and democratic rights.' },
      { title: 'Championing Right to Fair Compensation in Land Acquisition Act', year: '2013', category: 'Legislative', description: 'Instrumental in pushing LARR Act guaranteeing 4x market compensation for rural land acquisitions.', impact: 'Established mandatory social impact assessments and consent requirements for farm lands.' },
      { title: 'Leader of the Opposition Constitutional Role', year: '2024', category: 'Parliamentary', description: 'First formal Leader of the Opposition appointed in Lok Sabha after a decade gap.', impact: 'Participating in high-level appointment panels for Election Commissioners, CBI, and NHRC.' }
    ],
    politicalTimeline: [
      { year: '2004', role: 'Member of Parliament (Amethi)', achievement: 'Elected to 14th Lok Sabha with over 100,000 vote margin.' },
      { year: '2007-2013', role: 'General Secretary, Indian Youth Congress', achievement: 'Introduced transparent internal democratic elections in youth wing.' },
      { year: '2017-2019', role: 'President, Indian National Congress', achievement: 'Led Congress victories in Madhya Pradesh, Rajasthan, and Chhattisgarh Assembly elections.' },
      { year: '2024-Present', role: 'Leader of Opposition (Lok Sabha)', achievement: 'Secured high-profile victories in both Rae Bareli and Wayanad seats.' }
    ],
    news: [
      { id: 'rg-1', title: 'Leader of Opposition presses for caste census legislation in Parliament', source: 'The Hindu', date: '21 Feb 2025', sentiment: 'neutral', summary: 'Addressed the House emphasizing budget allocations for marginalized communities and youth employment.' },
      { id: 'rg-2', title: 'Gandhi interacts with gig workers and student delegations on platform rights', source: 'Indian Express', date: '11 Jan 2025', sentiment: 'positive', summary: 'Proposed social security architecture and wage floors for app-based logistics delivery workers.' }
    ],
    tags: ['Leader of Opposition', 'Lok Sabha', 'Congress', 'Rae Bareli', 'INDIA Bloc', 'Wayanad'],
    verifiedAffidavit: true
  },
  {
    id: 'jp-nadda',
    name: 'J. P. Nadda',
    hindiName: 'जे. पी. नड्डा',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/J_P_Nadda_official_portrait.jpg/480px-J_P_Nadda_official_portrait.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Union Minister for Health & Chemicals; BJP National President',
    state: 'Gujarat / Himachal Pradesh',
    constituency: 'Rajya Sabha MP (Gujarat)',
    house: 'Rajya Sabha',
    age: 64,
    dateOfBirth: '02 December 1960',
    birthPlace: 'Patna, Bihar',
    education: 'LL.B. from Himachal Pradesh University, Shimla; B.A. from Patna University',
    profession: 'Lawyer, Political Leader',
    spouse: 'Mallika Nadda',
    bio: 'Jagat Prakash Nadda is an Indian politician and lawyer serving as the Union Minister of Health and Family Welfare and Chemicals and Fertilizers since 2024. He has been the National President of the Bharatiya Janata Party since January 2020. He has represented Himachal Pradesh and Gujarat in the Rajya Sabha and previously held the Union Health portfolio from 2014 to 2019.',
    keyStances: [
      'Expansion of Ayushman Bharat Pradhan Mantri Jan Arogya Yojana to all citizens 70+',
      'Domestic self-reliance in Active Pharmaceutical Ingredients (APIs) and medical devices',
      'Organizational consolidation and cadre discipline across 150 million party members',
      'Creation of 75,000 new medical seats across government medical colleges',
      'Subsidized fertilizer availability and Nano Urea adoption across agriculture'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/JPNadda',
      facebook: 'https://facebook.com/JPNaddaBJP',
      instagram: 'https://instagram.com/jpnaddaofficial',
      wikipedia: 'https://en.wikipedia.org/wiki/J._P._Nadda'
    },
    parliamentaryRecord: {
      attendancePercent: 94,
      nationalAvgAttendance: 79,
      debatesCount: 62,
      questionsAsked: 0,
      privateMemberBills: 0,
      committeeMemberships: [
        'Leader of the House (Rajya Sabha)',
        'Business Advisory Committee (Rajya Sabha)',
        'Rules Committee'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.9,
      utilizationPercent: 95.6,
      completedProjects: 98,
      ongoingProjects: 12,
      topProjects: [
        { title: 'AIIMS Bilaspur Specialty Diagnostic and Trauma Facility', costCr: 5.0, sector: 'Healthcare', status: 'Completed', location: 'Bilaspur, Himachal Pradesh' },
        { title: 'Tribal Tele-Medicine & Cold Storage Vaccine Supply Chain', costCr: 3.7, sector: 'Healthcare', status: 'Completed', location: 'Lahaul & Spiti / Chamba' },
        { title: 'Vocational Skill Development & IT Hub', costCr: 3.2, sector: 'Education', status: 'Completed', location: 'Shimla & Ahmedabad' },
        { title: 'Community Drinking Water Gravity Flow Schemes', costCr: 2.6, sector: 'Water & Sanitation', status: 'In Progress', location: 'Kangra Valley' }
      ]
    },
    assets: {
      movableCr: 3.2,
      immovableCr: 6.16,
      totalCr: 9.36,
      liabilitiesCr: 0.38,
      declarationYear: 2024,
      history: [
        { year: 2012, totalCr: 2.5, movableCr: 0.9, immovableCr: 1.6, source: 'Rajya Sabha Affidavit' },
        { year: 2018, totalCr: 4.8, movableCr: 1.7, immovableCr: 3.1, source: 'Rajya Sabha Affidavit' },
        { year: 2024, totalCr: 9.36, movableCr: 3.2, immovableCr: 6.16, source: 'Rajya Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'jpn-case-1',
          caseNumber: 'Case No. 78/1993 (Historical Student Agitation)',
          court: 'Chief Judicial Magistrate Court, Shimla, Himachal Pradesh',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 188'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223',
          description: 'University campus student agitation and peaceful demonstration in Shimla demanding state university hostel infrastructure upgradation.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 1993,
          yearResolved: 1999,
          isSerious: false,
          summaryTag: 'Shimla University Student Rights Demonstration',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Student Movement']
        }
      ]
    },
    majorInitiatives: [
      { title: 'National Health Policy & AIIMS Expansion', year: '2017', category: 'Health Policy', description: 'Passed the National Health Policy 2017 aiming to increase public health expenditure to 2.5% of GDP and establishing 22 new AIIMS.', impact: 'Doubled postgraduate medical seats and established primary Ayushman Arogya Mandirs.' },
      { title: 'Production Linked Incentive (PLI) for Pharmaceuticals', year: '2024', category: 'Industrial Policy', description: 'Spearheaded domestic manufacturing incentives for bulk drugs and critical medical imaging hardware.', impact: 'Reduced critical import dependence on active drug ingredients.' }
    ],
    politicalTimeline: [
      { year: '1993', role: 'Leader of Opposition, HP Assembly', achievement: 'Elected MLA from Bilaspur and served as key opposition voice.' },
      { year: '1998-2003', role: 'Cabinet Minister, Himachal Pradesh', achievement: 'Handled Health, Family Welfare, and Parliamentary Affairs portfolios.' },
      { year: '2014-2019', role: 'Union Minister of Health', achievement: 'Rolled out Mission Indradhanush vaccination drive reaching 35+ million children.' },
      { year: '2020-Present', role: 'BJP National President & Union Minister', achievement: 'Managed organizational electoral apparatus across multiple state elections.' }
    ],
    news: [
      { id: 'jpn-1', title: 'Union Health Minister launches nationwide digital generic medicine tracking portal', source: 'Times of India', date: '14 Feb 2025', sentiment: 'positive', summary: 'Inaugurated the unified drug barcode portal to combat substandard medicines and regulate Jan Aushadhi prices.' },
      { id: 'jpn-2', title: 'Nadda coordinates alliance coordination meeting for upcoming state polls', source: 'NDTV', date: '29 Jan 2025', sentiment: 'neutral', summary: 'Held strategic discussions with NDA partners regarding welfare manifesto delivery.' }
    ],
    tags: ['Union Minister', 'Health', 'Chemicals & Fertilizers', 'Rajya Sabha', 'BJP President', 'Himachal Pradesh'],
    verifiedAffidavit: true
  },
  {
    id: 'sharad-pawar',
    name: 'Sharad Pawar',
    hindiName: 'शरद पवार',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sharad_Pawar_2018.jpg/480px-Sharad_Pawar_2018.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=1200&q=80',
    party: 'Nationalist Congress Party (Sharadchandra Pawar)',
    partyAbbr: 'NCPSP',
    partyColor: '#10b981',
    alliance: 'INDIA',
    currentRole: 'Rajya Sabha MP & National President, NCP(SP)',
    state: 'Maharashtra',
    constituency: 'Rajya Sabha (Maharashtra)',
    house: 'Rajya Sabha',
    age: 84,
    dateOfBirth: '12 December 1940',
    birthPlace: 'Baramati, Pune, Maharashtra',
    education: 'B.Com, Brihan Maharashtra College of Commerce (BMCC), Pune University',
    profession: 'Agriculturist, Politician & Cooperative Leader',
    spouse: 'Pratibha Pawar',
    bio: 'Sharad Govindrao Pawar is one of India’s most veteran statesmen with a political career spanning over six decades. He has served four terms as Chief Minister of Maharashtra, Union Minister of Defence, and Union Minister of Agriculture & Food Processing. He founded the Nationalist Congress Party in 1999 and was a chief architect of Maharashtra’s Maha Vikas Aghadi coalition.',
    keyStances: [
      'Agricultural loan restructuring, crop insurance reform, and water harvesting schemes',
      'Autonomy for cooperative sugar, dairy, and rural credit banking federations',
      'Protection of Maharashtra’s regional industrial development and Marathi linguistic identity',
      'Women’s 33% reservation in defense forces and local self-government bodies (first introduced in Maharashtra 1994)',
      'Opposition unity and coalition governance'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/PawarSpeaks',
      facebook: 'https://facebook.com/PawarSpeaks',
      instagram: 'https://instagram.com/pawarspeaks',
      wikipedia: 'https://en.wikipedia.org/wiki/Sharad_Pawar'
    },
    parliamentaryRecord: {
      attendancePercent: 71,
      nationalAvgAttendance: 79,
      debatesCount: 29,
      questionsAsked: 14,
      privateMemberBills: 0,
      committeeMemberships: [
        'Standing Committee on Defence',
        'Consultative Committee for the Ministry of Agriculture',
        'General Purposes Committee'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 22.4,
      utilizationPercent: 89.6,
      completedProjects: 130,
      ongoingProjects: 18,
      topProjects: [
        { title: 'Baramati Krishi Vigyan Kendra Agro-Tech Demonstration Park', costCr: 4.5, sector: 'Rural Development', status: 'Completed', location: 'Baramati, Pune' },
        { title: 'Vidarbha Drought Relief Check Dams and Micro-Drip Irrigation', costCr: 3.8, sector: 'Water & Sanitation', status: 'Completed', location: 'Yavatmal & Amravati' },
        { title: 'Tribal Girl Hostel & Polytechnic Science Laboratories', costCr: 3.2, sector: 'Education', status: 'Completed', location: 'Nandurbar' },
        { title: 'District Rural Primary Healthcare Center Digitization', costCr: 2.7, sector: 'Healthcare', status: 'In Progress', location: 'Satara & Kolhapur' }
      ]
    },
    assets: {
      movableCr: 25.2,
      immovableCr: 7.5,
      totalCr: 32.7,
      liabilitiesCr: 1.0,
      declarationYear: 2020,
      history: [
        { year: 2004, totalCr: 6.2, movableCr: 3.1, immovableCr: 3.1, source: 'Lok Sabha Affidavit' },
        { year: 2009, totalCr: 12.5, movableCr: 7.2, immovableCr: 5.3, source: 'Lok Sabha Affidavit' },
        { year: 2014, totalCr: 20.4, movableCr: 14.8, immovableCr: 5.6, source: 'Rajya Sabha Affidavit' },
        { year: 2020, totalCr: 32.7, movableCr: 25.2, immovableCr: 7.5, source: 'Rajya Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'sp-case-1',
          caseNumber: 'ECIR/MBZO-I/09/2019 (MSCB Preliminary Inquiry)',
          court: 'Special PMLA Court / Bombay High Court, Mumbai',
          courtLevel: 'High Court',
          ipcSections: ['Prevention of Money Laundering Act Inquiry Reference'],
          description: 'Inquiry reference regarding Maharashtra State Cooperative Bank (MSCB) loan disbursals. In October 2020, Mumbai Police Economic Offences Wing (EOW) filed a C-Summary closure report finding zero criminal culpability.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Financial & Corporate',
          yearFiled: 2019,
          yearResolved: 2020,
          isSerious: false,
          summaryTag: 'MSCB Cooperative Bank EOW Closure Report',
          tags: ['Financial & Corporate', 'Previous', 'Discharged / Quashed', 'EOW Closure']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Historic ₹71,000 Crore National Farm Loan Waiver', year: '2008', category: 'Agriculture', description: 'As Union Agriculture Minister, designed and executed India’s largest nationwide debt waiver for small and marginal farmers.', impact: 'Benefited over 36 million farming families across 28 states.' },
      { title: 'Establishment of National Disaster Management Authority (NDMA)', year: '1993-2005', category: 'Disaster Management', description: 'Spearheaded disaster relief policy after the 1993 Latur earthquake, leading to modern disaster response frameworks.', impact: 'Created institutional SDRF/NDRF frameworks and disaster compensation codes.' },
      { title: 'Women’s Policy & Equal Coparcenary Property Rights', year: '1994', category: 'Social Reform', description: 'As Maharashtra Chief Minister, promulgated India’s first comprehensive State Policy for Women granting daughters equal share in ancestral property.', impact: 'Preceded the national Hindu Succession Amendment Act 2005 by over a decade.' }
    ],
    politicalTimeline: [
      { year: '1967', role: 'Elected MLA Baramati', achievement: 'Entered Maharashtra Legislative Assembly at age 27.' },
      { year: '1978', role: 'Chief Minister of Maharashtra (1st Term)', achievement: 'Became youngest Chief Minister of Maharashtra at age 38 heading Progressive Democratic Front.' },
      { year: '1991-1993', role: 'Union Minister of Defence', achievement: 'Modernized naval dockyards and military production units.' },
      { year: '2004-2014', role: 'Union Minister of Agriculture & Food Processing', achievement: 'Turned India into a net exporter of food grains, sugar, and cotton.' }
    ],
    news: [
      { id: 'sp-1', title: 'Sharad Pawar visits drought-affected Marathwada farmers to assess canal water discharge', source: 'Maharashtra Times', date: '08 Feb 2025', sentiment: 'neutral', summary: 'Urged state government to announce immediate compensation package for soybean and cotton cultivators.' },
      { id: 'sp-2', title: 'NCP(SP) convenes state executive meeting on cooperative sugar mill ethanol pricing', source: 'Lokmat', date: '22 Jan 2025', sentiment: 'positive', summary: 'Advocated for remunerative ethanol blending procurement rates for cooperative sugar factories.' }
    ],
    tags: ['Rajya Sabha', 'Maharashtra', 'NCP', 'Agriculture Leader', 'Former Chief Minister', 'Maha Vikas Aghadi'],
    verifiedAffidavit: true
  },
  {
    id: 'devendra-fadnavis',
    name: 'Devendra Fadnavis',
    hindiName: 'देवेंद्र फडणवीस',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Devendra_Fadnavis_official_portrait.jpg/480px-Devendra_Fadnavis_official_portrait.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Chief Minister of Maharashtra',
    state: 'Maharashtra',
    constituency: 'Nagpur South West',
    house: 'State Legislative Assembly',
    age: 54,
    dateOfBirth: '22 July 1970',
    birthPlace: 'Nagpur, Maharashtra',
    education: 'LL.B., Law College Nagpur; Post Graduate Diploma in Business Management',
    profession: 'Lawyer, Politician',
    spouse: 'Amruta Fadnavis',
    bio: 'Devendra Gangadharrao Fadnavis is an Indian politician serving as the Chief Minister of Maharashtra. He previously served as the Chief Minister of Maharashtra from 2014 to 2019 (the first non-Congress CM to complete a full 5-year term in over 40 years) and as Deputy Chief Minister from 2022 to 2024. He represents Nagpur South West in the Maharashtra Legislative Assembly.',
    keyStances: [
      'Mumbai-Nagpur Samruddhi Mahamarg & Metro expressway connectivity',
      'Jalyukt Shivar Abhiyan for water-neutral drought-free villages',
      'Atal Setu (Mumbai Trans Harbour Link) & coastal road infrastructure',
      'Direct Benefit Transfer for Ladki Bahin Scheme and farmers’ electricity waiver',
      'FDI attraction in semiconductor fabrication and AI data centers in Navi Mumbai'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/Dev_Fadnavis',
      facebook: 'https://facebook.com/devendra.fadnavis',
      instagram: 'https://instagram.com/devendra_fadnavis',
      wikipedia: 'https://en.wikipedia.org/wiki/Devendra_Fadnavis'
    },
    parliamentaryRecord: {
      attendancePercent: 96,
      nationalAvgAttendance: 79,
      debatesCount: 110,
      questionsAsked: 45,
      privateMemberBills: 2,
      committeeMemberships: [
        'Maharashtra Cabinet Leader',
        'State Security Council',
        'State Planning Commission Chairperson'
      ]
    },
    mplads: {
      allocatedCr: 20.0, // State MLA Fund (LAD)
      spentCr: 19.4,
      utilizationPercent: 97.0,
      completedProjects: 142,
      ongoingProjects: 11,
      topProjects: [
        { title: 'Nagpur AIIMS & MIHAN Feeder Road Infrastructure', costCr: 4.2, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Nagpur South West' },
        { title: 'Dr. Babasaheb Ambedkar Digital Library & Competitive Exam Center', costCr: 3.5, sector: 'Education', status: 'Completed', location: 'Gopal Nagar, Nagpur' },
        { title: 'Smart Underground Sewage Line & Lake Rejuvenation (Futala & Ambazari)', costCr: 4.8, sector: 'Water & Sanitation', status: 'Completed', location: 'Nagpur West' },
        { title: 'Urban Health Wellness Clinics with Automated Pathology', costCr: 2.6, sector: 'Healthcare', status: 'In Progress', location: 'Jaitala' }
      ]
    },
    assets: {
      movableCr: 1.8,
      immovableCr: 11.4,
      totalCr: 13.2,
      liabilitiesCr: 0.62,
      declarationYear: 2024,
      history: [
        { year: 2009, totalCr: 1.8, movableCr: 0.3, immovableCr: 1.5, source: 'Maharashtra Assembly Affidavit' },
        { year: 2014, totalCr: 4.2, movableCr: 0.8, immovableCr: 3.4, source: 'Maharashtra Assembly Affidavit' },
        { year: 2019, totalCr: 8.6, movableCr: 1.2, immovableCr: 7.4, source: 'Maharashtra Assembly Affidavit' },
        { year: 2024, totalCr: 13.2, movableCr: 1.8, immovableCr: 11.4, source: 'Maharashtra Assembly Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 4,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'df-case-1',
          caseNumber: 'RCC No. 231/1996',
          court: 'JMFC Court, Nagpur',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 147', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 126',
          description: 'Public opposition protest and municipal citizen agitation in Nagpur regarding civic infrastructure and water supply.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 1996,
          yearResolved: 2012,
          isSerious: false,
          summaryTag: 'Nagpur Civic Agitation (1996)',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Civic Demonstration']
        },
        {
          id: 'df-case-2',
          caseNumber: 'SCC No. 410/2014 (Nomination Disclosure)',
          court: 'JMFC Court, Nagpur (Bombay High Court Stay / Discharge Review)',
          courtLevel: 'High Court',
          ipcSections: ['RP Act Section 125A'],
          description: 'Allegation regarding non-inclusion of 1996 disposed demonstration cases in 2014 election affidavit. Bombay High Court quashed process; review proceedings closed.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Electoral Disclosure & RP Act',
          yearFiled: 2014,
          isSerious: false,
          summaryTag: 'Representation of People Act Section 125A',
          tags: ['Electoral Disclosure & RP Act', 'Current', 'Stayed by High Court', 'Form 26 Affidavit']
        },
        {
          id: 'df-case-3',
          caseNumber: 'FIR No. 88/2007 (Electricity Tariff Agitation)',
          court: 'Special MP/MLA Court, Nagpur',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 143', 'IPC 188'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223',
          description: 'Vidarbha farmers electricity tariff reduction protest rally and gherao demonstration outside power discom office.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2007,
          yearResolved: 2015,
          isSerious: false,
          summaryTag: 'Vidarbha Power Tariff Farmers Agitation',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Farmers Protest']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg', year: '2016-2023', category: 'Infrastructure', description: 'Conceptualized and constructed a 701-km 6-lane access-controlled super expressway linking Nagpur to Mumbai in record time.', impact: 'Reduced travel time from 16 hours to 8 hours, transforming agro-corridors across 10 districts.' },
      { title: 'Jalyukt Shivar Abhiyan', year: '2015', category: 'Water Conservation', description: 'Decentralized water storage movement deepening 25,000+ village nalas and streams.', impact: 'Created over 27,000 TCM water storage potential across drought-prone Vidarbha and Marathwada.' },
      { title: 'Mumbai Metro Masterplan Execution', year: '2014-2024', category: 'Urban Transit', description: 'Sanctioned and concurrently built 14 metro lines spanning over 337 km in Mumbai Metropolitan Region.', impact: 'Expanded mass transit capacity to 10+ million daily commuters.' }
    ],
    politicalTimeline: [
      { year: '1997', role: 'Mayor of Nagpur', achievement: 'Became the second-youngest municipal mayor in India at age 27.' },
      { year: '1999-Present', role: 'MLA Nagpur South West', achievement: 'Elected for six consecutive terms to Maharashtra Legislative Assembly.' },
      { year: '2013-2015', role: 'President, Maharashtra BJP', achievement: 'Led BJP to its highest-ever tally of 122 seats in Maharashtra Assembly in 2014.' },
      { year: '2024-Present', role: 'Chief Minister of Maharashtra', achievement: 'Led Mahayuti alliance to decisive majority victory in 2024 Assembly elections.' }
    ],
    news: [
      { id: 'df-1', title: 'CM Fadnavis inaugurates Navi Mumbai Integrated AI & Data Center Park', source: 'The Hindu', date: '19 Feb 2025', sentiment: 'positive', summary: 'Signed MoUs worth ₹45,000 crores for clean energy powered cloud infrastructure.' },
      { id: 'df-2', title: 'Cabinet clears ₹5,000 crore crop loss relief disbursal directly to farmer bank accounts', source: 'Sakal', date: '02 Feb 2025', sentiment: 'positive', summary: 'Waived agricultural pump arrears and sanctioned immediate DBT compensation.' }
    ],
    tags: ['Chief Minister', 'Maharashtra', 'BJP', 'Nagpur', 'Mahayuti', 'Infrastructure'],
    verifiedAffidavit: true
  },
  {
    id: 'jyotiraditya-scindia',
    name: 'Jyotiraditya Scindia',
    hindiName: 'ज्योतिरादित्य सिंधिया',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jyotiraditya_Scindia_in_2022.jpg/480px-Jyotiraditya_Scindia_in_2022.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Union Minister of Communications and DoNER',
    state: 'Madhya Pradesh',
    constituency: 'Guna',
    house: 'Lok Sabha',
    age: 54,
    dateOfBirth: '01 January 1971',
    birthPlace: 'Mumbai, Maharashtra',
    education: 'B.A. in Economics from Harvard University; MBA from Stanford Graduate School of Business',
    profession: 'Politician, Former Investment Banker & Corporate Executive',
    spouse: 'Priyadarshini Raje Scindia',
    bio: 'Jyotiraditya Madhavrao Scindia is an Indian politician serving as the Union Minister of Communications and Development of North Eastern Region (DoNER) since June 2024. He previously served as the Union Minister of Civil Aviation and Steel. A five-term Member of Parliament from Guna, he is an alumnus of Harvard and Stanford and previously served in the Union Council of Ministers holding Power and Commerce portfolios.',
    keyStances: [
      'Rapid 5G and 6G telecom spectrum expansion & indigenous telecom stack deployment (4G/5G BSNL)',
      'Digital infrastructure connectivity across the eight North Eastern states (DoNER)',
      'Aviation modernization: DigiYatra facial recognition and doubling operational airports to 150+',
      'Green steel production & carbon neutrality standards in heavy industries',
      'Skill empowerment and tourism revival in Gwalior-Chambal belt'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/JM_Scindia',
      facebook: 'https://facebook.com/JMScindia',
      instagram: 'https://instagram.com/jyotiradityascindia',
      wikipedia: 'https://en.wikipedia.org/wiki/Jyotiraditya_Scindia'
    },
    parliamentaryRecord: {
      attendancePercent: 91,
      nationalAvgAttendance: 79,
      debatesCount: 76,
      questionsAsked: 0,
      privateMemberBills: 0,
      committeeMemberships: [
        'Cabinet Committee on Economic Affairs',
        'Cabinet Committee on Infrastructure',
        'Parliamentary Committee on Communications and Information Technology'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.5,
      utilizationPercent: 94.0,
      completedProjects: 124,
      ongoingProjects: 16,
      topProjects: [
        { title: 'Guna & Shivpuri Telecom Optical Fiber & 4G Towers (80 Villages)', costCr: 4.6, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Guna Constituency' },
        { title: 'Gwalior-Chambal Regional Trauma & Critical Care Center', costCr: 4.1, sector: 'Healthcare', status: 'Completed', location: 'Shivpuri District Hospital' },
        { title: 'Model Smart Schools & Polytechnic Robotics Labs', costCr: 3.4, sector: 'Education', status: 'Completed', location: 'Ashoknagar' },
        { title: 'Rural Community Water Harvesting & Tanker Replacement Pipeline', costCr: 2.8, sector: 'Water & Sanitation', status: 'In Progress', location: 'Raghogarh & Bamori' }
      ]
    },
    assets: {
      movableCr: 62.5,
      immovableCr: 362.0, // Historical royal properties & land assets as declared in ECI affidavit
      totalCr: 424.5,
      liabilitiesCr: 0.18,
      declarationYear: 2024,
      history: [
        { year: 2004, totalCr: 24.1, movableCr: 5.2, immovableCr: 18.9, source: 'Lok Sabha Affidavit' },
        { year: 2014, totalCr: 33.5, movableCr: 8.4, immovableCr: 25.1, source: 'Lok Sabha Affidavit' },
        { year: 2020, totalCr: 379.0, movableCr: 35.0, immovableCr: 344.0, source: 'Rajya Sabha Affidavit (Asset Revaluation)' },
        { year: 2024, totalCr: 424.5, movableCr: 62.5, immovableCr: 362.0, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'js-case-1',
          caseNumber: 'FIR No. 162/2017 (Mandsaur Kisan Dharna)',
          court: 'JMFC Court, Dhodhar / Ratlam, Madhya Pradesh',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 188', 'IPC 144'],
          bnsEquivalent: 'BNS Section 223',
          description: 'Preventive detention during farmers protest solidarity march attempting to visit bereaved families in Mandsaur following police firing. Discharged with zero charges.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2017,
          yearResolved: 2018,
          isSerious: false,
          summaryTag: 'Mandsaur Farmers Agitation Solidarity Dharna',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Farmers Solidarity']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Ude Desh Ka Aam Nagrik (UDAN) Expansion', year: '2021-2024', category: 'Aviation', description: 'Operationalized 75 new regional airports, water aerodromes, and 500+ regional flight routes.', impact: 'Connected Tier-2/Tier-3 cities including Darbhanga, Jharsuguda, and Tezu to national aviation grid.' },
      { title: 'Bharat 6G Alliance & Telecom Technology Development Fund', year: '2024', category: 'Communications', description: 'Set up national research consortia to lead global patents and standardization for 6G technologies.', impact: 'Funded 40+ domestic deep-tech telecom hardware startups.' }
    ],
    politicalTimeline: [
      { year: '2002', role: 'Elected MP Guna (1st Term)', achievement: 'Won by-election with historic margin following death of Madhavrao Scindia.' },
      { year: '2008-2014', role: 'Union Minister of State (Commerce / Power)', achievement: 'Initiated National Electricity Grid synchronization (One Nation, One Grid).' },
      { year: '2020', role: 'Joined BJP & Elected to Rajya Sabha', achievement: 'Catalyzed political transition in Madhya Pradesh.' },
      { year: '2024-Present', role: 'Union Minister of Communications & DoNER', achievement: 'Re-elected to Lok Sabha from Guna with 540,000+ vote margin.' }
    ],
    news: [
      { id: 'js-1', title: 'Communications Minister announces 100% 4G saturation across all North-Eastern border villages', source: 'Financial Express', date: '17 Feb 2025', sentiment: 'positive', summary: 'Commissioned 1,200 solar-powered 4G cellular towers in Arunachal Pradesh and Mizoram.' },
      { id: 'js-2', title: 'Scindia reviews postal payment bank services and AI customer grievance redressal', source: 'LiveMint', date: '05 Jan 2025', sentiment: 'neutral', summary: 'Directed integration of India Post Payments Bank with doorstep Aadhaar biometric updation.' }
    ],
    tags: ['Union Minister', 'Communications', 'DoNER', 'Lok Sabha', 'Madhya Pradesh', 'Guna', 'Civil Aviation'],
    verifiedAffidavit: true
  },
  {
    id: 'mohan-yadav',
    name: 'Dr. Mohan Yadav',
    hindiName: 'डॉ. मोहन यादव',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mohan_Yadav_official_portrait.jpg/480px-Mohan_Yadav_official_portrait.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Chief Minister of Madhya Pradesh',
    state: 'Madhya Pradesh',
    constituency: 'Ujjain South',
    house: 'State Legislative Assembly',
    age: 59,
    dateOfBirth: '25 March 1965',
    birthPlace: 'Ujjain, Madhya Pradesh',
    education: 'Ph.D., LL.B., MBA, and M.A. in Political Science from Vikram University, Ujjain',
    profession: 'Educationist, Businessman & Politician',
    spouse: 'Seema Yadav',
    bio: 'Dr. Mohan Yadav is an Indian politician and educationist serving as the 19th Chief Minister of Madhya Pradesh since December 2023. A three-time MLA representing Ujjain South, he previously served as the Higher Education Minister of Madhya Pradesh from 2020 to 2023, where he pioneered the early state-level implementation of the National Education Policy 2020.',
    keyStances: [
      'Mahakal Mahalok spiritual tourism corridor & Simhastha Kumbh 2028 master planning',
      'Implementation of National Education Policy with vocational degree integration in colleges',
      'Modern industrial corridors connecting Indore-Ujjain-Dewas with green expressway grids',
      'Continuation & expansion of Ladli Behna and Kisan Kalyan financial empowerment schemes',
      'Ban on unregulated loudspeakers at religious places and open sale of meat along designated routes'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/DrMohanYadav51',
      facebook: 'https://facebook.com/DrMohanYadavOfficial',
      instagram: 'https://instagram.com/drmohanyadav51',
      wikipedia: 'https://en.wikipedia.org/wiki/Mohan_Yadav'
    },
    parliamentaryRecord: {
      attendancePercent: 95,
      nationalAvgAttendance: 79,
      debatesCount: 88,
      questionsAsked: 32,
      privateMemberBills: 1,
      committeeMemberships: [
        'Madhya Pradesh Cabinet Leader',
        'State Disaster Management Authority (Chairperson)',
        'State Investment Promotion Board'
      ]
    },
    mplads: {
      allocatedCr: 20.0, // State MLA Fund
      spentCr: 19.1,
      utilizationPercent: 95.5,
      completedProjects: 118,
      ongoingProjects: 14,
      topProjects: [
        { title: 'Ujjain South Advanced Trauma & Ayurvedic Research Center', costCr: 4.4, sector: 'Healthcare', status: 'Completed', location: 'Ujjain Urban' },
        { title: 'Vikramaditya Vedic Clock & Planetarium Heritage Observatory', costCr: 3.8, sector: 'Education', status: 'Completed', location: 'Ujjain' },
        { title: 'Kshipra Riverfront Concrete Ghats & Sewerage Interception Pipe', costCr: 4.2, sector: 'Water & Sanitation', status: 'Completed', location: 'Ramghat & Triveni' },
        { title: 'Industrial Agro-Food Processing Cluster Internal Roads', costCr: 2.7, sector: 'Rural Development', status: 'In Progress', location: 'Ujjain Outer' }
      ]
    },
    assets: {
      movableCr: 8.5,
      immovableCr: 33.5,
      totalCr: 42.0,
      liabilitiesCr: 8.1,
      declarationYear: 2023,
      history: [
        { year: 2013, totalCr: 15.6, movableCr: 3.2, immovableCr: 12.4, source: 'MP Assembly Affidavit' },
        { year: 2018, totalCr: 31.2, movableCr: 6.1, immovableCr: 25.1, source: 'MP Assembly Affidavit' },
        { year: 2023, totalCr: 42.0, movableCr: 8.5, immovableCr: 33.5, source: 'MP Assembly Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 1,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'my-case-1',
          caseNumber: 'Case No. 129/2012 (Ujjain Demonstration)',
          court: 'CJM Court, Ujjain, Madhya Pradesh',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 188', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 126',
          description: 'Violation of administrative curfew order during political student demonstration and highway chakka jam in Ujjain.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2012,
          yearResolved: 2017,
          isSerious: false,
          summaryTag: 'Ujjain Student Demonstration (Acquitted)',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Student Agitation']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Statewide National Education Policy (NEP) 2020 Rollout', year: '2021', category: 'Higher Education', description: 'Made MP the first Indian state to implement NEP 2020 across 500+ government and private colleges.', impact: 'Introduced multi-disciplinary subject choices and agricultural credits for university students.' },
      { title: 'Simhastha Kumbh 2028 Infrastructure Masterplan', year: '2024', category: 'Urban Development', description: 'Sanctioned ₹18,000 crore comprehensive development plan including 4-lane ring roads and permanent water canals for Kshipra river.', impact: 'Prepares infrastructure for 100+ million pilgrims visiting Ujjain.' },
      { title: 'Regional Industry Conclaves (RIC)', year: '2024', category: 'Investment & Economy', description: 'Decentralized investment summits held across Jabalpur, Gwalior, Sagar, Rewa, and Coimbatore.', impact: 'Attracted ₹1.5 lakh crore investment commitments outside Tier-1 metro cities.' }
    ],
    politicalTimeline: [
      { year: '1984-1988', role: 'ABVP Ujjain President & National Secretary', achievement: 'Led student movements across Vikram University campus.' },
      { year: '2004-2010', role: 'Chairman, Ujjain Development Authority (UDA)', achievement: 'Developed major residential townships and ring road networks.' },
      { year: '2020-2023', role: 'Minister of Higher Education, MP', achievement: 'Oversaw digitization of college admissions and examination evaluation.' },
      { year: '2023-Present', role: 'Chief Minister of Madhya Pradesh', achievement: 'Sworn in as CM after BJP’s landslide 163-seat assembly victory.' }
    ],
    news: [
      { id: 'my-1', title: 'CM Mohan Yadav launches PM Shri Tourism Air Service linking Bhopal, Indore & Ujjain', source: 'Dainik Bhaskar', date: '16 Feb 2025', sentiment: 'positive', summary: 'Flagged off twin-engine aircraft service to boost regional connectivity for pilgrims and business travellers.' },
      { id: 'my-2', title: 'MP Cabinet approves ₹3,800 crore irrigation schemes for Bundelkhand region', source: 'Free Press Journal', date: '28 Jan 2025', sentiment: 'positive', summary: 'Cleared Ken-Betwa river linking subsidiary feeder canals benefiting 400,000 hectares of farm land.' }
    ],
    tags: ['Chief Minister', 'Madhya Pradesh', 'BJP', 'Ujjain South', 'Higher Education', 'NEP 2020'],
    verifiedAffidavit: true
  },
  {
    id: 'shivraj-singh-chouhan',
    name: 'Shivraj Singh Chouhan',
    hindiName: 'शिवराज सिंह चौहान',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Shivraj_Singh_Chouhan_official_portrait.jpg/480px-Shivraj_Singh_Chouhan_official_portrait.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Union Minister of Agriculture, Farmers Welfare & Rural Development',
    state: 'Madhya Pradesh',
    constituency: 'Vidisha',
    house: 'Lok Sabha',
    age: 65,
    dateOfBirth: '05 March 1959',
    birthPlace: 'Jait, Sehore, Madhya Pradesh',
    education: 'M.A. in Philosophy (Gold Medalist), Barkatullah University, Bhopal',
    profession: 'Agriculturist, Politician',
    spouse: 'Sadhna Singh',
    bio: 'Shivraj Singh Chouhan (popularly known as "Mama") is an Indian politician serving as the Union Minister of Agriculture and Farmers Welfare and Minister of Rural Development since June 2024. He is the longest-serving Chief Minister of Madhya Pradesh, having held the office for over 16 years across four terms (2005-2018, 2020-2023). He represents Vidisha in the Lok Sabha, winning in 2024 by a record margin of over 821,000 votes.',
    keyStances: [
      'Universal digital farmer ID (AgriStack) and precision farming credit delivery',
      'Empowerment of women through direct income transfers (Ladli Behna model)',
      'Pradhan Mantri Gram Sadak Yojana (PMGSY) rural road connectivity to all habitations',
      'Diversification into horticulture, pulses, oilseeds, and organic farming',
      'Comprehensive MSP procurement infrastructure for wheat, paddy, and coarse grains'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/ChouhanShivraj',
      facebook: 'https://facebook.com/ChouhanShivraj',
      instagram: 'https://instagram.com/chouhanshivrajsingh',
      wikipedia: 'https://en.wikipedia.org/wiki/Shivraj_Singh_Chouhan'
    },
    parliamentaryRecord: {
      attendancePercent: 93,
      nationalAvgAttendance: 79,
      debatesCount: 82,
      questionsAsked: 0,
      privateMemberBills: 0,
      committeeMemberships: [
        'Cabinet Committee on Economic Affairs (CCEA)',
        'Cabinet Committee on Rural Development',
        'National Agricultural Development Council'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.3,
      utilizationPercent: 97.2,
      completedProjects: 165,
      ongoingProjects: 12,
      topProjects: [
        { title: 'Vidisha-Bhojpur Micro-Lift Irrigation & Drip Demonstration Grids', costCr: 4.8, sector: 'Rural Development', status: 'Completed', location: 'Vidisha District' },
        { title: 'Bhopal-Vidisha Rural All-Weather Bitumen Link Roads (45 Habitations)', costCr: 4.2, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Sehore & Raisen' },
        { title: 'Maa Narmada Community Cold Storage & Grain Cleaning Hub', costCr: 3.6, sector: 'Rural Development', status: 'Completed', location: 'Budhni' },
        { title: 'Mother & Child Nutrition Wellness Units (12 Blocks)', costCr: 3.1, sector: 'Healthcare', status: 'In Progress', location: 'Kurwai & Basoda' }
      ]
    },
    assets: {
      movableCr: 4.8,
      immovableCr: 10.3,
      totalCr: 15.1,
      liabilitiesCr: 0.45,
      declarationYear: 2024,
      history: [
        { year: 2008, totalCr: 2.1, movableCr: 0.6, immovableCr: 1.5, source: 'MP Assembly Affidavit' },
        { year: 2013, totalCr: 6.3, movableCr: 1.8, immovableCr: 4.5, source: 'MP Assembly Affidavit' },
        { year: 2018, totalCr: 10.2, movableCr: 2.9, immovableCr: 7.3, source: 'MP Assembly Affidavit' },
        { year: 2024, totalCr: 15.1, movableCr: 4.8, immovableCr: 10.3, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'ssc-case-1',
          caseNumber: 'Case No. 201/2013 (Bhopal Jan Andolan)',
          court: 'Special MP/MLA Court, Bhopal, Madhya Pradesh',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 143', 'IPC 188'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223',
          description: 'Statewide farmer loan relief demonstration and public assembly at TT Nagar Bhopal. Case closed and quashed by state administration order.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2013,
          yearResolved: 2018,
          isSerious: false,
          summaryTag: 'Bhopal Farmer Loan Relief Jan Andolan',
          tags: ['Political Protest & Agitation', 'Previous', 'Discharged / Quashed', 'Public Agitation']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Ladli Laxmi Yojana', year: '2007', category: 'Child Welfare', description: 'State-funded insurance and scholarship certificates awarded to newborn girl children upon school milestones.', impact: 'Significantly reduced child marriage and raised girl child sex ratio across Madhya Pradesh.' },
      { title: 'Krishi Karman Award Record & Agriculture Growth Rate', year: '2011-2018', category: 'Agriculture', description: 'Led MP to record 18%+ double-digit agricultural growth through massive canal irrigation expansion.', impact: 'Madhya Pradesh won national Krishi Karman Award for seven consecutive years.' }
    ],
    politicalTimeline: [
      { year: '1991-2005', role: 'Member of Parliament (Vidisha - 5 Terms)', achievement: 'Consistently won Lok Sabha constituency five times consecutively.' },
      { year: '2005-2018', role: 'Chief Minister of MP (3 Consecutive Terms)', achievement: 'Transformed MP from a "BIMARU" state to an agricultural powerhouse.' },
      { year: '2020-2023', role: 'Chief Minister of MP (4th Term)', achievement: 'Successfully managed COVID response and rolled out Ladli Behna scheme.' },
      { year: '2024-Present', role: 'Union Minister of Agriculture & Rural Development', achievement: 'Secured record victory in Vidisha by 8.21 lakh votes in 2024 Lok Sabha.' }
    ],
    news: [
      { id: 'ssc-1', title: 'Agriculture Minister rolls out Digital Agriculture Mission with ₹2,817 crore outlay', source: 'The Hindu BusinessLine', date: '20 Feb 2025', sentiment: 'positive', summary: 'Announced digital registries for crop estimation, soil health card sync, and localized weather advisories.' },
      { id: 'ssc-2', title: 'Chouhan reviews Lakhpati Didi rural self-help group livelihood milestones', source: 'PTI', date: '10 Jan 2025', sentiment: 'positive', summary: 'Targeted empowering 30 million rural SHG women to achieve annual income above ₹1 lakh.' }
    ],
    tags: ['Union Minister', 'Agriculture', 'Rural Development', 'Vidisha', 'Madhya Pradesh', 'Former Chief Minister'],
    verifiedAffidavit: true
  },
  {
    id: 'narendra-modi',
    name: 'Narendra Modi',
    hindiName: 'नरेन्द्र मोदी',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PM_Modi_2023.jpg/480px-PM_Modi_2023.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Prime Minister of India',
    state: 'Uttar Pradesh',
    constituency: 'Varanasi',
    house: 'Lok Sabha',
    age: 74,
    dateOfBirth: '17 September 1950',
    birthPlace: 'Vadnagar, Mehsana, Gujarat',
    education: 'M.A. in Political Science, Gujarat University; B.A., University of Delhi',
    profession: 'Politician, Public Servant, Author',
    spouse: 'Jashodaben Modi (Estranged)',
    bio: 'Narendra Damodardas Modi is an Indian politician serving as the 14th Prime Minister of India since May 2014. He previously served as the Chief Minister of Gujarat from 2001 to 2014. He represents Varanasi in the Lok Sabha and is the longest-serving non-Congress Prime Minister in Indian history, leading the National Democratic Alliance across three consecutive terms.',
    keyStances: [
      'Viksit Bharat 2047 vision for developed economy status',
      'Direct Benefit Transfer (DBT) and digital public infrastructure (India Stack)',
      'Universal sanitation (Swachh Bharat) and tap water connection (Jal Jeevan Mission)',
      'Strategic autonomy and multilateral diplomatic alignment (Global South leadership)',
      'Renewable energy expansion (500 GW target) and International Solar Alliance'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/narendramodi',
      facebook: 'https://facebook.com/narendramodi',
      instagram: 'https://instagram.com/narendramodi',
      website: 'https://www.narendramodi.in',
      wikipedia: 'https://en.wikipedia.org/wiki/Narendra_Modi'
    },
    parliamentaryRecord: {
      attendancePercent: 100,
      nationalAvgAttendance: 79,
      debatesCount: 42,
      questionsAsked: 0,
      privateMemberBills: 0,
      committeeMemberships: [
        'Chairperson, Cabinet Committee on Security',
        'Chairperson, NITI Aayog',
        'Chairperson, Cabinet Committee on Economic Affairs'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.8,
      utilizationPercent: 99.2,
      completedProjects: 180,
      ongoingProjects: 8,
      topProjects: [
        { title: 'Kashi Vishwanath Corridor & Ganga Riverfront Heritage Redevelopment', costCr: 5.0, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Varanasi' },
        { title: 'Mahamana Pandit Madan Mohan Malaviya Cancer Centre', costCr: 4.8, sector: 'Healthcare', status: 'Completed', location: 'BHU Campus, Varanasi' },
        { title: 'Varanasi International Cooperation and Convention Centre (Rudraksh)', costCr: 4.2, sector: 'Community Centers', status: 'Completed', location: 'Sigra, Varanasi' },
        { title: 'Solar Powered Weaving Looms & Artisan Skill Centers', costCr: 3.5, sector: 'Rural Development', status: 'Completed', location: 'Kotwa & Ramnagar' }
      ]
    },
    assets: {
      movableCr: 3.02,
      immovableCr: 0.0, // Donated his residential plot share in Gandhinagar in 2024
      totalCr: 3.02,
      liabilitiesCr: 0.0,
      declarationYear: 2024,
      history: [
        { year: 2014, totalCr: 1.65, movableCr: 0.65, immovableCr: 1.0, source: 'Lok Sabha Affidavit' },
        { year: 2019, totalCr: 2.51, movableCr: 1.41, immovableCr: 1.1, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 3.02, movableCr: 3.02, immovableCr: 0.0, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'nm-case-1',
          caseNumber: 'Zakia Jafri Special Leave Petition (SIT Investigation)',
          court: 'Supreme Court of India, New Delhi',
          courtLevel: 'Supreme Court',
          ipcSections: ['Supreme Court SIT Monitored Investigation'],
          description: 'Supreme Court-appointed Special Investigation Team (SIT) conducted an exhaustive multi-year investigation into allegations of larger conspiracy during 2002 Gujarat riots. In June 2022, a 3-judge bench of the Supreme Court dismissed the appeal and upheld the SIT closure report clean chit, ruling allegations lacked evidentiary support.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Other Offences',
          yearFiled: 2008,
          yearResolved: 2022,
          isSerious: true,
          summaryTag: 'Supreme Court SIT 2022 Landmark Clean Chit',
          tags: ['Supreme Court', 'Previous', 'Disposed / Acquitted', 'Landmark Verdict', 'SIT Inquiry']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Pradhan Mantri Jan Dhan Yojana & UPI Digital Public Infrastructure', year: '2014-Present', category: 'Financial Inclusion', description: 'Opened over 520 million zero-balance bank accounts enabling ₹34 lakh crore direct welfare transfers.', impact: 'Eliminated middlemen leakages and built world-leading instant digital payments volume.' },
      { title: 'Jal Jeevan Mission & Swachh Bharat Abhiyan', year: '2014-2024', category: 'Public Health & Water', description: 'Constructed 110+ million household toilets and provided piped tap water to 150+ million rural households.', impact: 'Reduced infant mortality and waterborne disease outbreaks significantly.' },
      { title: 'Pradhan Mantri Awas Yojana (PMAY)', year: '2015-2024', category: 'Housing', description: 'Constructed over 40 million pucca houses for low-income rural and urban families.', impact: 'Granted registered home-ownership predominantly in the name of women heads of households.' }
    ],
    politicalTimeline: [
      { year: '2001-2014', role: 'Chief Minister of Gujarat', achievement: 'Elected CM four times; established 24x7 rural power (Jyotigram Yojana).' },
      { year: '2014', role: 'Prime Minister of India (1st Term)', achievement: 'Led BJP to first single-party parliamentary majority in 30 years.' },
      { year: '2019', role: 'Prime Minister of India (2nd Term)', achievement: 'Re-elected with increased tally of 303 seats; introduced major structural reforms.' },
      { year: '2024-Present', role: 'Prime Minister of India (3rd Term)', achievement: 'Sworn in for third consecutive term leading NDA Coalition.' }
    ],
    news: [
      { id: 'nm-1', title: 'PM Modi inaugurates semiconductor fabrication plant in Dholera & Sanand', source: 'PIB India', date: '21 Feb 2025', sentiment: 'positive', summary: 'Emphasized India’s emergence as a trusted global chip manufacturing and hardware design hub.' },
      { id: 'nm-2', title: 'Prime Minister chairs Pragati review meeting on ₹12 lakh crore highway projects', source: 'The Economic Times', date: '04 Feb 2025', sentiment: 'neutral', summary: 'Reviewed inter-state logistical bottlenecks across dedicated freight corridors and high-speed rail.' }
    ],
    tags: ['Prime Minister', 'Varanasi', 'BJP', 'NDA Leader', 'Uttar Pradesh', 'Gujarat'],
    verifiedAffidavit: true
  },
  {
    id: 'shashi-tharoor',
    name: 'Dr. Shashi Tharoor',
    hindiName: 'शशि थरूर',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Shashi_Tharoor_2019.jpg/480px-Shashi_Tharoor_2019.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    party: 'Indian National Congress',
    partyAbbr: 'INC',
    partyColor: '#0ea5e9',
    alliance: 'INDIA',
    currentRole: 'Member of Parliament (Thiruvananthapuram)',
    state: 'Kerala',
    constituency: 'Thiruvananthapuram',
    house: 'Lok Sabha',
    age: 68,
    dateOfBirth: '09 March 1956',
    birthPlace: 'London, United Kingdom',
    education: 'Ph.D. & M.A.L.D. from Fletcher School of Law and Diplomacy, Tufts University; B.A. St. Stephen’s College',
    profession: 'Author, Diplomat, Politician',
    spouse: 'Late Sunanda Pushkar',
    bio: 'Dr. Shashi Tharoor is an Indian politician, author, and former international diplomat who has served as the Member of Parliament for Thiruvananthapuram since 2009. He previously served as Under-Secretary-General of the United Nations, Minister of State for External Affairs, and Minister of State for Human Resource Development. He is the author of over 25 acclaimed books.',
    keyStances: [
      'Digital privacy, cyber freedom, and algorithmic transparency legislation',
      'Modernization of Indian foreign policy and multilateral climate diplomacy',
      'Educational curriculum modernization and autonomous university funding',
      'Protection of secular pluralism and constitutional liberalism',
      'Development of Vizhinjam International Transshipment Deepwater Port'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/ShashiTharoor',
      facebook: 'https://facebook.com/ShashiTharoor',
      instagram: 'https://instagram.com/shashitharoor',
      wikipedia: 'https://en.wikipedia.org/wiki/Shashi_Tharoor'
    },
    parliamentaryRecord: {
      attendancePercent: 88,
      nationalAvgAttendance: 79,
      debatesCount: 164,
      questionsAsked: 482,
      privateMemberBills: 14,
      committeeMemberships: [
        'Chairperson, Standing Committee on External Affairs (2014-2019)',
        'Chairperson, Standing Committee on Information Technology (2019-2022)',
        'Consultative Committee on Defence'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.8,
      utilizationPercent: 95.2,
      completedProjects: 140,
      ongoingProjects: 15,
      topProjects: [
        { title: 'Thiruvananthapuram Technopark Biotech & AI Innovation Incubator', costCr: 4.8, sector: 'Education', status: 'Completed', location: 'Kazhakkoottam' },
        { title: 'Coastal Fisherman Safety GPS Transponders & Harbor Desiltation', costCr: 3.9, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Vizhinjam & Pozhiyoor' },
        { title: 'Dialysis Units & Oncology Radiation Machinery at RCC Thiruvananthapuram', costCr: 4.5, sector: 'Healthcare', status: 'Completed', location: 'Medical College Campus' },
        { title: 'High-School Digital English Language & Coding Labs (30 Schools)', costCr: 3.2, sector: 'Education', status: 'Completed', location: 'Nemom & Vattiyoorkavu' }
      ]
    },
    assets: {
      movableCr: 49.3,
      immovableCr: 6.7,
      totalCr: 56.0,
      liabilitiesCr: 0.0,
      declarationYear: 2024,
      history: [
        { year: 2009, totalCr: 21.0, movableCr: 18.0, immovableCr: 3.0, source: 'Lok Sabha Affidavit' },
        { year: 2014, totalCr: 23.0, movableCr: 20.0, immovableCr: 3.0, source: 'Lok Sabha Affidavit' },
        { year: 2019, totalCr: 35.0, movableCr: 30.0, immovableCr: 5.0, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 56.0, movableCr: 49.3, immovableCr: 6.7, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0, // Discharged in Sunanda Pushkar case in August 2021 by Special Delhi Court
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'st-case-1',
          caseNumber: 'FIR No. 04/2015 (Sunanda Pushkar Matter)',
          court: 'Special MP/MLA Court, Rouse Avenue Courts, New Delhi',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 306', 'IPC 498A'],
          bnsEquivalent: 'BNS Section 108, BNS Section 85',
          description: 'Police investigation into the demise of Sunanda Pushkar. On 18 August 2021, Special Judge Geetanjali Goel discharged Dr. Shashi Tharoor of all offences, ruling there was neither prima facie case nor evidence of abetment.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Other Offences',
          yearFiled: 2015,
          yearResolved: 2021,
          isSerious: true,
          summaryTag: 'Special Delhi Court Full Discharge Order (Aug 2021)',
          tags: ['Special MP/MLA Court', 'Previous', 'Discharged / Quashed', 'Landmark Verdict', 'Full Discharge']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Protection of Private Data & Digital Rights Advocacy', year: '2019-2022', category: 'Technology Policy', description: 'As IT Parliamentary Committee Chair, led landmark scrutiny hearings on citizen surveillance and social media accountability.', impact: 'Set national benchmarks for data protection and telecom privacy rules.' },
      { title: 'Vizhinjam International Seaport Fast-Tracking', year: '2010-2024', category: 'Infrastructure', description: 'Consistently advocated and coordinated central and state clearances for India’s first deepwater container transshipment hub.', impact: 'Diverted global container traffic directly to India from Colombo and Singapore.' },
      { title: 'Private Member Bills on Marital Equality and Defamation Decriminalization', year: '2015-2023', category: 'Legislative Reform', description: 'Introduced 14 Private Member Bills addressing freedom of speech, refugee rights, and electoral reforms.', impact: 'Stimulated nationwide constitutional and judicial debates.' }
    ],
    politicalTimeline: [
      { year: '1978-2007', role: 'Under-Secretary-General, United Nations', achievement: 'Managed UNHCR refugee operations and led global public information departments.' },
      { year: '2009', role: 'Elected MP Thiruvananthapuram (1st Term)', achievement: 'Won by nearly 100,000 votes in debut election; appointed MoS External Affairs.' },
      { year: '2014 & 2019', role: 'Re-elected MP (2nd & 3rd Term)', achievement: 'Retained seat despite multi-cornered statewide political waves.' },
      { year: '2024', role: 'Re-elected MP (4th Term)', achievement: 'Secured fourth consecutive victory in Thiruvananthapuram.' }
    ],
    news: [
      { id: 'st-1', title: 'Tharoor leads international parliamentary conference on ethical AI regulation', source: 'The Hindu', date: '19 Feb 2025', sentiment: 'positive', summary: 'Advocated for open-source foundation models and algorithmic non-discrimination frameworks.' },
      { id: 'st-2', title: 'MP inspects commercial container vessel trial operations at Vizhinjam port', source: 'Mathrubhumi', date: '25 Jan 2025', sentiment: 'positive', summary: 'Noted that the port is positioned to handle 3 million TEU container throughput annually.' }
    ],
    tags: ['Lok Sabha', 'Kerala', 'Thiruvananthapuram', 'Congress', 'Author', 'Diplomacy', 'IT Committee'],
    verifiedAffidavit: true
  },
  {
    id: 's-jaishankar',
    name: 'Dr. S. Jaishankar',
    hindiName: 'डॉ. एस. जयशंकर',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Subrahmanyam_Jaishankar_in_2023.jpg/480px-Subrahmanyam_Jaishankar_in_2023.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'Union Minister of External Affairs',
    state: 'Gujarat',
    constituency: 'Rajya Sabha (Gujarat)',
    house: 'Rajya Sabha',
    age: 70,
    dateOfBirth: '09 January 1955',
    birthPlace: 'New Delhi',
    education: 'Ph.D. in International Relations & M.Phil., JNU; M.Sc. in Chemistry, St. Stephen’s College',
    profession: 'Career Diplomat, Foreign Policy Strategist',
    spouse: 'Kyoko Jaishankar',
    bio: 'Subrahmanyam Jaishankar is an Indian diplomat and politician who has served as the Minister of External Affairs since 2019. He previously served as Foreign Secretary of India (2015-2018), Ambassador to the United States (2013-2015), and Ambassador to China (2009-2013). He is widely credited with reshaping India’s multi-aligned, proactive foreign policy doctrine.',
    keyStances: [
      'Strategic autonomy and multi-alignment in an era of multipolar geopolitical friction',
      'Quad partnership and Indo-Pacific maritime freedom of navigation',
      'Integration of Global South interests into G20 and multilateral institutions',
      'Economic diplomacy: Securing energy imports and critical mineral supply chains',
      'Rapid evacuation operations for Indian diaspora in conflict zones (Operation Ganga, Kaveri, Ajay)'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/DrSJaishankar',
      facebook: 'https://facebook.com/DrSJaishankar',
      instagram: 'https://instagram.com/drs.jaishankar',
      wikipedia: 'https://en.wikipedia.org/wiki/S._Jaishankar'
    },
    parliamentaryRecord: {
      attendancePercent: 97,
      nationalAvgAttendance: 79,
      debatesCount: 72,
      questionsAsked: 0,
      privateMemberBills: 0,
      committeeMemberships: [
        'Cabinet Committee on Security (CCS)',
        'Cabinet Committee on Political Affairs',
        'Parliamentary Consultative Committee on External Affairs'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.2,
      utilizationPercent: 96.8,
      completedProjects: 110,
      ongoingProjects: 10,
      topProjects: [
        { title: 'Adopted Model Smart Anganwadis and Health Centers in Narmada District', costCr: 4.8, sector: 'Healthcare', status: 'Completed', location: 'Narmada, Gujarat' },
        { title: 'Tribal Solar Mini-Grid Electrification & Water Purification Plants', costCr: 4.2, sector: 'Water & Sanitation', status: 'Completed', location: 'Chhota Udepur' },
        { title: 'Skill Development Center for International Migrant Workers', costCr: 3.6, sector: 'Education', status: 'Completed', location: 'Surat & Vadodara' },
        { title: 'Rural Community Road Links and Concrete Check Dams', costCr: 3.0, sector: 'Roads & Infrastructure', status: 'In Progress', location: 'Bharuch District' }
      ]
    },
    assets: {
      movableCr: 12.8,
      immovableCr: 6.5,
      totalCr: 19.3,
      liabilitiesCr: 0.0,
      declarationYear: 2024,
      history: [
        { year: 2019, totalCr: 15.2, movableCr: 9.8, immovableCr: 5.4, source: 'Rajya Sabha Affidavit' },
        { year: 2024, totalCr: 19.3, movableCr: 12.8, immovableCr: 6.5, source: 'Rajya Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 0,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: []
    },
    majorInitiatives: [
      { title: 'India’s G20 Presidency & New Delhi Declaration', year: '2023', category: 'Diplomacy', description: 'Achieved 100% consensus on New Delhi Leaders’ Declaration and secured African Union permanent G20 membership.', impact: 'Solidified India’s position as the leading bridge between developed and developing nations.' },
      { title: 'Diaspora Evacuation Doctrine (Operations Ganga, Kaveri & Ajay)', year: '2022-2024', category: 'Citizen Safety', description: 'Coordinated direct emergency evacuation flights rescuing over 30,000 Indian citizens from Ukraine, Sudan, and Israel.', impact: 'Established rapid-response institutional SOPs for overseas Indian emergencies.' },
      { title: 'India-Middle East-Europe Economic Corridor (IMEC)', year: '2023', category: 'Geopolitics & Trade', description: 'Co-founded the historic multi-modal ship-to-rail transit network connecting India to Europe via Gulf states.', impact: 'Provides high-speed commercial transit corridor alternative to Suez maritime chokepoints.' }
    ],
    politicalTimeline: [
      { year: '2015-2018', role: 'Foreign Secretary of India', achievement: 'Resolved Doklam standoff with China and concluded Civil Nuclear cooperation with Japan.' },
      { year: '2019', role: 'Appointed Union Minister of External Affairs', achievement: 'First career diplomat to be elevated directly to Cabinet rank for MEA.' },
      { year: '2019 & 2024', role: 'Rajya Sabha MP (Gujarat)', achievement: 'Elected twice to Upper House representing Gujarat.' },
      { year: '2024-Present', role: 'Cabinet Minister for External Affairs (2nd Term)', achievement: 'Reappointed to lead India’s foreign policy in third NDA term.' }
    ],
    news: [
      { id: 'sj-1', title: 'Jaishankar meets Quad foreign ministers to review maritime domain awareness initiative', source: 'The Indian Express', date: '18 Feb 2025', sentiment: 'positive', summary: 'Highlighted satellite tracking cooperation to combat illegal fishing and humanitarian disasters across the Indian Ocean.' },
      { id: 'sj-2', title: 'External Affairs Minister delivers keynote on "The India Way" in Munich Security Conference', source: 'Reuters', date: '01 Feb 2025', sentiment: 'positive', summary: 'Articulated India’s stance on energy security, plurilateral alliances, and international law.' }
    ],
    tags: ['Union Minister', 'External Affairs', 'Rajya Sabha', 'Gujarat', 'Diplomacy', 'Foreign Policy', 'G20'],
    verifiedAffidavit: true
  },
  {
    id: 'akhilesh-yadav',
    name: 'Akhilesh Yadav',
    hindiName: 'अखिलेश यादव',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Akhilesh_Yadav_in_2022.jpg/480px-Akhilesh_Yadav_in_2022.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'Samajwadi Party',
    partyAbbr: 'SP',
    partyColor: '#dc2626',
    alliance: 'INDIA',
    currentRole: 'Leader of Samajwadi Party in Lok Sabha',
    state: 'Uttar Pradesh',
    constituency: 'Kannauj',
    house: 'Lok Sabha',
    age: 51,
    dateOfBirth: '01 July 1973',
    birthPlace: 'Saifai, Etawah, Uttar Pradesh',
    education: 'Bachelor’s in Civil Environmental Engineering, JSS Mysore; Master’s in Environmental Engineering, University of Sydney, Australia',
    profession: 'Agriculturist, Engineer, Politician',
    spouse: 'Dimple Yadav',
    bio: 'Akhilesh Yadav is an Indian politician who served as the 20th Chief Minister of Uttar Pradesh from 2012 to 2017. Becoming the youngest person to hold the office at the age of 38, he is the President of Samajwadi Party and Member of Parliament representing Kannauj. In the 2024 General Elections, he led Samajwadi Party to its historic best parliamentary tally of 37 Lok Sabha seats in Uttar Pradesh.',
    keyStances: [
      'Pichhda, Dalit, Alpsankhyak (PDA) social justice coalition empowerment',
      'Caste Census and proportional representation in public employment',
      'Modern expressway and agro-logistics mandis for farm produce (Agra-Lucknow Expressway model)',
      'Abolition of Agnipath short-term military recruitment scheme in favor of permanent forces',
      'Laptop distribution and digital infrastructure funding for government colleges'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/yadavakhilesh',
      facebook: 'https://facebook.com/yadavakhilesh',
      instagram: 'https://instagram.com/yadavakhilesh',
      wikipedia: 'https://en.wikipedia.org/wiki/Akhilesh_Yadav'
    },
    parliamentaryRecord: {
      attendancePercent: 92,
      nationalAvgAttendance: 79,
      debatesCount: 46,
      questionsAsked: 18,
      privateMemberBills: 0,
      committeeMemberships: [
        'Standing Committee on Energy',
        'Parliamentary Consultative Committee on Civil Aviation'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.5,
      utilizationPercent: 94.0,
      completedProjects: 112,
      ongoingProjects: 14,
      topProjects: [
        { title: 'Kannauj Perfume & Essential Oil Extraction Technology Center', costCr: 4.8, sector: 'Rural Development', status: 'Completed', location: 'Kannauj City' },
        { title: 'District Veterinary Specialty Center and Cold Chain Milk Chillers', costCr: 3.9, sector: 'Rural Development', status: 'Completed', location: 'Tirwa & Chhibramau' },
        { title: 'Rural Community High Schools Solar Powered Computer Labs', costCr: 3.4, sector: 'Education', status: 'Completed', location: 'Talgram' }
      ]
    },
    assets: {
      movableCr: 12.8,
      immovableCr: 30.5,
      totalCr: 43.3,
      liabilitiesCr: 0.85,
      declarationYear: 2024,
      history: [
        { year: 2012, totalCr: 8.5, movableCr: 3.1, immovableCr: 5.4, source: 'UP Assembly MLC Affidavit' },
        { year: 2019, totalCr: 37.7, movableCr: 9.8, immovableCr: 27.9, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 43.3, movableCr: 12.8, immovableCr: 30.5, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 3,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'ay-case-1',
          caseNumber: 'Crime No. 412/2020',
          court: 'Special MP/MLA Court, Lucknow',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 188', 'IPC 269', 'IPC 270'],
          bnsEquivalent: 'BNS Section 223, BNS Section 271',
          description: 'FIR registered during opposition protest demonstration in support of national farmers agitation and against farm laws during lockdown.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2020,
          isSerious: false,
          summaryTag: 'Farmers Protest & Kisan Yatra Agitation',
          tags: ['Political Protest & Agitation', 'Current', 'Stayed by High Court', 'Farmers Agitation', 'Non-Serious']
        },
        {
          id: 'ay-case-2',
          caseNumber: 'FIR No. 104/2008 (Youth Demonstration)',
          court: 'CJM Court, Etawah',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 126',
          description: 'Youth wing road blockade and demonstration protesting student scholarship delays and fee hikes.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2008,
          yearResolved: 2016,
          isSerious: false,
          summaryTag: 'Etawah Student Scholarship Demonstration',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Student Movement']
        },
        {
          id: 'ay-case-3',
          caseNumber: 'Defamation Case No. 89/2022',
          court: 'ACJM Court, Rampur',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Defamation complaint regarding remarks made at a political press conference in Rampur.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2022,
          isSerious: false,
          summaryTag: 'Press Conference Speech Complaint',
          tags: ['Defamation & Speech', 'Current', 'Stayed by High Court', 'Non-Serious']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Agra-Lucknow 6-Lane Greenfield Expressway', year: '2016', category: 'Infrastructure', description: 'Built India’s longest 302-km access-controlled greenfield expressway in record 23 months with dedicated emergency fighter jet landing strip.', impact: 'Reduced travel time between Lucknow and Delhi from 12 hours to under 6 hours.' },
      { title: 'Statewide Free Laptop Scheme for 1.8 Million Students', year: '2012-2016', category: 'Education Technology', description: 'Distributed 18 lakh laptops to matriculate and intermediate passing students from low-income families.', impact: 'Catalyzed early computer literacy and digital workforce skills across semi-urban Uttar Pradesh.' },
      { title: 'UP Dial 100 / 112 Modern Police Emergency Response System', year: '2016', category: 'Governance', description: 'Established state-of-the-art centralized emergency response call center and 4,800 dedicated GPS-tracked emergency vehicles.', impact: 'Reduced emergency police response time from hours to under 15 minutes statewide.' }
    ],
    politicalTimeline: [
      { year: '2000', role: 'Elected MP Kannauj (By-election)', achievement: 'Won debut election at age 26; won Kannauj three consecutive terms.' },
      { year: '2012-2017', role: 'Chief Minister of Uttar Pradesh', achievement: 'Became youngest CM in UP history at age 38, steering massive infrastructure projects.' },
      { year: '2024-Present', role: 'Leader of Samajwadi Party in Lok Sabha', achievement: 'Led SP to historic 37 Lok Sabha seats making it third-largest party in Parliament.' }
    ],
    news: [
      { id: 'ay-n1', title: 'Akhilesh Yadav demands comprehensive socio-economic Caste Census in Parliament', source: 'The Indian Express', date: '18 Feb 2025', sentiment: 'positive', summary: 'Emphasized constitutional mandate for proportionate reservation and targeted budgetary support.' }
    ],
    tags: ['Lok Sabha', 'Uttar Pradesh', 'Kannauj', 'Samajwadi Party', 'Former Chief Minister', 'INDIA Bloc'],
    verifiedAffidavit: true
  },
  {
    id: 'mahua-moitra',
    name: 'Mahua Moitra',
    hindiName: 'महुआ मोइत्रा',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Mahua_Moitra_in_2020.jpg/480px-Mahua_Moitra_in_2020.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'All India Trinamool Congress',
    partyAbbr: 'AITC',
    partyColor: '#059669',
    alliance: 'INDIA',
    currentRole: 'Member of Parliament (Krishnanagar)',
    state: 'West Bengal',
    constituency: 'Krishnanagar',
    house: 'Lok Sabha',
    age: 50,
    dateOfBirth: '12 October 1974',
    birthPlace: 'Kolkata, West Bengal',
    education: 'B.A. in Economics and Mathematics, Mount Holyoke College, Massachusetts, USA',
    profession: 'Former Investment Banker (Vice President, JPMorgan Chase), Politician',
    spouse: 'Unmarried',
    bio: 'Mahua Moitra is an Indian politician and former investment banker serving as the Member of Parliament for Krishnanagar since 2019. Prior to joining politics, she was a Vice President at JPMorgan Chase in London and New York. She served as an MLA in the West Bengal Legislative Assembly from Karimpur (2016-2019) before being elected to the 17th and 18th Lok Sabha.',
    keyStances: [
      'Constitutional protections against crony capitalism and regulatory capture',
      'Protection of parliamentary privilege and robust committee scrutiny',
      'Preservation of federalism and devolution of GST compensation to states',
      'Artisanal and textile weaver welfare in Nadia and Bengal delta districts',
      'Civil liberties, free speech, and right to digital privacy'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/MahuaMoitra',
      instagram: 'https://instagram.com/mahuamoitra',
      wikipedia: 'https://en.wikipedia.org/wiki/Mahua_Moitra'
    },
    parliamentaryRecord: {
      attendancePercent: 86,
      nationalAvgAttendance: 79,
      debatesCount: 58,
      questionsAsked: 210,
      privateMemberBills: 2,
      committeeMemberships: [
        'Standing Committee on Communications and Information Technology',
        'Joint Committee on Data Protection'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.1,
      utilizationPercent: 92.4,
      completedProjects: 96,
      ongoingProjects: 11,
      topProjects: [
        { title: 'Nadia Handloom Weaver Common Facility & Solar Loom Hub', costCr: 4.5, sector: 'Rural Development', status: 'Completed', location: 'Shantipur & Phulia' },
        { title: 'Krishnanagar Maternity Hospital Specialized NICU Facility', costCr: 4.1, sector: 'Healthcare', status: 'Completed', location: 'Krishnanagar Sadar' },
        { title: 'Rural Secondary School STEM Labs and Smart Classrooms', costCr: 3.2, sector: 'Education', status: 'Completed', location: 'Karimpur & Tehatta' }
      ]
    },
    assets: {
      movableCr: 3.55,
      immovableCr: 0.0,
      totalCr: 3.55,
      liabilitiesCr: 0.0,
      declarationYear: 2024,
      history: [
        { year: 2016, totalCr: 2.5, movableCr: 2.5, immovableCr: 0.0, source: 'WB Assembly Affidavit' },
        { year: 2019, totalCr: 2.64, movableCr: 2.64, immovableCr: 0.0, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 3.55, movableCr: 3.55, immovableCr: 0.0, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 2,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'mm-case-1',
          caseNumber: 'C.C. No. 451/2019 (Defamation Complaint)',
          court: 'Special MP/MLA Court, Rouse Avenue, New Delhi',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 499', 'IPC 500'],
          bnsEquivalent: 'BNS Section 356',
          description: 'Criminal defamation cross-complaint filed by a media channel editor over public statements made outside television studios regarding journalistic impartiality.',
          status: 'Cognizance Taken',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2019,
          isSerious: false,
          summaryTag: 'Media Channel Defamation Cross-Complaint',
          tags: ['Defamation & Speech', 'Current', 'Cognizance Taken', 'Free Speech', 'Non-Serious']
        },
        {
          id: 'mm-case-2',
          caseNumber: 'Lokpal Complaint Inquiry Reference',
          court: 'Lokpal of India / High Court of Delhi (Proceedings Under Scrutiny)',
          courtLevel: 'High Court',
          ipcSections: ['Prevention of Corruption Act Section 13(1)(d) Inquiry'],
          description: 'Preliminary inquiry proceedings initiated following ethics committee reference regarding parliamentary login credential sharing. High Court and Special Court hearing procedural challenges.',
          status: 'Under Investigation',
          temporalStatus: 'Current',
          caseType: 'Corruption & Public Integrity',
          yearFiled: 2023,
          isSerious: false,
          summaryTag: 'Parliamentary Login Credential Scrutiny',
          tags: ['Corruption & Public Integrity', 'Current', 'Under Investigation', 'Parliamentary Privilege', 'Non-Serious']
        },
        {
          id: 'mm-case-3',
          caseNumber: 'FIR No. 98/2018 (Karimpur Citizen Demonstration)',
          court: 'ACJM Court, Tehatta, Nadia, West Bengal',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 126',
          description: 'Grassroots road demonstration demanding repair of flooded border arterial culverts and rural bridge rebuilding in Karimpur constituency.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2018,
          yearResolved: 2021,
          isSerious: false,
          summaryTag: 'Karimpur Rural Bridge Citizen Demonstration',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Civic Demonstration']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Landmark Speeches on Constitutional Freedom and Electoral Bonds Scrutiny', year: '2019-2023', category: 'Parliamentary', description: 'Delivered widely cited speeches dissecting economic concentration, federal fiscal autonomy, and dark money in political funding.', impact: 'Triggered national debates culminating in Supreme Court striking down Electoral Bonds Scheme.' },
      { title: 'Re-election from Krishnanagar with Increased Margin in 2024', year: '2024', category: 'Electoral', description: 'Re-elected to 18th Lok Sabha from Krishnanagar constituency with a 56,000+ vote victory margin.', impact: 'Vindicated grassroots mandate across Nadia district rural assemblies.' }
    ],
    politicalTimeline: [
      { year: '2009-2010', role: 'Joined Politics from Banking', achievement: 'Quit VP position at JPMorgan in London to enter Indian public service.' },
      { year: '2016-2019', role: 'MLA Karimpur, West Bengal', achievement: 'Won Nadia border constituency Karimpur with substantial margin.' },
      { year: '2019 & 2024', role: 'Member of Parliament, Krishnanagar', achievement: 'Elected twice to Lok Sabha representing Trinamool Congress.' }
    ],
    news: [
      { id: 'mm-n1', title: 'Mahua Moitra champions rural artisan GI tags and direct export subsidies for Nadia handlooms', source: 'The Telegraph', date: '12 Feb 2025', sentiment: 'positive', summary: 'Addressed the House on textile export freight subsidies and handloom credit waivers.' }
    ],
    tags: ['Lok Sabha', 'West Bengal', 'Krishnanagar', 'Trinamool Congress', 'INDIA Bloc', 'Former Banker'],
    verifiedAffidavit: true
  },
  {
    id: 'asaduddin-owaisi',
    name: 'Asaduddin Owaisi',
    hindiName: 'असदुद्दीन ओवैसी',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Asaduddin_Owaisi_2021.jpg/480px-Asaduddin_Owaisi_2021.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'All India Majlis-e-Ittehadul Muslimeen',
    partyAbbr: 'AIMIM',
    partyColor: '#047857',
    alliance: 'Others',
    currentRole: 'President, AIMIM & Member of Parliament (Hyderabad)',
    state: 'Telangana',
    constituency: 'Hyderabad',
    house: 'Lok Sabha',
    age: 55,
    dateOfBirth: '13 May 1969',
    birthPlace: 'Hyderabad, Telangana',
    education: 'Barrister-at-Law, Lincoln’s Inn, London; B.A., Nizam College, Osmania University',
    profession: 'Barrister, Politician',
    spouse: 'Farheen Owaisi',
    bio: 'Asaduddin Owaisi is an Indian barrister and politician who has represented Hyderabad in the Lok Sabha for five consecutive terms since 2004. He is the President of the All India Majlis-e-Ittehadul Muslimeen (AIMIM). He was awarded the Sansad Ratna Award in 2014 for outstanding performance in parliamentary debates.',
    keyStances: [
      'Constitutional rights, minority protections, and affirmative action for backward Muslims',
      'Modern secular education and medical colleges in minority-concentrated districts',
      'Repeal of UAPA stringent provisions and protection of civil liberties',
      'Urban modernization, old-city infrastructure, and heritage preservation in Hyderabad',
      'Independent political voice outside traditional national coalitions'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/asadowaisi',
      facebook: 'https://facebook.com/AsaduddinOwaisi',
      instagram: 'https://instagram.com/asadowaisi',
      wikipedia: 'https://en.wikipedia.org/wiki/Asaduddin_Owaisi'
    },
    parliamentaryRecord: {
      attendancePercent: 93,
      nationalAvgAttendance: 79,
      debatesCount: 248,
      questionsAsked: 680,
      privateMemberBills: 8,
      committeeMemberships: [
        'Standing Committee on Home Affairs',
        'Parliamentary Consultative Committee for Ministry of External Affairs'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.2,
      utilizationPercent: 96.8,
      completedProjects: 154,
      ongoingProjects: 9,
      topProjects: [
        { title: 'Hyderabad Old City Automated Underground Drainage & Water Network', costCr: 4.8, sector: 'Water & Sanitation', status: 'Completed', location: 'Charminar & Bahadurpura' },
        { title: 'Deccan Dialysis & Free Renal Diagnostic Center', costCr: 4.2, sector: 'Healthcare', status: 'Completed', location: 'Darussalam' },
        { title: 'Vocational Women Skill Centers and Urdu-English Digital Libraries', costCr: 3.5, sector: 'Education', status: 'Completed', location: 'Malakpet & Yakutpura' }
      ]
    },
    assets: {
      movableCr: 2.8,
      immovableCr: 16.9,
      totalCr: 19.7,
      liabilitiesCr: 4.3,
      declarationYear: 2024,
      history: [
        { year: 2004, totalCr: 0.39, movableCr: 0.12, immovableCr: 0.27, source: 'Lok Sabha Affidavit' },
        { year: 2009, totalCr: 4.0, movableCr: 0.9, immovableCr: 3.1, source: 'Lok Sabha Affidavit' },
        { year: 2014, totalCr: 4.9, movableCr: 1.1, immovableCr: 3.8, source: 'Lok Sabha Affidavit' },
        { year: 2019, totalCr: 13.9, movableCr: 1.7, immovableCr: 12.2, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 19.7, movableCr: 2.8, immovableCr: 16.9, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 5,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'ao-case-1',
          caseNumber: 'CC No. 41/2005 (Medak District Agitation)',
          court: 'Special Judicial Magistrate of First Class, Sangareddy',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 147', 'IPC 153A', 'IPC 186', 'IPC 353'],
          bnsEquivalent: 'BNS Section 189, BNS Section 196, BNS Section 132',
          description: 'Agitation against district administration road widening and demolition drive without prior rehabilitation notices in Muttangi village, Medak district.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2005,
          yearResolved: 2016,
          isSerious: false,
          summaryTag: '2005 Medak Demolition Demonstration (Acquitted)',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Public Demonstration']
        },
        {
          id: 'ao-case-2',
          caseNumber: 'FIR No. 24/2016 (Election Speech Complaint)',
          court: 'Special Sessions Court for MP/MLA Cases, Hyderabad',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 153A', 'IPC 188', 'IPC 505'],
          bnsEquivalent: 'BNS Section 196, BNS Section 223, BNS Section 353',
          description: 'Complaint regarding campaign statements made during municipal corporation election rallies in Hyderabad.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Defamation & Speech',
          yearFiled: 2016,
          isSerious: false,
          summaryTag: 'GHMC Election Campaign Rally Speech',
          tags: ['Defamation & Speech', 'Current', 'Stayed by High Court', 'Campaign Speech', 'Non-Serious']
        },
        {
          id: 'ao-case-3',
          caseNumber: 'Crime No. 192/2020 (Section 144 Protest FIR)',
          court: 'Metropolitan Magistrate Court, Hyderabad',
          courtLevel: 'District & Sessions Court',
          ipcSections: ['IPC 188', 'IPC 269', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 271, BNS Section 126',
          description: 'Dharna demonstration and sit-in assembly protesting against Citizenship Amendment Act (CAA) without administrative assembly permission.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2020,
          yearResolved: 2023,
          isSerious: false,
          summaryTag: 'Hyderabad Anti-CAA Million March Protest',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Civil Rights Protest']
        },
        {
          id: 'ao-case-4',
          caseNumber: 'CC No. 18/2011 (Patancheru Sangareddy Agitation)',
          court: 'Special Judicial Magistrate of First Class, Sangareddy',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 188', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223, BNS Section 126',
          description: 'Public road blockade demonstration regarding urban pipeline laying and compensation for affected shopkeepers in Medak district.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2011,
          yearResolved: 2017,
          isSerious: false,
          summaryTag: 'Sangareddy Pipeline Civic Demonstration',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Civic Agitation']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Deccan College of Medical Sciences & Hospital Network', year: '2005-2024', category: 'Education & Health', description: 'Developed premier charitable tertiary care medical complex and nursing colleges providing free treatments to thousands of urban poor.', impact: 'Trained over 5,000 doctors and subsidized critical surgeries in Old Hyderabad.' },
      { title: 'Parliamentary Sansad Ratna Record', year: '2014-2024', category: 'Legislative Scrutiny', description: 'Consistently ranked among top 5 most active parliamentarians in India with over 680 questions and 240+ debates on constitutional legislation.', impact: 'Ensured high-level scrutiny on counter-terrorism, education, and social sector laws.' }
    ],
    politicalTimeline: [
      { year: '1994-2003', role: 'MLA Charminar (2 Terms)', achievement: 'Elected to Andhra Pradesh Legislative Assembly representing Charminar.' },
      { year: '2004-Present', role: 'Member of Parliament, Hyderabad (5 Terms)', achievement: 'Won five consecutive Lok Sabha terms with decisive majorities.' }
    ],
    news: [
      { id: 'ao-n1', title: 'Asaduddin Owaisi participates in Waqf Amendment Bill Joint Parliamentary Committee review', source: 'The Hindu', date: '19 Feb 2025', sentiment: 'neutral', summary: 'Submissions made regarding statutory protection of historic community endowments.' }
    ],
    tags: ['Lok Sabha', 'Telangana', 'Hyderabad', 'AIMIM', 'Barrister', 'Sansad Ratna'],
    verifiedAffidavit: true
  },
  {
    id: 'kanimozhi-karunanidhi',
    name: 'Kanimozhi Karunanidhi',
    hindiName: 'कनिमोझी करुणानिधि',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kanimozhi_Karunanidhi_2024.jpg/480px-Kanimozhi_Karunanidhi_2024.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'Dravida Munnetra Kazhagam',
    partyAbbr: 'DMK',
    partyColor: '#b91c1c',
    alliance: 'INDIA',
    currentRole: 'Deputy Leader, DMK in Lok Sabha & MP (Thoothukkudi)',
    state: 'Tamil Nadu',
    constituency: 'Thoothukkudi',
    house: 'Lok Sabha',
    age: 57,
    dateOfBirth: '05 January 1968',
    birthPlace: 'Chennai, Tamil Nadu',
    education: 'M.A. in Economics, Ethiraj College for Women, University of Madras',
    profession: 'Poet, Journalist, Politician',
    spouse: 'G. Aravindaan',
    bio: 'Kanimozhi Karunanidhi is an Indian politician, poet, and journalist serving as the Member of Parliament for Thoothukkudi since 2019 and Deputy Leader of DMK in Lok Sabha. She previously served two terms in the Rajya Sabha (2007-2019). Daughter of former Tamil Nadu Chief Minister M. Karunanidhi, she heads the DMK Women’s Wing and is an acclaimed Tamil literary figure.',
    keyStances: [
      'Social justice, federalism, and state rights in educational and tax policies',
      'Women’s rights, workplace safety, and gender equality legislation',
      'Industrial infrastructure, renewable wind corridors, and port modernization in Thoothukkudi',
      'Welfare of traditional coastal fishermen and international maritime safety pacts',
      'Protection of Tamil language, cultural autonomy, and opposition to linguistic imposition'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/KanimozhiDMK',
      facebook: 'https://facebook.com/KanimozhiKarunanidhi',
      instagram: 'https://instagram.com/kanimozhidmk',
      wikipedia: 'https://en.wikipedia.org/wiki/Kanimozhi'
    },
    parliamentaryRecord: {
      attendancePercent: 91,
      nationalAvgAttendance: 79,
      debatesCount: 114,
      questionsAsked: 320,
      privateMemberBills: 6,
      committeeMemberships: [
        'Standing Committee on Rural Development and Panchayati Raj (Chairperson)',
        'Consultative Committee for Ministry of Women and Child Development'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 24.1,
      utilizationPercent: 96.4,
      completedProjects: 142,
      ongoingProjects: 12,
      topProjects: [
        { title: 'Thoothukkudi VOC Port Seawater Desalination Drinking Water Plant', costCr: 4.8, sector: 'Water & Sanitation', status: 'Completed', location: 'Thoothukkudi Port' },
        { title: 'Fisherwomen Dry Fish Processing Modern Clean Sheds & Cold Chain', costCr: 3.9, sector: 'Rural Development', status: 'Completed', location: 'Tiruchendur & Kulasekharapatnam' },
        { title: 'Government Girls Model Higher Secondary Smart Digital Science Labs', costCr: 3.4, sector: 'Education', status: 'Completed', location: 'Kovilpatti' }
      ]
    },
    assets: {
      movableCr: 38.2,
      immovableCr: 19.1,
      totalCr: 57.3,
      liabilitiesCr: 0.12,
      declarationYear: 2024,
      history: [
        { year: 2007, totalCr: 8.9, movableCr: 4.5, immovableCr: 4.4, source: 'Rajya Sabha Affidavit' },
        { year: 2013, totalCr: 21.0, movableCr: 12.0, immovableCr: 9.0, source: 'Rajya Sabha Affidavit' },
        { year: 2019, totalCr: 30.3, movableCr: 21.8, immovableCr: 8.5, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 57.3, movableCr: 38.2, immovableCr: 19.1, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 2,
      seriousCases: 1,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'kk-case-1',
          caseNumber: 'CC No. 01/2011 (2G Spectrum Allocation Trial)',
          court: 'Special CBI Court, Patiala House Courts, New Delhi (CBI Appeal pending in Delhi HC)',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 120B', 'IPC 420', 'Prevention of Corruption Act Section 13(1)(d)'],
          bnsEquivalent: 'BNS Section 61, BNS Section 318',
          description: 'Special CBI Court comprehensive trial regarding allegations in 2G telecom spectrum licenses. In December 2017, the Special Court acquitted all accused noting lack of prosecutorial evidence.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Corruption & Public Integrity',
          yearFiled: 2011,
          yearResolved: 2017,
          isSerious: true,
          summaryTag: '2G Special CBI Court Trial (Acquitted Dec 2017)',
          tags: ['Corruption & Public Integrity', 'Previous', 'Disposed / Acquitted', 'Landmark Verdict', 'Serious Offence']
        },
        {
          id: 'kk-case-2',
          caseNumber: 'FIR No. 204/2018 (Sterlite Protest & Fishermen Agitation)',
          court: 'JMFC Court, Thoothukkudi',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 143', 'IPC 188', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223, BNS Section 126',
          description: 'Protest rally and demonstration standing in solidarity with local coastal citizens opposing environmental pollution in Thoothukkudi.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2018,
          yearResolved: 2022,
          isSerious: false,
          summaryTag: 'Thoothukkudi Environmental Solidarity Agitation',
          tags: ['Political Protest & Agitation', 'Previous', 'Discharged / Quashed', 'Environmental Protest']
        },
        {
          id: 'kk-case-3',
          caseNumber: 'Crime No. 412/2020 (Thoothukkudi Farm Laws Dharna)',
          court: 'Special MP/MLA Court, Tirunelveli / Madras High Court',
          courtLevel: 'High Court',
          ipcSections: ['IPC 143', 'IPC 188', 'IPC 269'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223, BNS Section 271',
          description: 'Peaceful opposition dharna in Thoothukkudi in solidarity with national farmers agitation against three farm laws. Stayed by Madras High Court.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2020,
          isSerious: false,
          summaryTag: 'Thoothukkudi Farmers Solidarity Dharna',
          tags: ['Political Protest & Agitation', 'Current', 'Stayed by High Court', 'Farmers Solidarity']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Chennai Sangamam & Tamil Cultural Revitalization', year: '2007-Present', category: 'Cultural Policy', description: 'Founded open-air classical and folk arts festival Chennai Sangamam, reviving forgotten rural Dalit and folk performance traditions.', impact: 'Created sustainable livelihoods and national platforms for 3,000+ rural folk artists.' },
      { title: 'Kulasekharapatnam ISRO Second Rocket Spaceport Clearing', year: '2020-2024', category: 'Industrial & Science', description: 'Advocated in Parliament and secured central approvals and land acquisition for India’s dedicated SSLV rocket launch port in Thoothukkudi district.', impact: 'Brought ₹1,000+ crore aerospace manufacturing ecosystem to Southern Tamil Nadu.' }
    ],
    politicalTimeline: [
      { year: '2007-2019', role: 'Member of Parliament (Rajya Sabha - 2 Terms)', achievement: 'Raised landmark legislation on women safety and transgender rights.' },
      { year: '2019 & 2024', role: 'Member of Parliament, Thoothukkudi (Lok Sabha)', achievement: 'Won by landslides in both terms with over 340,000 and 390,000 vote margins.' }
    ],
    news: [
      { id: 'kk-n1', title: 'Kanimozhi chairs Parliamentary panel reviewing MGNREGS wage disbursements and fund devolution', source: 'The Hindu', date: '15 Feb 2025', sentiment: 'positive', summary: 'Recommended indexing rural guaranteed wages to inflation and clearing state arrears.' }
    ],
    tags: ['Lok Sabha', 'Tamil Nadu', 'Thoothukkudi', 'DMK', 'INDIA Bloc', 'Women Welfare'],
    verifiedAffidavit: true
  },
  {
    id: 'tejasvi-surya',
    name: 'Tejasvi Surya',
    hindiName: 'तेजस्वी सूर्या',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tejasvi_Surya_official_portrait.jpg/480px-Tejasvi_Surya_official_portrait.jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'Bharatiya Janata Party',
    partyAbbr: 'BJP',
    partyColor: '#f97316',
    alliance: 'NDA',
    currentRole: 'President, BJYM & Member of Parliament (Bangalore South)',
    state: 'Karnataka',
    constituency: 'Bangalore South',
    house: 'Lok Sabha',
    age: 34,
    dateOfBirth: '16 November 1990',
    birthPlace: 'Bengaluru, Karnataka',
    education: 'B.A., LL.B., Bangalore Institute of Legal Studies',
    profession: 'Lawyer, Politician',
    spouse: 'Unmarried',
    bio: 'Tejasvi Surya is an Indian politician and lawyer serving as the Member of Parliament representing Bangalore South since 2019. He is the National President of the Bharatiya Janata Yuva Morcha (BJYM) since 2020. At age 28, he became one of the youngest elected MPs in the 17th Lok Sabha, and was re-elected in 2024 with a margin of over 277,000 votes.',
    keyStances: [
      'Suburban rail project, Namma Metro Phase 3, and urban decongestion for Bengaluru',
      'Startup and deep-tech innovation incentives, regulatory sandbox frameworks',
      'Youth entrepreneurship, skill development, and semiconductor design clusters',
      'Revival of Bengaluru lakes, rainwater recharge, and smart stormwater drains',
      'Cultural nationalism and youth mobilization across national universities'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/Tejasvi_Surya',
      facebook: 'https://facebook.com/tejasvisurya',
      instagram: 'https://instagram.com/tejasvisurya',
      wikipedia: 'https://en.wikipedia.org/wiki/Tejasvi_Surya'
    },
    parliamentaryRecord: {
      attendancePercent: 90,
      nationalAvgAttendance: 79,
      debatesCount: 88,
      questionsAsked: 280,
      privateMemberBills: 3,
      committeeMemberships: [
        'Standing Committee on Communications and Information Technology',
        'Standing Committee on Urban Development'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.8,
      utilizationPercent: 95.2,
      completedProjects: 118,
      ongoingProjects: 10,
      topProjects: [
        { title: 'Bengaluru South Dialysis Network & PM Jan Aushadhi Hubs (15 Centers)', costCr: 4.8, sector: 'Healthcare', status: 'Completed', location: 'Jayanagar & Padmanabhanagar' },
        { title: 'Suburban Rail Station Passenger Intermodal Link Shelters', costCr: 3.9, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Bengaluru South' },
        { title: 'Smart STEM Learning Labs in Government High Schools', costCr: 3.2, sector: 'Education', status: 'Completed', location: 'Basavanagudi & BTM Layout' }
      ]
    },
    assets: {
      movableCr: 1.25,
      immovableCr: 0.0,
      totalCr: 1.25,
      liabilitiesCr: 0.0,
      declarationYear: 2024,
      history: [
        { year: 2019, totalCr: 0.13, movableCr: 0.13, immovableCr: 0.0, source: 'Lok Sabha Affidavit' },
        { year: 2024, totalCr: 1.25, movableCr: 1.25, immovableCr: 0.0, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 3,
      seriousCases: 0,
      chargesFramed: 0,
      convicted: false,
      details: [
        {
          id: 'ts-case-1',
          caseNumber: 'Crime No. 238/2020 (Protest Assembly FIR)',
          court: 'Special Court for MP/MLA Cases, Bengaluru',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 143', 'IPC 188', 'IPC 341'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223, BNS Section 126',
          description: 'Rally and public demonstration organized during municipal political protest regarding town hall civic demonstrations.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2020,
          isSerious: false,
          summaryTag: 'Bengaluru Town Hall Youth Agitation',
          tags: ['Political Protest & Agitation', 'Current', 'Stayed by High Court', 'Youth Protest', 'Non-Serious']
        },
        {
          id: 'ts-case-2',
          caseNumber: 'FIR No. 91/2022 (Protest Gherao in Delhi)',
          court: 'CJM Court, New Delhi',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 188', 'IPC 353', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 132, BNS Section 126',
          description: 'BJYM demonstration and protest march outside Delhi Chief Minister residence regarding remarks on The Kashmir Files film.',
          status: 'Under Investigation',
          temporalStatus: 'Current',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2022,
          isSerious: false,
          summaryTag: 'BJYM Delhi Residence Demonstration',
          tags: ['Political Protest & Agitation', 'Current', 'Under Investigation', 'BJYM Protest', 'Non-Serious']
        },
        {
          id: 'ts-case-3',
          caseNumber: 'CC No. 112/2018 (Student Movement Agitation)',
          court: 'Metropolitan Magistrate Court, Bengaluru',
          courtLevel: 'District & Sessions Court',
          ipcSections: ['IPC 143', 'IPC 149'],
          bnsEquivalent: 'BNS Section 189, BNS Section 190',
          description: 'Student campus protest against state government policy on university examinations.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2018,
          yearResolved: 2021,
          isSerious: false,
          summaryTag: 'Bengaluru Student Examination Protest (Acquitted)',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Student Agitation']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Bengaluru Suburban Railway Project (BSRP) Fast-Tracking', year: '2019-2024', category: 'Urban Mobility', description: 'Coordinated inter-ministerial clearances and railway sanctioning for the 148-km Bengaluru Suburban Rail project.', impact: 'Unclogged key IT corridors connecting Baiyappanahalli, Chikkabanavara, and Heelalige.' },
      { title: 'PM Jan Aushadhi & Dialysis Saturation in Bangalore South', year: '2020-2024', category: 'Public Healthcare', description: 'Established 100+ low-cost generic drug kiosks and provided 25,000+ free dialysis sessions across Bangalore South constituencies.', impact: 'Saved over ₹40 crore out-of-pocket healthcare expenses for middle and lower-income families.' }
    ],
    politicalTimeline: [
      { year: '2019', role: 'Elected MP Bangalore South (1st Term)', achievement: 'Elected at age 28 with 3.3 lakh vote margin, succeeding Ananth Kumar.' },
      { year: '2020-Present', role: 'National President, BJYM', achievement: 'Headed BJP’s national youth wing across all Indian states.' },
      { year: '2024', role: 'Re-elected MP Bangalore South (2nd Term)', achievement: 'Secured second term with massive 277,000+ vote margin.' }
    ],
    news: [
      { id: 'ts-n1', title: 'Tejasvi Surya pushes for AI Innovation Sandboxes and Semiconductor Design Hub in Bengaluru', source: 'Deccan Herald', date: '16 Feb 2025', sentiment: 'positive', summary: 'Pushed for tax rationalization and municipal fiber connectivity for hardware startups.' }
    ],
    tags: ['Lok Sabha', 'Karnataka', 'Bangalore South', 'BJP', 'BJYM President', 'NDA', 'Youth Leader'],
    verifiedAffidavit: true
  },
  {
    id: 'chandrashekhar-azad',
    name: 'Chandrashekhar Azad',
    hindiName: 'चन्द्रशेखर आज़ाद "रावण"',
    photo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan_(cropped).jpg',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    party: 'Azad Samaj Party (Kanshi Ram)',
    partyAbbr: 'ASP-KR',
    partyColor: '#1d4ed8',
    alliance: 'Others',
    currentRole: 'President, ASP(KR) & Member of Parliament (Nagina)',
    state: 'Uttar Pradesh',
    constituency: 'Nagina',
    house: 'Lok Sabha',
    age: 38,
    dateOfBirth: '03 December 1986',
    birthPlace: 'Ghadkoli, Saharanpur, Uttar Pradesh',
    education: 'LL.B., H.N.B. Garhwal University; B.L.S.',
    profession: 'Lawyer, Activist, Politician',
    spouse: 'Vandana Azad',
    bio: 'Chandrashekhar Azad (popularly known as "Ravan") is an Indian politician, lawyer, and social activist who serves as the Member of Parliament for Nagina (UP). He is the co-founder of the Bhim Army and National President of the Azad Samaj Party (Kanshi Ram). He won his debut parliamentary election in 2024 by over 151,000 votes, running as an independent third-front voice.',
    keyStances: [
      'Constitutional protection of SC/ST/OBC reservations against sub-classification dilution',
      'Strict enforcement of SC/ST (Prevention of Atrocities) Act and special fast-track courts',
      'Free quality government education and free hostels for marginalized students',
      'Agro-based employment and fair sugarcane MSP payments for Western UP farmers',
      'Abolition of contract labor in sanitation, healthcare, and public sector enterprises'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/BhimArmyChief',
      facebook: 'https://facebook.com/BhimArmyChiefOfficial',
      instagram: 'https://instagram.com/bhimarmychief',
      wikipedia: 'https://en.wikipedia.org/wiki/Chandrashekhar_Azad_Ravan'
    },
    parliamentaryRecord: {
      attendancePercent: 95,
      nationalAvgAttendance: 79,
      debatesCount: 38,
      questionsAsked: 64,
      privateMemberBills: 2,
      committeeMemberships: [
        'Standing Committee on Social Justice and Empowerment',
        'Committee on Welfare of Scheduled Castes and Scheduled Tribes'
      ]
    },
    mplads: {
      allocatedCr: 25.0,
      spentCr: 23.4,
      utilizationPercent: 93.6,
      completedProjects: 88,
      ongoingProjects: 14,
      topProjects: [
        { title: 'Dr. B.R. Ambedkar Modern Youth E-Library & Skill Hub', costCr: 4.6, sector: 'Education', status: 'Completed', location: 'Nagina City' },
        { title: 'Rural Community Health Dispensaries and Mobile Ambulance Vans', costCr: 4.0, sector: 'Healthcare', status: 'Completed', location: 'Dhampur & Najibabad' },
        { title: 'Sugarcane Agro-Farm Link Bitumen Roads (32 Villages)', costCr: 3.5, sector: 'Roads & Infrastructure', status: 'Completed', location: 'Nehtaur & Afzalgarh' }
      ]
    },
    assets: {
      movableCr: 0.42,
      immovableCr: 0.35,
      totalCr: 0.77,
      liabilitiesCr: 0.05,
      declarationYear: 2024,
      history: [
        { year: 2022, totalCr: 0.35, movableCr: 0.15, immovableCr: 0.20, source: 'UP Assembly Affidavit' },
        { year: 2024, totalCr: 0.77, movableCr: 0.42, immovableCr: 0.35, source: 'Lok Sabha Affidavit' }
      ]
    },
    criminalRecords: {
      totalCases: 12,
      seriousCases: 2,
      chargesFramed: 1,
      convicted: false,
      details: [
        {
          id: 'ca-case-1',
          caseNumber: 'FIR No. 209/2019 (Jama Masjid CAA Protest)',
          court: 'Special MP/MLA Court, Tis Hazari Courts, Delhi',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 147', 'IPC 148', 'IPC 188', 'IPC 353', 'IPC 427'],
          bnsEquivalent: 'BNS Section 189, BNS Section 223, BNS Section 132, BNS Section 324',
          description: 'Anti-CAA peaceful assembly outside Jama Masjid Delhi in December 2019. Sessions Court granted bail observing that reading the Constitution in public is a democratic right.',
          status: 'Stayed by High Court',
          temporalStatus: 'Current',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2019,
          isSerious: false,
          summaryTag: 'Jama Masjid Anti-CAA Democratic Reading',
          tags: ['Political Protest & Agitation', 'Current', 'Stayed by High Court', 'Civil Rights Protest', 'Non-Serious']
        },
        {
          id: 'ca-case-2',
          caseNumber: 'Crime No. 124/2017 (Saharanpur Clashes)',
          court: 'Special MP/MLA Court, Saharanpur',
          courtLevel: 'Special MP/MLA Court',
          ipcSections: ['IPC 147', 'IPC 148', 'IPC 153A', 'IPC 307', 'IPC 353'],
          bnsEquivalent: 'BNS Section 189, BNS Section 196, BNS Section 109, BNS Section 132',
          description: 'Agitation following Shabbirpur village caste atrocities in Saharanpur. NSA charges subsequently revoked by High Court; trial proceedings pending.',
          status: 'Under Investigation',
          temporalStatus: 'Current',
          caseType: 'Public Order & Assembly',
          yearFiled: 2017,
          isSerious: true,
          summaryTag: 'Saharanpur Bhim Army Agitation (2017)',
          tags: ['Public Order & Assembly', 'Current', 'Under Trial', 'Serious Offence', 'Dalit Rights']
        },
        {
          id: 'ca-case-3',
          caseNumber: 'Crime No. 340/2021 (Hathras Solidarity Agitation)',
          court: 'ACJM Court, Hathras',
          courtLevel: 'CJM / JMFC',
          ipcSections: ['IPC 188', 'IPC 269', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 271, BNS Section 126',
          description: 'Road blockade and peaceful dharna when attempting to meet the victim family in Hathras during administrative restrictions.',
          status: 'Disposed / Acquitted',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2021,
          yearResolved: 2023,
          isSerious: false,
          summaryTag: 'Hathras Justice Solidarity Agitation (Acquitted)',
          tags: ['Political Protest & Agitation', 'Previous', 'Disposed / Acquitted', 'Human Rights Protest']
        },
        {
          id: 'ca-case-4',
          caseNumber: 'Crime No. 22/2020 (Aligarh University Agitation)',
          court: 'Allahabad High Court, Prayagraj',
          courtLevel: 'High Court',
          ipcSections: ['IPC 188', 'IPC 143', 'IPC 341'],
          bnsEquivalent: 'BNS Section 223, BNS Section 189, BNS Section 126',
          description: 'Demonstration outside Aligarh Muslim University during student civil rights campaign. High Court quashed the criminal proceedings.',
          status: 'Discharged / Quashed',
          temporalStatus: 'Previous',
          caseType: 'Political Protest & Agitation',
          yearFiled: 2020,
          yearResolved: 2022,
          isSerious: false,
          summaryTag: 'Aligarh Student Solidarity Demonstration',
          tags: ['Political Protest & Agitation', 'Previous', 'Discharged / Quashed', 'Civil Rights Protest']
        }
      ]
    },
    majorInitiatives: [
      { title: 'Bhim Army Free Pathshalas (Over 350 Village Schools)', year: '2015-Present', category: 'Education', description: 'Established community-funded evening tuition centers and coaching schools for underprivileged children in Western UP.', impact: 'Educated over 25,000 first-generation school students.' },
      { title: 'Nagina Parliamentary Victory as Third-Front Voice', year: '2024', category: 'Electoral', description: 'Won Nagina Lok Sabha seat defeating candidates of both major national and regional alliances by 1.51 lakh votes.', impact: 'Established independent dalit-bahujan grassroots parliamentary voice in 18th Lok Sabha.' }
    ],
    politicalTimeline: [
      { year: '2015', role: 'Co-founded Bhim Army', achievement: 'Organized grassroots youth mobilization for constitutional rights.' },
      { year: '2020', role: 'Founded Azad Samaj Party (Kanshi Ram)', achievement: 'Launched political party to contest assembly and general elections.' },
      { year: '2024-Present', role: 'Member of Parliament, Nagina', achievement: 'Elected to Lok Sabha in historic independent campaign.' }
    ],
    news: [
      { id: 'ca-n1', title: 'Chandrashekhar Azad introduces Private Member Bill for reservation in higher judiciary', source: 'The Indian Express', date: '14 Feb 2025', sentiment: 'positive', summary: 'Proposed constitutional amendment for representative representation in High Courts and Supreme Court.' }
    ],
    tags: ['Lok Sabha', 'Uttar Pradesh', 'Nagina', 'Azad Samaj Party', 'Bhim Army', 'Civil Rights', 'Lawyer'],
    verifiedAffidavit: true
  }
];

// Combine all 543 Lok Sabha MPs with handwritten rich profiles
const synthesized543 = ALL_543_LOK_SABHA_CONSTITUENCIES.map((entry) =>
  synthesizeMPPolitician(entry, POLITICIANS_DATA)
);

const politicianMap = new Map<string, Politician>();

// First add synthesized profiles for all 543 seats
synthesized543.forEach((p) => {
  politicianMap.set(p.id, p);
});

// Overlay handwritten detailed profiles (including Rajya Sabha cabinet leaders)
POLITICIANS_DATA.forEach((p) => {
  politicianMap.set(p.id, p);
  if (p.constituency) {
    // Also match by state-constituency key to ensure exact overlay
    const slug = `${p.state.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${p.constituency.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    politicianMap.set(slug, p);
  }
});

export const ALL_543_POLITICIANS: Politician[] = Array.from(new Set(politicianMap.values()));

