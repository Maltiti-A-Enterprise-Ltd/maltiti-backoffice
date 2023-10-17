export const serverError = 'Server error...';

export const token = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('token')!);
  }
};

export const user = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user')!);
  }
};

export const idType = [
  { name: 'Ghana Card', value: 'Ghana Card' },
  { name: 'Voters ID Card', value: 'Voters ID Card' },
];

export const regions = [
  { name: 'Ashanti Region', value: 'Ashanti Region' },
  { name: 'Brong-Ahafo Region', value: 'Brong-Ahafo Region' },
  { name: 'Central Region', value: 'Central Region' },
  { name: 'Eastern Region', value: 'Eastern Region' },
  { name: 'Greater Accra Region', value: 'Greater Accra Region' },
  { name: 'Northern Region', value: 'Northern Region' },
  { name: 'Upper East Region', value: 'Upper East Region' },
  { name: 'Upper West Region', value: 'Upper West Region' },
  { name: 'Volta Region', value: 'Volta Region' },
  { name: 'Western Region', value: 'Western Region' },
  { name: 'Western North Region', value: 'Western North Region' },
  { name: 'Bono Region', value: 'Bono Region' },
  { name: 'Ahafo Region', value: 'Ahafo Region' },
  { name: 'North East Region', value: 'North East Region' },
  { name: 'Savannah Region', value: 'Savannah Region' },
  { name: 'Oti Region', value: 'Oti Region' },
];

export const educationLevels = [
  { name: 'No Formal Education', value: 'No Formal Education' },
  { name: 'Primary School', value: 'Primary School' },
  { name: 'Secondary School', value: 'Secondary School' },
  { name: 'High School Diploma', value: 'High School Diploma' },
  { name: 'Vocational Training', value: 'Vocational Training' },
  { name: "Associate's Degree", value: "Associate's Degree" },
  { name: "Bachelor's Degree", value: "Bachelor's Degree" },
  { name: "Master's Degree", value: "Master's Degree" },
  { name: 'Doctorate (Ph.D.)', value: 'Doctorate (Ph.D.)' },
  { name: 'Other', value: 'Other' },
];

export const requiredFields = {
  name: 'Name is required',
  community: 'Community is required',
  cooperative: 'Cooperative is required',
  dob: 'Date of birth is required',
  district: 'District is required',
  cropsProduced: 'Crops produced is required',
  farmSize: 'Farm size is required',
  gpsAddress: 'GPS Address is required',
  houseNumber: 'House number is required',
  idNumber: 'ID Number is required',
  idType: 'ID Type is required',
  levelOfEducation: 'Highest level of education is required',
  mainOccupation: 'Main Occupation is required',
  phoneNumber: 'Phone number is required',
  region: 'Region is required',
  image: 'An image is required',
};
