'use client';
import FormNavBar from '../components/Navbar/formNavBar';
import { Button, FormHelperText, TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import { Formik } from 'formik';
import { formData } from './formData';

const AddMember = () => {
  const signaturePadRef = useRef(null);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    signaturePadRef.current = new SignaturePad(canvas);
    // Other initialization code
  }, []);

  return (
    <>
      <FormNavBar />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Cooperative Membership Registration Form
            </h6>
            <button
              className="bg-green hover:bg-gray-950 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <Formik
            initialValues={formData}
            validate={values => {
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
            }}
            onSubmit={values => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Member Information and Identification
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <TextField
                        fullWidth
                        id="name-of-cooperative"
                        label="Name of cooperative"
                        variant="outlined"
                      />
                      <FormHelperText
                        id="name-of-cooperative"
                        className={'text-red-800'}
                      >
                        Weight
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="full-name"
                      label="Member full name"
                      variant="outlined"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <FormHelperText id="full-name" className={'text-red-800'}>
                      {errors.name &&
                        touched.minimalShare &&
                        errors.minimalShare}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="dob"
                      label="Date of Birth"
                      variant="outlined"
                    />
                    <FormHelperText id="dob" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="id-type"
                      label="ID Type"
                      variant="outlined"
                    />
                    <FormHelperText id="id-type" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="id-number"
                      label="ID Number"
                      variant="outlined"
                    />
                    <FormHelperText id="id-number" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Address & Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <TextField
                      fullWidth
                      id="house-number"
                      label="House Number"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="house-number"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="gps-address"
                      label="GPS Address"
                      variant="outlined"
                    />
                    <FormHelperText id="gps-address" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="phone-number"
                      label="Phone Number"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="phone-number"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <TextField
                      fullWidth
                      id="name-of-community"
                      label="Name of Community"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="name-of-community"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <TextField
                      fullWidth
                      id="region"
                      label="Region"
                      variant="outlined"
                    />
                    <FormHelperText id="region" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <TextField
                      fullWidth
                      id="district"
                      label="District"
                      variant="outlined"
                    />
                    <FormHelperText id="district" className={'text-red-800'}>
                      Weight
                    </FormHelperText>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Education and Occupation
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <TextField
                      fullWidth
                      id="education-level"
                      label="Highest Level of Education"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="education-level"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="main-occupation"
                      label="Main Occupation"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="main-occupation"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="secondary-occupation"
                      label="Secondary Occupation"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="secondary-occupation"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="crops-produced"
                      label="Crops Produced"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="crops-produced"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <TextField
                      fullWidth
                      id="farm-size"
                      label="Own Farm Size"
                      variant="outlined"
                    />
                    <FormHelperText
                      id="own-farm-size"
                      className={'text-red-800'}
                    >
                      Weight
                    </FormHelperText>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div id={'signature-pad'} className={'mt-5'}>
                  <label className={'mb-4'}>Sign here</label>
                  <canvas className={'border'}></canvas>
                  <div>
                    <Button
                      onClick={() => {
                        signaturePadRef.current.clear();
                      }}
                      className="hover:bg-black px-4 py-2 mt-6 text-white bg-green"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                <Button className="hover:bg-black float-right px-8 py-4 mt-6 text-white bg-green">
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddMember;
