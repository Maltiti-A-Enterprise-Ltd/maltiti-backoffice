import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPrivate } from '@/app/utility/axios';
import { serverError } from '@/app/utility/constants';
import { toast } from 'react-toastify';
import { ICooperativeMember } from '../../Interfaces/cooperativeMember.interface';
import { router } from 'next/client';

type cooperativeMemberState = {
  members: ICooperativeMember[];
  addStatus: 'idle' | 'fulfilled' | 'pending';
  status: 'idle' | 'fulfilled' | 'pending';
};

const initialState: cooperativeMemberState = {
  members: [],
  addStatus: 'idle',
  status: 'idle',
};

export const addMember = createAsyncThunk(
  'addMember',
  async (memberInfo, { dispatch }) => {
    try {
      const response = await axiosPrivate.post(
        '/cooperative/add-member',
        memberInfo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      dispatch(updateMember(memberInfo));
      await router.push('/dashboard');
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

export const getAllMembers = createAsyncThunk(
  'getAllMembers',
  async (_, { dispatch }) => {
    try {
      const response = await axiosPrivate.get('/login');
      dispatch(setMembers(response.data.data));
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
    setMembers: (state, action) => {
      state.members = state.members.concat(action.payload);
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
      })
      .addCase(getAllMembers.pending, state => {
        state.status = 'pending';
      })
      .addCase(getAllMembers.fulfilled, state => {
        state.status = 'fulfilled';
      })
      .addCase(getAllMembers.rejected, state => {
        state.status = 'idle';
      });
  },
});

export const { updateMember, setMembers } = cooperativeMember.actions;

export default cooperativeMember.reducer;
