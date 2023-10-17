import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from '@/app/utility/axios';
import { serverError } from '@/app/utility/constants';
import { toast } from 'react-toastify';
import { ICooperativeMember } from '../../Interfaces/cooperativeMember.interface';

type cooperativeMemberState = {
  members: ICooperativeMember[];
  addStatus: 'idle' | 'fulfilled' | 'pending';
};

const initialState: cooperativeMemberState = {
  members: [],
  addStatus: 'idle',
};

export const addMember = createAsyncThunk(
  'addMember',
  async (memberInfo, { dispatch }) => {
    try {
      const response = await axiosPrivate.post('/login', memberInfo);
      dispatch(updateMember(memberInfo));
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (err: any) {
      toast.error(err.response?.data.message || serverError);
    }
  },
);

export const cooperativeMember = createSlice({
  name: 'cooperativeMember',
  initialState,
  reducers: {
    updateMember: (state, action) => {
      state.members = [...state.members, action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addMember.pending, state => {
        state.addStatus = 'pending';
      })
      .addCase(addMember.fulfilled, state => {
        state.addStatus = 'fulfilled';
      })
      .addCase(addMember.rejected, state => {
        state.addStatus = 'idle';
      });
  },
});

export const { updateMember } = cooperativeMember.actions;

export default cooperativeMember.reducer;
