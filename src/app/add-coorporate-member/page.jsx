'use client';
import FormNavBar from '../components/Navbar/formNavBar';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { getAllCooperatives } from '../redux/features/cooperativesSlice';
import {
  educationLevels,
  idType,
  regions,
  requiredFields,
} from '../utility/constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Formik } from 'formik';
import Image from 'next/image';
import { addMember } from '../redux/features/cooperativeMemberSlice';

const AddMember = () => {
  const dispatch = useAppDispatch();
  const cooperativeOptions = useAppSelector(
    state => state.cooperative.cooperativeOptions,
  );
  const status = useAppSelector(state => state.cooperativeMember.addStatus);
  const signaturePadRef = useRef(null);
  const [memberImage, setMemberImage] = useState('');

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    signaturePadRef.current = new SignaturePad(canvas);
    dispatch(getAllCooperatives());
  }, [dispatch]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    // Check if the file is an image
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = e => {
        setMemberImage(e.target.result);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

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
            initialValues={{
              image: '',
              cooperative: '',
              name: '',
              dob: '',
              idType: '',
              idNumber: '',
              houseNumber: '',
              gpsAddress: '',
              phoneNumber: '',
              community: '',
              region: '',
              district: '',
              levelOfEducation: '',
              mainOccupation: '',
              secondaryOccupation: '',
              cropsProduced: '',
              farmSize: '',
            }}
            validate={values => {
              const errors = {};
              for (const field in requiredFields) {
                if (!values[field]) {
                  errors[field] = requiredFields[field];
                }
              }
              return errors;
            }}
            onSubmit={values => {
              dispatch(addMember(values));
            }}
            validateOnMount={true}
            validateOnChange={true}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                {/*<ImageUploadPreview*/}
                {/*  // onImageUpload={imageFile => {*/}
                {/*  //   values.image = imageFile;*/}
                {/*  //   console.log('d', values);*/}
                {/*  // }}*/}
                {/*  onBlur={handleBlur}*/}
                {/*  onChange={handleChange}*/}
                {/*  name={'image'}*/}
                {/*  // value={values.image}*/}
                {/*/>*/}
                <div className={'flex gap-x-3'}>
                  <div
                    className={
                      'border flex justify-center items-center border-gray-600 border-dashed h-40 w-40'
                    }
                  >
                    {memberImage ? (
                      <Image
                        alt={'member image'}
                        height={200}
                        width={200}
                        src={memberImage}
                      />
                    ) : (
                      <span>Upload Image</span>
                    )}
                  </div>
                  <div className={'grid items-center justify-center'}>
                    <label
                      className="bg-green px-3 text-white max-w-[10rem] text-center hover:bg-black cursor-pointer py-3 rounded-md"
                      htmlFor="profileImage"
                    >
                      Upload Image
                    </label>
                    <input
                      id="profileImage"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      value={values.image}
                      onChange={e => {
                        handleChange(e);
                        handleImageUpload(e);
                      }}
                      onBlur={handleBlur}
                      name={'image'}
                    />
                  </div>
                </div>
                <FormHelperText id="id-type" className={'helper-text'}>
                  {errors.image && touched.image && errors.image}
                </FormHelperText>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Member Information and Identification
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Cooperative
                        </InputLabel>
                        <Select
                          fullWidth
                          id="cooperative"
                          label="Cooperative"
                          variant="outlined"
                          name="cooperative"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cooperative}
                        >
                          {cooperativeOptions.map(type => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormHelperText id="id-type" className={'helper-text'}>
                        {errors.cooperative &&
                          touched.cooperative &&
                          errors.cooperative}
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
                    <FormHelperText id="full-name" className={'helper-text'}>
                      {errors.name && touched.name && errors.name}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4  mb-3">
                    <TextField
                      fullWidth
                      id="dob"
                      label="Date of Birth"
                      variant="outlined"
                      type={'date'}
                      name="dob"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dob}
                    />
                    <FormHelperText id="dob" className={'helper-text'}>
                      {errors.dob && touched.dob && errors.dob}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ID Type
                      </InputLabel>
                      <Select
                        fullWidth
                        id="id-type"
                        label="ID Type"
                        variant="outlined"
                        name="idType"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.idType}
                      >
                        {idType.map(type => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormHelperText id="id-type" className={'helper-text'}>
                      {errors.idType && touched.idType && errors.idType}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="id-number"
                      label="ID Number"
                      variant="outlined"
                      name="idNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.idNumber}
                    />
                    <FormHelperText id="id-number" className={'helper-text'}>
                      {errors.idNumber && touched.idNumber && errors.idNumber}
                    </FormHelperText>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Address & Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="house-number"
                      label="House Number"
                      variant="outlined"
                      name="houseNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.houseNumber}
                    />
                    <FormHelperText id="house-number" className={'helper-text'}>
                      {errors.houseNumber &&
                        touched.houseNumber &&
                        errors.houseNumber}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="gps-address"
                      label="GPS Address"
                      variant="outlined"
                      name="gpsAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gpsAddress}
                    />
                    <FormHelperText id="gps-address" className={'helper-text'}>
                      {errors.gpsAddress &&
                        touched.gpsAddress &&
                        errors.gpsAddress}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="phone-number"
                      label="Phone Number"
                      variant="outlined"
                      name="phoneNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                      type={'number'}
                    />
                    <FormHelperText id="phone-number" className={'helper-text'}>
                      {errors.phoneNumber &&
                        touched.phoneNumber &&
                        errors.phoneNumber}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="name-of-community"
                      label="Name of Community"
                      variant="outlined"
                      name="community"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.community}
                    />
                    <FormHelperText
                      id="name-of-community"
                      className={'helper-text'}
                    >
                      {errors.community &&
                        touched.community &&
                        errors.community}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Region
                      </InputLabel>
                      <Select
                        fullWidth
                        id="id-type"
                        label="Regions"
                        variant="outlined"
                        name="region"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                      >
                        {regions.map(type => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormHelperText id="region" className={'helper-text'}>
                      {errors.region && touched.region && errors.region}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="district"
                      label="District"
                      variant="outlined"
                      name="district"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.district}
                    />
                    <FormHelperText id="district" className={'helper-text'}>
                      {errors.district && touched.district && errors.district}
                    </FormHelperText>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Education and Occupation
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Highest Level of Education
                      </InputLabel>
                      <Select
                        fullWidth
                        id="levelOfEducation"
                        label="Highest Level of Education"
                        variant="outlined"
                        name="levelOfEducation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.levelOfEducation}
                      >
                        {educationLevels.map(type => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormHelperText
                      id="levelOfEducation"
                      className={'helper-text'}
                    >
                      {errors.levelOfEducation &&
                        touched.levelOfEducation &&
                        errors.levelOfEducation}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="main-occupation"
                      label="Main Occupation"
                      variant="outlined"
                      name="mainOccupation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mainOccupation}
                    />
                    <FormHelperText
                      id="main-occupation"
                      className={'helper-text'}
                    >
                      {errors.mainOccupation &&
                        touched.mainOccupation &&
                        errors.mainOccupation}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <TextField
                      fullWidth
                      id="secondary-occupation"
                      label="Secondary Occupation"
                      variant="outlined"
                      name="secondaryOccupation"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.secondaryOccupation}
                    />
                    <FormHelperText
                      id="secondary-occupation"
                      className={'text-red-800'}
                    >
                      {errors.secondaryOccupation &&
                        touched.secondaryOccupation &&
                        errors.secondaryOccupation}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="crops-produced"
                      label="Crops Produced"
                      variant="outlined"
                      name="cropsProduced"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cropsProduced}
                    />
                    <FormHelperText
                      id="crops-produced"
                      className={'helper-text'}
                    >
                      {errors.cropsProduced &&
                        touched.cropsProduced &&
                        errors.cropsProduced}
                    </FormHelperText>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-3">
                    <TextField
                      fullWidth
                      id="farm-size"
                      label="Own Farm Size (Acres)"
                      variant="outlined"
                      name="farmSize"
                      type={'number'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.farmSize}
                    />
                    <FormHelperText
                      id="own-farm-size"
                      className={'helper-text'}
                    >
                      {errors.farmSize && touched.farmSize && errors.farmSize}
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
                      className="mt-10 Mui-button"
                      type="button"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                {status === 'pending' ? (
                  <div className={'mt-6 flex item-center justify-center'}>
                    <CircularProgress color="success" />
                  </div>
                ) : (
                  <Button
                    type={'submit'}
                    className="float-right mt-6 Mui-button"
                  >
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

export default AddMember;
