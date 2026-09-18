/**
 * Local Civic & Panchayati Bodies Directory
 * Includes Municipal Corporations, Wards, Mayors, Ward Councillors, and Gram Panchayats.
 */

import { AdministrativeUnit, PersonRecord, RepresentativeTerm } from '../../types/representation';

export interface LocalBodyEntity {
  administrativeUnit: AdministrativeUnit;
  mayorOrHead?: {
    person: PersonRecord;
    term: RepresentativeTerm;
  };
  wards: Record<number, {
    wardNumber: number;
    wardName: string;
    councillor?: {
      person: PersonRecord;
      term: RepresentativeTerm;
    };
    isVerified: boolean;
  }>;
}

export const LOCAL_BODIES_DIRECTORY: Record<string, LocalBodyEntity> = {
  'Bhopal Municipal Corporation (BMC)': {
    administrativeUnit: {
      id: 'ULB_MP_BHOPAL',
      officialName: 'Bhopal Municipal Corporation',
      normalizedName: 'bhopal-municipal-corporation',
      hindiName: 'भोपाल नगर पालिक निगम',
      level: 'urban_local_body',
      state: 'Madhya Pradesh',
      stateCode: 'MP',
      district: 'Bhopal',
      effectiveDate: '1983-08-26',
      localBodyType: 'Municipal Corporation (Nagar Nigam)',
      verificationStatus: 'verified',
    },
    mayorOrHead: {
      person: {
        id: 'maltie-rai',
        fullName: 'Malti Rai',
        normalizedName: 'malti-rai',
        hindiName: 'मालती राय',
        aliases: ['Malti Rai Mayor Bhopal'],
        gender: 'Female',
        education: 'Post Graduate (M.A.)',
        profession: 'Social Worker & Public Leader',
        isVerifiedPerson: true,
      },
      term: {
        id: 'TERM_MAYOR_BHOPAL_2022',
        personId: 'maltie-rai',
        officeId: 'OFFICE_MUNICIPAL_MAYOR',
        constituencyId: 'ULB_MP_BHOPAL',
        constituencyName: 'Bhopal City (Mayor Jurisdiction)',
        state: 'Madhya Pradesh',
        level: 'urban_local',
        house: 'Bhopal Municipal Council',
        partyName: 'Bharatiya Janata Party',
        partyAbbr: 'BJP',
        partyColor: '#f97316',
        alliance: 'NDA',
        startDate: '2022-07-20',
        isCurrent: true,
        electionYear: 2022,
        evidenceIds: ['EVI_BMC_MUNICIPAL_ROLL_2022'],
      },
    },
    wards: {
      52: {
        wardNumber: 52,
        wardName: 'Ward 52 - TT Nagar & New Market',
        councillor: {
          person: {
            id: 'amit-sharma-bmc',
            fullName: 'Amit Sharma',
            normalizedName: 'amit-sharma',
            aliases: ['Amit Sharma Corporator'],
            gender: 'Male',
            profession: 'Civic Activist',
            isVerifiedPerson: true,
          },
          term: {
            id: 'TERM_WARD_52_BHOPAL',
            personId: 'amit-sharma-bmc',
            officeId: 'OFFICE_WARD_COUNCILLOR',
            constituencyId: 'WARD_52_BMC',
            constituencyName: 'Ward 52 - TT Nagar',
            state: 'Madhya Pradesh',
            level: 'urban_local',
            house: 'Bhopal Municipal Corporation Ward 52',
            partyName: 'Indian National Congress',
            partyAbbr: 'INC',
            partyColor: '#0284c7',
            alliance: 'INDIA',
            startDate: '2022-07-20',
            isCurrent: true,
            electionYear: 2022,
            evidenceIds: ['EVI_BMC_MUNICIPAL_ROLL_2022'],
          },
        },
        isVerified: true,
      },
      48: {
        wardNumber: 48,
        wardName: 'Ward 48 - Arera Colony & MP Nagar',
        councillor: {
          person: {
            id: 'manoj-rathore-bmc',
            fullName: 'Manoj Rathore',
            normalizedName: 'manoj-rathore',
            aliases: ['Manoj Rathore Corporator'],
            gender: 'Male',
            profession: 'Business & Civic Work',
            isVerifiedPerson: true,
          },
          term: {
            id: 'TERM_WARD_48_BHOPAL',
            personId: 'manoj-rathore-bmc',
            officeId: 'OFFICE_WARD_COUNCILLOR',
            constituencyId: 'WARD_48_BMC',
            constituencyName: 'Ward 48 - Arera Colony',
            state: 'Madhya Pradesh',
            level: 'urban_local',
            house: 'Bhopal Municipal Corporation Ward 48',
            partyName: 'Bharatiya Janata Party',
            partyAbbr: 'BJP',
            partyColor: '#f97316',
            alliance: 'NDA',
            startDate: '2022-07-20',
            isCurrent: true,
            electionYear: 2022,
            evidenceIds: ['EVI_BMC_MUNICIPAL_ROLL_2022'],
          },
        },
        isVerified: true,
      },
    },
  },
  'Varanasi Municipal Corporation (Nagar Nigam)': {
    administrativeUnit: {
      id: 'ULB_UP_VARANASI',
      officialName: 'Varanasi Municipal Corporation',
      normalizedName: 'varanasi-municipal-corporation',
      hindiName: 'वाराणसी नगर निगम',
      level: 'urban_local_body',
      state: 'Uttar Pradesh',
      stateCode: 'UP',
      district: 'Varanasi',
      effectiveDate: '1959-01-24',
      localBodyType: 'Municipal Corporation (Nagar Nigam)',
      verificationStatus: 'verified',
    },
    mayorOrHead: {
      person: {
        id: 'ashok-tiwari',
        fullName: 'Ashok Tiwari',
        normalizedName: 'ashok-tiwari',
        hindiName: 'अशोक तिवारी',
        aliases: ['Ashok Tiwari Mayor Varanasi'],
        gender: 'Male',
        education: 'Post Graduate',
        profession: 'Social & Political Leader',
        isVerifiedPerson: true,
      },
      term: {
        id: 'TERM_MAYOR_VARANASI_2023',
        personId: 'ashok-tiwari',
        officeId: 'OFFICE_MUNICIPAL_MAYOR',
        constituencyId: 'ULB_UP_VARANASI',
        constituencyName: 'Varanasi Nagar Nigam',
        state: 'Uttar Pradesh',
        level: 'urban_local',
        house: 'Varanasi Municipal House',
        partyName: 'Bharatiya Janata Party',
        partyAbbr: 'BJP',
        partyColor: '#f97316',
        alliance: 'NDA',
        startDate: '2023-05-13',
        isCurrent: true,
        electionYear: 2023,
        evidenceIds: ['EVI_UP_VIDHAN_SABHA_2022'],
      },
    },
    wards: {
      34: {
        wardNumber: 34,
        wardName: 'Ward 34 - Dashashwamedh & Cantt',
        councillor: {
          person: {
            id: 'ramesh-pandey-vns',
            fullName: 'Ramesh Pandey',
            normalizedName: 'ramesh-pandey',
            aliases: ['Ramesh Pandey Corporator'],
            gender: 'Male',
            profession: 'Civic Corporator',
            isVerifiedPerson: true,
          },
          term: {
            id: 'TERM_WARD_34_VARANASI',
            personId: 'ramesh-pandey-vns',
            officeId: 'OFFICE_WARD_COUNCILLOR',
            constituencyId: 'WARD_34_VNS',
            constituencyName: 'Ward 34 - Dashashwamedh',
            state: 'Uttar Pradesh',
            level: 'urban_local',
            house: 'Varanasi Municipal Corporation',
            partyName: 'Bharatiya Janata Party',
            partyAbbr: 'BJP',
            partyColor: '#f97316',
            alliance: 'NDA',
            startDate: '2023-05-13',
            isCurrent: true,
            electionYear: 2023,
            evidenceIds: ['EVI_UP_VIDHAN_SABHA_2022'],
          },
        },
        isVerified: true,
      },
    },
  },
};
