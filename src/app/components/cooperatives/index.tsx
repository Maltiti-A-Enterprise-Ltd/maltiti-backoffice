'use client';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, CircularProgress, Menu, MenuItem, Modal } from '@mui/material';
import AddCooperative from '@/app/components/addCooperative';
import { modalStyle } from '@/app/utility/styles';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  getAllCooperatives,
  updateAddModalState,
} from '@/app/redux/features/cooperativesSlice';
import { ToastContainer } from 'react-toastify';
import AlertDialog from '@/app/components/ConfirmationModal';

export default function CooperativesTable() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.cooperative.isAddModalOpen);
  const cooperatives = useAppSelector(state => state.cooperative.cooperatives);
  const status = useAppSelector(
    state => state.cooperative.getCooperativesStatus,
  );

  useEffect(() => {
    dispatch(getAllCooperatives());
  }, [dispatch]);
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
          {status === 'pending' ? (
            <div className={'mt-6 h-40 flex item-center justify-center'}>
              <CircularProgress color="success" />
            </div>
          ) : (
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
                    Fees
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                    }
                  >
                    Leaders
                  </th>
                  <th
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-600 text-blueGray-200 border-blueGray-500'
                    }
                  >
                    Minimal Shares
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
                      <span className={'ml-3 font-bold'}>
                        {cooperative.name}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {cooperative.community}
                    </td>
                    <td className="border-t-0 flex flex-col px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span>
                        {'GH₵ '}
                        {cooperative.monthlyFee} {'monthly'}
                      </span>
                      <span>
                        {'GH₵ '}
                        {cooperative.registrationFee} {' for registration'}
                      </span>
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
                      <span className="mr-2">
                        {'GH₵'}
                        {cooperative.minimalShare}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <i
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className="fas fa-ellipsis-v hover:text-green cursor-pointer"
                      ></i>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Deactivate</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </td>
                    <AlertDialog />
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

CooperativesTable.defaultProps = {
  color: 'light',
};

CooperativesTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
