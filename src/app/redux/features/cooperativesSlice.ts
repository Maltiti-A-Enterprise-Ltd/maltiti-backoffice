import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { axiosPrivate } from '@/app/utility/axios';
import { ICooperative } from '@/app/Interfaces/cooperatives.interface';
import { toast } from 'react-toastify';
import { serverError } from '@/app/utility/constants';

type cooperativeState = {
  cooperatives: ICooperative[];
  status: 'idle' | 'fulfilled' | 'pending';
  getCooperativesStatus: 'idle' | 'fulfilled' | 'pending';
  isAddModalOpen: boolean;
};

const initialState: cooperativeState = {
  cooperatives: [],
  status: 'idle',
  isAddModalOpen: false,
  getCooperativesStatus: 'idle',
};

export const addCooperative = createAsyncThunk(
  'addCooperative',
  async (cooperativeInfo, { dispatch }) => {
    try {
      const response = await axios.post(
        '/cooperative/add-cooperative',
        cooperativeInfo,
      );
      dispatch(updateAddModalState());
      dispatch(updateCooperative(response.data.data));
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
      toast.error(err.response?.data.error || serverError);
    }
  },
);

export const getAllCooperatives = createAsyncThunk(
  'getAllCooperative',
  async (_, { dispatch }) => {
    try {
      const response = await axiosPrivate.get('/cooperative/cooperatives');
      dispatch(setCooperatives(response.data.data.cooperatives));
    } catch (err: any) {
      toast.error(err.response?.data.message || serverError);
    }
  },
);

export const deleteCooperative = createAsyncThunk(
  'deleteCooperative',
  async (id, { dispatch }) => {
    try {
      const response = await axiosPrivate.delete(
        `/cooperative/delete-cooperative/${id}`,
      );
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
      dispatch(setCooperatives(response.data.data.cooperatives));
    } catch (err: any) {
      toast.error(err.response?.data.message || serverError);
    }
  },
);
export const cooperative = createSlice({
  name: 'cooperative',
  initialState,
  reducers: {
    updateCooperative: (state, action) => {
      state.cooperatives = [...state.cooperatives, action.payload];
    },
    updateAddModalState: state => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    setCooperatives: (state, action) => {
      state.cooperatives = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addCooperative.pending, state => {
        state.status = 'pending';
      })
      .addCase(addCooperative.fulfilled, state => {
        state.status = 'fulfilled';
      })
      .addCase(addCooperative.rejected, state => {
        state.status = 'idle';
      })
      .addCase(getAllCooperatives.pending, state => {
        state.getCooperativesStatus = 'pending';
      })
      .addCase(getAllCooperatives.fulfilled, state => {
        state.getCooperativesStatus = 'fulfilled';
      })
      .addCase(getAllCooperatives.rejected, state => {
        state.getCooperativesStatus = 'idle';
      });
  },
});

export const { updateCooperative, updateAddModalState, setCooperatives } =
  cooperative.actions;

export default cooperative.reducer;
