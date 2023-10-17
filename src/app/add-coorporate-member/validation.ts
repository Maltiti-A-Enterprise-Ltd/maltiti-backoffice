import { formData, FormData } from '@/app/add-coorporate-member/formData';
import { FormikValues } from 'formik';

export const cooperativeMemberValidation = (values: FormikValues) => {
  const errors = formData;
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.community) {
    errors.community = 'community is required';
  }
  if (!values.cooperative) {
    errors.cooperative = 'Cooperative is required';
  }
  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  }
  if (!values.district) {
    errors.district = 'District is required';
  }
  if (!values.cropsProduced) {
    errors.cropsProduced = 'Crops produced is required';
  }
  if (!values.farmSize) {
    errors.farmSize = 'Farm size is required';
  }
  if (!values.gpsAddress) {
    errors.gpsAddress = 'GPS Address is required';
  }
  if (!values.houseNumber) {
    errors.houseNumber = 'House number is required';
  }
  if (!values.idNumber) {
    errors.idNumber = 'ID Number is required';
  }
  if (!values.idType) {
    errors.idType = 'ID Type is required';
  }
  if (!values.levelOfEducation) {
    errors.levelOfEducation = 'Highest level of education is required';
  }
  if (!values.mainOccupation) {
    errors.mainOccupation = 'Main Occupation is required';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  }
  if (!values.region) {
    errors.region = 'Region is required';
  }
  return errors;
};
