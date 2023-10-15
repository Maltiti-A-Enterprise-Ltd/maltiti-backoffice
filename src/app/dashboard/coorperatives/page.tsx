'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// components

import TableDropdown from '../../components/Dropdowns/TableDropdown';
import { Button, Modal, Typography } from '@mui/material';
import AddCooperative from '@/app/components/addCooperative';
import { modalStyle } from '@/app/utility/styles';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  getAllCooperatives,
  updateAddModalState,
} from '@/app/redux/features/cooperativesSlice';
import { ToastContainer } from 'react-toastify';

export default function Cooperatives() {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.cooperative.isAddModalOpen);
  const cooperatives = useAppSelector(state => state.cooperative.cooperatives);

  useEffect(() => {
    dispatch(getAllCooperatives());
  }, []);
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          'bg-white'
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex justify-between">
              <h3 className={'font-semibold text-lg'}>Cooperatives</h3>
              <Button
                onClick={() => dispatch(updateAddModalState())}
                className="Mui-button"
              >
                Add Cooperative
              </Button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                >
                  Name
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                >
                  Community
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                >
                  Phone
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                >
                  Address
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {cooperatives.map(cooperative => (
                <tr key={cooperative.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {/*<img*/}
                    {/*  src="/img/bootstrap.jpg"*/}
                    {/*  className="h-12 w-12 bg-white rounded-full border"*/}
                    {/*  alt="..."*/}
                    {/*></img>{' '}*/}
                    <span className={'ml-3 font-bold'}>{cooperative.name}</span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {cooperative.community}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                    pending
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">
                      <img
                        src="/img/team-1-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      ></img>
                      <img
                        src="/img/team-2-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                      <img
                        src="/img/team-3-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                      <img
                        src="/img/team-4-470x470.png"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">60%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: '60%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => dispatch(updateAddModalState())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddCooperative />
        </Box>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

Cooperatives.defaultProps = {
  color: 'light',
};

Cooperatives.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
