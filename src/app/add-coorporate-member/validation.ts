import { formData } from '@/app/add-coorporate-member/formData';

export const cooperativeMemberValidation = (values: FormData) => {
  const errors = formData;
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.community) {
    errors.community = 'community is required';
  }
  if (!values.re) {
    errors.registrationFee = 'Registration Fee is required';
  }
  if (!values.monthlyFee) {
    errors.monthlyFee = 'Monthly Fee is required';
  }
  if (!values.minimalShare) {
    errors.minimalShare = 'Minimum Share Capital is required';
  }
  return errors;

}
