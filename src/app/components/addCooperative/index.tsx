'use client';
import {
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from '@mui/material';
import React from 'react';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { addCooperative } from '@/app/redux/features/cooperativesSlice';

const AddCooperative = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.cooperative.status);

  return (
    <>
      <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Add Cooperative
            </h6>
          </div>
        </div>
        <div className="flex-auto  px-4 lg:px-10 py-10 pt-0">
          <Formik
            initialValues={{
              name: '',
              community: '',
              registrationFee: '',
              monthlyFee: '',
              minimalShare: '',
            }}
            validate={values => {
              const errors = {
                name: '',
                community: '',
                registrationFee: '',
                monthlyFee: '',
                minimalShare: '',
              };
              if (!values.name) {
                errors.name = 'Name is required';
              }
              if (!values.community) {
                errors.community = 'community is required';
              }
              if (!values.registrationFee) {
                errors.registrationFee = 'Registration Fee is required';
              }
              if (!values.monthlyFee) {
                errors.monthlyFee = 'Monthly Fee is required';
              }
              if (!values.minimalShare) {
                errors.minimalShare = 'Minimum Share Capital is required';
              }
              return errors;
            }}
            onSubmit={values => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form
                onSubmit={event => {
                  event.preventDefault(); // @ts-ignore
                  dispatch(addCooperative(values));
                }}
              >
                <h6 className=" text-sm mt-3 mb-6 font-bold uppercase">
                  Cooperative Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <TextField
                        fullWidth
                        name={'name'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        id="name-of-cooperative"
                        label="Name of cooperative"
                        variant="outlined"
                      />
                      <FormHelperText
                        id="name-of-cooperative"
                        className={'helper-text'}
                      >
                        {errors.name && touched.name && errors.name}
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="community"
                      value={values.community}
                      fullWidth
                      id="community"
                      label="community"
                      variant="outlined"
                    />
                    <FormHelperText id="community" className={'helper-text'}>
                      {errors.community &&
                        touched.community &&
                        errors.community}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <TextField
                        fullWidth
                        id="registrationFee"
                        label="Registration Fee (GH₵)"
                        variant="outlined"
                        name="registrationFee"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.registrationFee}
                      />
                      <FormHelperText
                        id="registrationFee"
                        className={'helper-text'}
                      >
                        {errors.registrationFee &&
                          touched.registrationFee &&
                          errors.registrationFee}
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <TextField
                        fullWidth
                        id="monthlyFee"
                        label="Monthly Dues (GH₵)"
                        variant="outlined"
                        name="monthlyFee"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.monthlyFee}
                      />
                      <FormHelperText
                        id="registrationFee"
                        className={'helper-text'}
                      >
                        {errors.monthlyFee &&
                          touched.monthlyFee &&
                          errors.monthlyFee}
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="minimalShare"
                      label="Minimum Share Capital (GH₵)"
                      variant="outlined"
                      name="minimalShare"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.minimalShare}
                    />
                    <FormHelperText id="minimalShare" className={'helper-text'}>
                      {errors.minimalShare &&
                        touched.minimalShare &&
                        errors.minimalShare}
                    </FormHelperText>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                {status === 'pending' ? (
                  <div className={'mt-6 flex'}>
                    <CircularProgress color="success" />
                  </div>
                ) : (
                  <Button type={'submit'} className="Mui-button">
                    Save
                  </Button>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddCooperative;
