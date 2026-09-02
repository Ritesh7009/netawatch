// Regional neighboring states definition for India
export const INDIAN_NEIGHBORING_STATES: { [state: string]: string[] } = {
  'Delhi (NCT)': ['Uttar Pradesh', 'Haryana', 'Rajasthan', 'Punjab'],
  'Uttar Pradesh': ['Delhi (NCT)', 'Bihar', 'Madhya Pradesh', 'Haryana', 'Rajasthan', 'Uttarakhand', 'Jharkhand'],
  'Maharashtra': ['Gujarat', 'Madhya Pradesh', 'Karnataka', 'Telangana', 'Goa', 'Chhattisgarh'],
  'Karnataka': ['Maharashtra', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Goa'],
  'Tamil Nadu': ['Kerala', 'Karnataka', 'Andhra Pradesh', 'Puducherry'],
  'West Bengal': ['Bihar', 'Jharkhand', 'Odisha', 'Assam', 'Sikkim'],
  'Gujarat': ['Maharashtra', 'Rajasthan', 'Madhya Pradesh'],
  'Telangana': ['Andhra Pradesh', 'Maharashtra', 'Karnataka', 'Chhattisgarh'],
  'Andhra Pradesh': ['Telangana', 'Tamil Nadu', 'Karnataka', 'Odisha'],
  'Kerala': ['Tamil Nadu', 'Karnataka'],
  'Bihar': ['Uttar Pradesh', 'West Bengal', 'Jharkhand'],
  'Madhya Pradesh': ['Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'Gujarat', 'Chhattisgarh'],
  'Rajasthan': ['Gujarat', 'Madhya Pradesh', 'Uttar Pradesh', 'Haryana', 'Punjab'],
  'Punjab': ['Haryana', 'Himachal Pradesh', 'Rajasthan', 'Jammu & Kashmir'],
  'Haryana': ['Punjab', 'Delhi (NCT)', 'Rajasthan', 'Uttar Pradesh', 'Himachal Pradesh'],
  'Himachal Pradesh': ['Punjab', 'Haryana', 'Uttarakhand', 'Jammu & Kashmir'],
  'Jammu & Kashmir': ['Himachal Pradesh', 'Punjab', 'Ladakh'],
  'Assam': ['West Bengal', 'Meghalaya', 'Arunachal Pradesh', 'Nagaland', 'Manipur'],
  'Odisha': ['West Bengal', 'Jharkhand', 'Chhattisgarh', 'Andhra Pradesh'],
  'Jharkhand': ['Bihar', 'West Bengal', 'Odisha', 'Chhattisgarh', 'Uttar Pradesh'],
  'Chhattisgarh': ['Madhya Pradesh', 'Maharashtra', 'Odisha', 'Jharkhand', 'Telangana', 'Uttar Pradesh'],
  'Uttarakhand': ['Uttar Pradesh', 'Himachal Pradesh', 'Haryana'],
  'Goa': ['Maharashtra', 'Karnataka'],
};

export const STATE_NEIGHBORS_MAP = INDIAN_NEIGHBORING_STATES;

export function getNeighboringStates(state: string): string[] {
  return INDIAN_NEIGHBORING_STATES[state] || ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi (NCT)'];
}
