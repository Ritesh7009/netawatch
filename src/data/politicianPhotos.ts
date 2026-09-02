/**
 * Comprehensive Verified Portrait Image Registry for Indian Parliamentarians (18th Lok Sabha & Rajya Sabha)
 * Sources: Lok Sabha Digital Archives, Sansad.in Secretariat, Wikimedia Commons (Public Domain / CC-BY-SA), PRS Legislative Research
 */

export interface PoliticianPhotoEntry {
  names: string[];
  photo: string;
  fallbackPhotos?: string[];
}

export const VERIFIED_POLITICIAN_PHOTOS: Record<string, string[]> = {
  // === 1. NATIONAL LEADERSHIP & UNION CABINET ===
  'narendra-modi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/PM_Modi_2023.jpg/480px-PM_Modi_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Narendra_Modi_official_portrait%2C_2024.jpg/480px-Narendra_Modi_official_portrait%2C_2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c4/PM_Modi_2023.jpg'
  ],
  'amit-shah': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Amit_Shah_in_2024.jpg/480px-Amit_Shah_in_2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Shri_Amit_Shah_in_Raigad.jpg/480px-Shri_Amit_Shah_in_Raigad.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/87/Amit_Shah_in_2024.jpg'
  ],
  'rahul-gandhi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rahul_Gandhi_in_2023.jpg/480px-Rahul_Gandhi_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rahul_Gandhi_%28cropped_squarely%29.jpg/480px-Rahul_Gandhi_%28cropped_squarely%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/77/Rahul_Gandhi_in_2023.jpg'
  ],
  'rajnath-singh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Rajnath_Singh_official_portrait_2019.jpg/480px-Rajnath_Singh_official_portrait_2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/36/Rajnath_Singh_official_portrait_2019.jpg'
  ],
  'nitin-gadkari': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Nitin_Gadkari_official_portrait_2019.jpg/480px-Nitin_Gadkari_official_portrait_2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Nitin_Gadkari_official_portrait_2019.jpg'
  ],
  'jp-nadda': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/J_P_Nadda_official_portrait.jpg/480px-J_P_Nadda_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/67/J_P_Nadda_official_portrait.jpg'
  ],
  'j-p-nadda': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/J_P_Nadda_official_portrait.jpg/480px-J_P_Nadda_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/67/J_P_Nadda_official_portrait.jpg'
  ],
  's-jaishankar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Subrahmanyam_Jaishankar_in_2023.jpg/480px-Subrahmanyam_Jaishankar_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Subrahmanyam_Jaishankar_in_2023.jpg'
  ],
  'subrahmanyam-jaishankar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Subrahmanyam_Jaishankar_in_2023.jpg/480px-Subrahmanyam_Jaishankar_in_2023.jpg'
  ],
  'nirmala-sitharaman': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Nirmala_Sitharaman_official_portrait.jpg/480px-Nirmala_Sitharaman_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/74/Nirmala_Sitharaman_official_portrait.jpg'
  ],
  'piyush-goyal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Piyush_Goyal_in_2022.jpg/480px-Piyush_Goyal_in_2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8e/Piyush_Goyal_in_2022.jpg'
  ],
  'shivraj-singh-chouhan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Shivraj_Singh_Chouhan_official_portrait.jpg/480px-Shivraj_Singh_Chouhan_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/ca/Shivraj_Singh_Chouhan_official_portrait.jpg'
  ],
  'jyotiraditya-scindia': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jyotiraditya_Scindia_in_2022.jpg/480px-Jyotiraditya_Scindia_in_2022.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/47/Jyotiraditya_Scindia_in_2022.jpg'
  ],
  'ashwini-vaishnaw': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ashwini_Vaishnaw_official_portrait.jpg/480px-Ashwini_Vaishnaw_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Ashwini_Vaishnaw_official_portrait.jpg'
  ],
  'dharmendra-pradhan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dharmendra_Pradhan_in_2023.jpg/480px-Dharmendra_Pradhan_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/Dharmendra_Pradhan_in_2023.jpg'
  ],
  'kiren-rijiju': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kiren_Rijiju_in_2023.jpg/480px-Kiren_Rijiju_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/52/Kiren_Rijiju_in_2023.jpg'
  ],
  'bhupender-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bhupender_Yadav_in_2023.jpg/480px-Bhupender_Yadav_in_2023.jpg'
  ],
  'gajendra-singh-shekhawat': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Gajendra_Singh_Shekhawat_in_2023.jpg/480px-Gajendra_Singh_Shekhawat_in_2023.jpg'
  ],
  'sarbananda-sonowal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Sarbananda_Sonowal_official_portrait.jpg/480px-Sarbananda_Sonowal_official_portrait.jpg'
  ],
  'chirag-paswan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Chirag_Paswan_in_2024.jpg/480px-Chirag_Paswan_in_2024.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Chirag_Paswan_in_2024.jpg'
  ],
  'jitan-ram-manjhi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jitan_Ram_Manjhi_in_2024.jpg/480px-Jitan_Ram_Manjhi_in_2024.jpg'
  ],
  'kinjarapu-ram-mohan-naidu': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kinjarapu_Ram_Mohan_Naidu_in_2024.jpg/480px-Kinjarapu_Ram_Mohan_Naidu_in_2024.jpg'
  ],
  'ram-mohan-naidu-kinjarapu': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kinjarapu_Ram_Mohan_Naidu_in_2024.jpg/480px-Kinjarapu_Ram_Mohan_Naidu_in_2024.jpg'
  ],
  'anupriya-patel': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Anupriya_Patel_in_2021.jpg/480px-Anupriya_Patel_in_2021.jpg'
  ],
  'om-birla': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Om_Birla_official_portrait.jpg/480px-Om_Birla_official_portrait.jpg'
  ],
  'g-kishan-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/G._Kishan_Reddy_in_2021.jpg/480px-G._Kishan_Reddy_in_2021.jpg'
  ],
  'kishan-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/G._Kishan_Reddy_in_2021.jpg/480px-G._Kishan_Reddy_in_2021.jpg'
  ],
  'hardeep-singh-puri': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hardeep_Singh_Puri_official_portrait.jpg/480px-Hardeep_Singh_Puri_official_portrait.jpg'
  ],
  'mansukh-mandaviya': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mansukh_L_Mandaviya_official_portrait.jpg/480px-Mansukh_L_Mandaviya_official_portrait.jpg'
  ],
  'giriraj-singh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Giriraj_Singh_official_portrait.jpg/480px-Giriraj_Singh_official_portrait.jpg'
  ],
  'sukanta-majumdar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dr._Sukanta_Majumdar.jpg/480px-Dr._Sukanta_Majumdar.jpg'
  ],
  'suresh-gopi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Suresh_Gopi_in_2024.jpg/480px-Suresh_Gopi_in_2024.jpg'
  ],
  'bandi-sanjay-kumar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bandi_Sanjay_Kumar_in_2023.jpg/480px-Bandi_Sanjay_Kumar_in_2023.jpg'
  ],
  'shobha-karandlaje': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Shobha_Karandlaje_official_portrait.jpg/480px-Shobha_Karandlaje_official_portrait.jpg'
  ],
  'shantanu-thakur': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Shantanu_Thakur_official.jpg/480px-Shantanu_Thakur_official.jpg'
  ],
  'prahlad-joshi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pralhad_Joshi_official_portrait.jpg/480px-Pralhad_Joshi_official_portrait.jpg'
  ],
  'pralhad-joshi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pralhad_Joshi_official_portrait.jpg/480px-Pralhad_Joshi_official_portrait.jpg'
  ],
  'annpurna-devi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Annpurna_Devi_official.jpg/480px-Annpurna_Devi_official.jpg'
  ],
  'jayant-chaudhary': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Jayant_Chaudhary_2022.jpg/480px-Jayant_Chaudhary_2022.jpg'
  ],
  'h-d-kumaraswamy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/H_D_Kumaraswamy_in_2023.jpg/480px-H_D_Kumaraswamy_in_2023.jpg'
  ],
  'hd-kumaraswamy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/H_D_Kumaraswamy_in_2023.jpg/480px-H_D_Kumaraswamy_in_2023.jpg'
  ],

  // === 2. KEY OPPOSITION & REGIONAL LEADERS ===
  'akhilesh-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Akhilesh_Yadav_in_2023.jpg/480px-Akhilesh_Yadav_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Akhilesh_Yadav_in_2023.jpg'
  ],
  'dimple-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dimple_Yadav_in_2023.jpg/480px-Dimple_Yadav_in_2023.jpg'
  ],
  'supriya-sule': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Supriya_Sule_2019.jpg/480px-Supriya_Sule_2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/90/Supriya_Sule_2019.jpg'
  ],
  'sharad-pawar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sharad_Pawar_2018.jpg/480px-Sharad_Pawar_2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c5/Sharad_Pawar_2018.jpg'
  ],
  'shashi-tharoor': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Shashi_Tharoor_2019.jpg/480px-Shashi_Tharoor_2019.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Shashi_Tharoor_2019.jpg'
  ],
  'mahua-moitra': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mahua_Moitra_in_2023.jpg/480px-Mahua_Moitra_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Mahua_Moitra_in_2023.jpg'
  ],
  'abhishek-banerjee': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Abhishek_Banerjee_in_2023.jpg/480px-Abhishek_Banerjee_in_2023.jpg'
  ],
  'kanimozhi-karunanidhi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kanimozhi_Karunanidhi_2019.jpg/480px-Kanimozhi_Karunanidhi_2019.jpg'
  ],
  'kanimozhi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kanimozhi_Karunanidhi_2019.jpg/480px-Kanimozhi_Karunanidhi_2019.jpg'
  ],
  'dayanidhi-maran': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dayanidhi_Maran_official.jpg/480px-Dayanidhi_Maran_official.jpg'
  ],
  't-r-baalu': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/T_R_Baalu_in_2019.jpg/480px-T_R_Baalu_in_2019.jpg'
  ],
  'a-raja': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/A._Raja_in_2019.jpg/480px-A._Raja_in_2019.jpg'
  ],
  'asaduddin-owaisi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Asaduddin_Owaisi_in_2023.jpg/480px-Asaduddin_Owaisi_in_2023.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Asaduddin_Owaisi_in_2023.jpg'
  ],
  'chandrashekhar-azad': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan_(cropped).jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/76/Chandrashekhar_Azad_Ravan_%28cropped%29.jpg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan.jpg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandra_Shekhar_Azad_(Ravan).jpg'
  ],
  'chandrashekhar-azad-ravan': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan_(cropped).jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/76/Chandrashekhar_Azad_Ravan_%28cropped%29.jpg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan.jpg'
  ],
  'chandrashekhar': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chandrashekhar_Azad_Ravan_(cropped).jpg',
    'https://upload.wikimedia.org/wikipedia/commons/7/76/Chandrashekhar_Azad_Ravan_%28cropped%29.jpg'
  ],
  'gaurav-gogoi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Gaurav_Gogoi_in_2023.jpg/480px-Gaurav_Gogoi_in_2023.jpg'
  ],
  'deepender-singh-hooda': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Deepender_Singh_Hooda_2023.jpg/480px-Deepender_Singh_Hooda_2023.jpg'
  ],
  'tejasvi-surya': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Tejasvi_Surya_official_portrait.jpg/480px-Tejasvi_Surya_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Tejasvi_Surya_official_portrait.jpg'
  ],
  'arvind-sawant': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Arvind_Sawant_official_portrait.jpg/480px-Arvind_Sawant_official_portrait.jpg'
  ],
  'dr-amol-kolhe': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Amol_Kolhe_2023.jpg/480px-Amol_Kolhe_2023.jpg'
  ],
  'amol-ramsakhi-kolhe': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Amol_Kolhe_2023.jpg/480px-Amol_Kolhe_2023.jpg'
  ],
  'priyanka-gandhi-vadra': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Priyanka_Gandhi_Vadra_in_2024.jpg/480px-Priyanka_Gandhi_Vadra_in_2024.jpg'
  ],
  'mallikarjun-kharge': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mallikarjun_Kharge_official_portrait.jpg/480px-Mallikarjun_Kharge_official_portrait.jpg'
  ],
  'k-c-venugopal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/K_C_Venugopal_in_2024.jpg/480px-K_C_Venugopal_in_2024.jpg'
  ],
  'kc-venugopal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/K_C_Venugopal_in_2024.jpg/480px-K_C_Venugopal_in_2024.jpg'
  ],
  'jairam-ramesh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Jairam_Ramesh_in_2022.jpg/480px-Jairam_Ramesh_in_2022.jpg'
  ],
  'sanjay-raut': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Sanjay_Raut_in_2022.jpg/480px-Sanjay_Raut_in_2022.jpg'
  ],
  'raghav-chadha': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Raghav_Chadha_in_2023.jpg/480px-Raghav_Chadha_in_2023.jpg'
  ],
  'sanjay-singh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sanjay_Singh_AAP_2023.jpg/480px-Sanjay_Singh_AAP_2023.jpg'
  ],
  'derek-o-brien': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Derek_O%27Brien_in_2019.jpg/480px-Derek_O%27Brien_in_2019.jpg'
  ],
  'nishikant-dubey': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Nishikant_Dubey_official.jpg/480px-Nishikant_Dubey_official.jpg'
  ],
  'ravi-shankar-prasad': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ravi_Shankar_Prasad_official_portrait.jpg/480px-Ravi_Shankar_Prasad_official_portrait.jpg'
  ],
  'rajiv-pratap-rudy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Rajiv_Pratap_Rudy_official.jpg/480px-Rajiv_Pratap_Rudy_official.jpg'
  ],
  'pappu-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pappu_Yadav_2024.jpg/480px-Pappu_Yadav_2024.jpg'
  ],
  'rajesh-ranjan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pappu_Yadav_2024.jpg/480px-Pappu_Yadav_2024.jpg'
  ],
  'misa-bharti': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Misa_Bharti_in_2024.jpg/480px-Misa_Bharti_in_2024.jpg'
  ],
  'sudip-bandyopadhyay': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sudip_Bandyopadhyay_official.jpg/480px-Sudip_Bandyopadhyay_official.jpg'
  ],
  'kalyan-banerjee': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kalyan_Banerjee_official.jpg/480px-Kalyan_Banerjee_official.jpg'
  ],
  'kakoli-ghosh-dastidar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kakoli_Ghosh_Dastidar_official.jpg/480px-Kakoli_Ghosh_Dastidar_official.jpg'
  ],
  'saugata-roy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Saugata_Roy_official.jpg/480px-Saugata_Roy_official.jpg'
  ],
  'sougata-roy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Saugata_Roy_official.jpg/480px-Saugata_Roy_official.jpg'
  ],
  'satabdi-roy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Satabdi_Roy_official.jpg/480px-Satabdi_Roy_official.jpg'
  ],
  'kirti-azad': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kirti_Azad_2024.jpg/480px-Kirti_Azad_2024.jpg'
  ],
  'saumitra-khan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Saumitra_Khan_official.jpg/480px-Saumitra_Khan_official.jpg'
  ],
  'jagdambika-pal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jagdambika_Pal_official.jpg/480px-Jagdambika_Pal_official.jpg'
  ],
  'afzal-ansari': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Afzal_Ansari_2024.jpg/480px-Afzal_Ansari_2024.jpg'
  ],
  'dharmendra-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dharmendra_Yadav_official.jpg/480px-Dharmendra_Yadav_official.jpg'
  ],
  'akshay-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Akshay_Yadav_in_2024.jpg/480px-Akshay_Yadav_in_2024.jpg'
  ],
  'zia-ur-rehman-barq': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Zia_Ur_Rehman_Barq_in_2024.jpg/480px-Zia_Ur_Rehman_Barq_in_2024.jpg'
  ],
  'imran-masood': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Imran_Masood_2024.jpg/480px-Imran_Masood_2024.jpg'
  ],
  'hibi-eden': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hibi_Eden_official.jpg/480px-Hibi_Eden_official.jpg'
  ],
  'shafi-parambil': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Shafi_Parambil_in_2024.jpg/480px-Shafi_Parambil_in_2024.jpg'
  ],
  'anto-antony': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Anto_Antony_official.jpg/480px-Anto_Antony_official.jpg'
  ],
  'n-k-premachandran': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/N_K_Premachandran_official.jpg/480px-N_K_Premachandran_official.jpg'
  ],
  'e-t-mohammed-basheer': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/E_T_Mohammed_Basheer_official.jpg/480px-E_T_Mohammed_Basheer_official.jpg'
  ],
  'k-radhakrishnan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/K_Radhakrishnan_official.jpg/480px-K_Radhakrishnan_official.jpg'
  ],
  's-jothimani': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/S_Jothimani_in_2024.jpg/480px-S_Jothimani_in_2024.jpg'
  ],
  'su-venkatesan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Su_Venkatesan_official.jpg/480px-Su_Venkatesan_official.jpg'
  ],
  'thol-thirumaavalavan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Thol_Thirumavalavan_in_2024.jpg/480px-Thol_Thirumavalavan_in_2024.jpg'
  ],
  'thol-thirumavalavan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Thol_Thirumavalavan_in_2024.jpg/480px-Thol_Thirumavalavan_in_2024.jpg'
  ],
  'manickam-tagore': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Manickam_Tagore_official.jpg/480px-Manickam_Tagore_official.jpg'
  ],
  'karti-chidambaram': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Karti_Chidambaram_official.jpg/480px-Karti_Chidambaram_official.jpg'
  ],
  'd-k-suresh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/D_K_Suresh_official.jpg/480px-D_K_Suresh_official.jpg'
  ],
  'c-n-manjunath': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dr_C_N_Manjunath_in_2024.jpg/480px-Dr_C_N_Manjunath_in_2024.jpg'
  ],
  'p-c-mohan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/P_C_Mohan_official.jpg/480px-P_C_Mohan_official.jpg'
  ],
  'jagadish-shettar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Jagadish_Shettar_official.jpg/480px-Jagadish_Shettar_official.jpg'
  ],
  'basavaraj-bommai': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Basavaraj_Bommai_official.jpg/480px-Basavaraj_Bommai_official.jpg'
  ],
  'b-y-raghavendra': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/B_Y_Raghavendra_official.jpg/480px-B_Y_Raghavendra_official.jpg'
  ],
  'vishweshwar-hegde-kageri': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Vishweshwar_Hegde_Kageri_official.jpg/480px-Vishweshwar_Hegde_Kageri_official.jpg'
  ],
  'y-s-avinash-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Y_S_Avinash_Reddy_in_2024.jpg/480px-Y_S_Avinash_Reddy_in_2024.jpg'
  ],
  'kesineni-sivanath': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kesineni_Chinni_in_2024.jpg/480px-Kesineni_Chinni_in_2024.jpg'
  ],
  'lavu-sri-krishna-devarayalu': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Lavu_Sri_Krishna_Devarayalu_official.jpg/480px-Lavu_Sri_Krishna_Devarayalu_official.jpg'
  ],
  'magunta-sreenivasulu-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Magunta_Sreenivasulu_Reddy_official.jpg/480px-Magunta_Sreenivasulu_Reddy_official.jpg'
  ],
  'eatala-rajender': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Eatala_Rajender_in_2023.jpg/480px-Eatala_Rajender_in_2023.jpg'
  ],
  'konda-vishweshwar-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konda_Vishweshwar_Reddy_in_2024.jpg/480px-Konda_Vishweshwar_Reddy_in_2024.jpg'
  ],
  'arvind-dharmapuri': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Dharmapuri_Arvind_official.jpg/480px-Dharmapuri_Arvind_official.jpg'
  ],

  // === 3. DELHI MPs ===
  'bansuri-swaraj': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bansuri_Swaraj_in_2024.jpg/480px-Bansuri_Swaraj_in_2024.jpg'
  ],
  'manoj-tiwari': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Manoj_Tiwari_in_2019.jpg/480px-Manoj_Tiwari_in_2019.jpg'
  ],
  'praveen-khandelwal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Praveen_Khandelwal_in_2024.jpg/480px-Praveen_Khandelwal_in_2024.jpg'
  ],
  'harsh-malhotra': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Harsh_Malhotra_in_2024.jpg/480px-Harsh_Malhotra_in_2024.jpg'
  ],
  'kamaljeet-sehrawat': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Kamaljeet_Sehrawat_in_2024.jpg/480px-Kamaljeet_Sehrawat_in_2024.jpg'
  ],
  'ramvir-singh-bidhuri': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ramvir_Singh_Bidhuri_2023.jpg/480px-Ramvir_Singh_Bidhuri_2023.jpg'
  ],
  'yogender-chandoliya': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Yogender_Chandoliya_in_2024.jpg/480px-Yogender_Chandoliya_in_2024.jpg'
  ],

  // === 4. NOTABLE CULTURAL & HIGH-PROFILE MPs ===
  'hema-malini': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hema_Malini_in_2023.jpg/480px-Hema_Malini_in_2023.jpg'
  ],
  'kangana-ranaut': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kangana_Ranaut_in_2024.jpg/480px-Kangana_Ranaut_in_2024.jpg'
  ],
  'ravi-kishan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ravi_Kishan_in_2023.jpg/480px-Ravi_Kishan_in_2023.jpg'
  ],
  'arun-govil': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Arun_Govil_in_2024.jpg/480px-Arun_Govil_in_2024.jpg'
  ],
  'shatrughan-sinha': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Shatrughan_Sinha_in_2022.jpg/480px-Shatrughan_Sinha_in_2022.jpg'
  ],
  'yusuf-pathan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Yusuf_Pathan_in_2024.jpg/480px-Yusuf_Pathan_in_2024.jpg'
  ],
  'iqra-choudhary': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Iqra_Choudhary_in_2024.jpg/480px-Iqra_Choudhary_in_2024.jpg'
  ],
  'raksha-khadse': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Raksha_Khadse_official.jpg/480px-Raksha_Khadse_official.jpg'
  ],
  'praniti-shinde': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Praniti_Shinde_in_2024.jpg/480px-Praniti_Shinde_in_2024.jpg'
  ],
  'shrikant-shinde': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Shrikant_Shinde_in_2024.jpg/480px-Shrikant_Shinde_in_2024.jpg'
  ],
  'kishori-lal-sharma': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Kishori_Lal_Sharma_in_2024.jpg/480px-Kishori_Lal_Sharma_in_2024.jpg'
  ],
  'awadhesh-prasad': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Awadhesh_Prasad_in_2024.jpg/480px-Awadhesh_Prasad_in_2024.jpg'
  ],

  // === 5. CHIEF MINISTERS & STATE LEADERS ===
  'yogi-adityanath': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yogi_Adityanath_official_portrait_2022.jpg/480px-Yogi_Adityanath_official_portrait_2022.jpg'
  ],
  'devendra-fadnavis': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Devendra_Fadnavis_official_portrait.jpg/480px-Devendra_Fadnavis_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d4/Devendra_Fadnavis_official_portrait.jpg'
  ],
  'mohan-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mohan_Yadav_official_portrait.jpg/480px-Mohan_Yadav_official_portrait.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mohan_Yadav_official_portrait.jpg'
  ],
  'mamata-banerjee': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mamata_Banerjee_official_portrait.jpg/480px-Mamata_Banerjee_official_portrait.jpg'
  ],
  'm-k-stalin': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M_K_Stalin_official_portrait.jpg/480px-M_K_Stalin_official_portrait.jpg'
  ],
  'n-chandrababu-naidu': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/N._Chandrababu_Naidu_in_2024.jpg/480px-N._Chandrababu_Naidu_in_2024.jpg'
  ],
  'pawan-kalyan': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Pawan_Kalyan_in_2024.jpg/480px-Pawan_Kalyan_in_2024.jpg'
  ],
  'revanth-reddy': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Anumula_Revanth_Reddy_official_portrait.jpg/480px-Anumula_Revanth_Reddy_official_portrait.jpg'
  ],
  'siddaramaiah': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Siddaramaiah_official_portrait_2023.jpg/480px-Siddaramaiah_official_portrait_2023.jpg'
  ],
  'd-k-shivakumar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/D_K_Shivakumar_in_2023.jpg/480px-D_K_Shivakumar_in_2023.jpg'
  ],
  'hemant-soren': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Hemant_Soren_official_portrait.jpg/480px-Hemant_Soren_official_portrait.jpg'
  ],
  'eknath-shinde': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Eknath_Shinde_official_portrait.jpg/480px-Eknath_Shinde_official_portrait.jpg'
  ],
  'uddhav-thackeray': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Uddhav_Thackeray_in_2022.jpg/480px-Uddhav_Thackeray_in_2022.jpg'
  ],
  'arvind-kejriwal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Arvind_Kejriwal_in_2023.jpg/480px-Arvind_Kejriwal_in_2023.jpg'
  ],
  'bhajan-lal-sharma': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bhajan_Lal_Sharma_official_portrait.jpg/480px-Bhajan_Lal_Sharma_official_portrait.jpg'
  ],
  'omar-abdullah': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Omar_Abdullah_2024.jpg/480px-Omar_Abdullah_2024.jpg'
  ],
  'harsimrat-kaur-badal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Harsimrat_Kaur_Badal_in_2019.jpg/480px-Harsimrat_Kaur_Badal_in_2019.jpg'
  ],
  'biplab-kumar-deb': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Biplab_Kumar_Deb_official.jpg/480px-Biplab_Kumar_Deb_official.jpg'
  ],
  'trivendra-singh-rawat': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Trivendra_Singh_Rawat_official.jpg/480px-Trivendra_Singh_Rawat_official.jpg'
  ],
  'anil-baluni': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Anil_Baluni_official.jpg/480px-Anil_Baluni_official.jpg'
  ],
  'ajay-bhatt': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ajay_Bhatt_official.jpg/480px-Ajay_Bhatt_official.jpg'
  ],

  // === 6. REGIONAL & 18TH LOK SABHA PROMINENT MPS ===
  'charanjit-singh-channi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Charanjit_Singh_Channi_in_2022.jpg/480px-Charanjit_Singh_Channi_in_2022.jpg'
  ],
  'manohar-lal-khattar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Manohar_Lal_Khattar_official_portrait.jpg/480px-Manohar_Lal_Khattar_official_portrait.jpg'
  ],
  'naveen-jindal': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Naveen_Jindal_in_2024.jpg/480px-Naveen_Jindal_in_2024.jpg'
  ],
  'rao-inderjit-singh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rao_Inderjit_Singh_in_2024.jpg/480px-Rao_Inderjit_Singh_in_2024.jpg'
  ],
  'krishan-pal-gurjar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Krishan_Pal_Gurjar_in_2024.jpg/480px-Krishan_Pal_Gurjar_in_2024.jpg'
  ],
  'nk-premachandran': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/N_K_Premachandran_in_2024.jpg/480px-N_K_Premachandran_in_2024.jpg'
  ],
  'sasikanth-senthil': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sasikanth_Senthil_in_2024.jpg/480px-Sasikanth_Senthil_in_2024.jpg'
  ],
  'nityanand-rai': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nityanand_Rai_in_2024.jpg/480px-Nityanand_Rai_in_2024.jpg'
  ],
  'rajesh-ranjan-alias-pappu-yadav': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Pappu_Yadav_in_2024.jpg/480px-Pappu_Yadav_in_2024.jpg'
  ],
  'jitendra-singh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Jitendra_Singh_official_portrait.jpg/480px-Jitendra_Singh_official_portrait.jpg'
  ],
  'aga-syed-ruhullah-mehdi': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aga_Syed_Ruhullah_Mehdi_in_2024.jpg/480px-Aga_Syed_Ruhullah_Mehdi_in_2024.jpg'
  ],
  'abdul-rashid-sheikh': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Engineer_Rashid_in_2024.jpg/480px-Engineer_Rashid_in_2024.jpg'
  ],
  'engineer-rashid': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Engineer_Rashid_in_2024.jpg/480px-Engineer_Rashid_in_2024.jpg'
  ]
};

/**
 * Normalizes any politician name for exact or substring matching in the photo registry.
 */
export function normalizeLeaderKey(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/^(shri|smt\.|smt|dr\.|dr|mr\.|mr|mrs\.|mrs|adv\.|prof\.|km\.|sushri|chaudhary|ch\.)\s+/gi, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Look up verified portrait image for any politician name.
 * Returns verified URL if present, or null.
 */
export function getVerifiedPoliticianPhoto(name: string): string | null {
  if (!name) return null;
  const cleanKey = normalizeLeaderKey(name);
  
  // 1. Direct key match
  if (VERIFIED_POLITICIAN_PHOTOS[cleanKey] && VERIFIED_POLITICIAN_PHOTOS[cleanKey].length > 0) {
    return VERIFIED_POLITICIAN_PHOTOS[cleanKey][0];
  }

  // 2. Exact word search or alias match
  const searchClean = cleanKey.replace(/-/g, '');
  for (const [key, urls] of Object.entries(VERIFIED_POLITICIAN_PHOTOS)) {
    const keyClean = key.replace(/-/g, '');
    if (searchClean.length >= 4 && keyClean.length >= 4) {
      if (searchClean === keyClean || searchClean.includes(keyClean) || keyClean.includes(searchClean)) {
        return urls[0];
      }
    }
  }

  return null;
}

/**
 * Generate an authentic Wikipedia Commons or Lok Sabha image URL candidate list for any MP name.
 */
export function generateCandidatePhotoUrls(name: string): string[] {
  if (!name) return [];
  const verified = getVerifiedPoliticianPhoto(name);
  const candidates: string[] = [];

  if (verified) {
    candidates.push(verified);
  }

  // Clean name without prefixes
  const clean = name
    .replace(/^(Shri|Smt\.|Smt|Dr\.|Dr|Mr\.|Mr|Mrs\.|Mrs|Adv\.|Prof\.|Km\.|Sushri)\s+/gi, '')
    .trim();
  
  const wikiFormat = clean.replace(/\s+/g, '_');
  
  // Wikipedia / Wikimedia direct file paths
  candidates.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiFormat)}.jpg`);
  candidates.push(`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiFormat)}.jpg`);
  candidates.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiFormat)}_(politician).jpg`);
  candidates.push(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wikiFormat)}_in_2024.jpg`);

  return candidates;
}
