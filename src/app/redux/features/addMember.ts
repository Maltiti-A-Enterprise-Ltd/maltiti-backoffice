import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosPrivate } from '@/app/utility/axios';
import { toast } from 'react-toastify';
import { serverError } from '@/app/utility/constants';
import { getProductsParams } from '@/app/Interfaces/product.interface';

interface InitialStateType {
  isModalOpen: boolean;
  productList: Productlist;
  loading: boolean;
}

interface Productlist {
  totalItems: number | string;
  currentPage: number | string;
  totalPages: number | string;
  products: FormValues[];
}

interface FormValues {
  name: string;
  code: string;
  wholesale: string;
  retail: string;
  image: string;
  weight: string;
  size: string;
  category: string;
  status: string;
  stockQuantity: string;
  description: string;
  ingredients: string;
}

const initialState: InitialStateType = {
  isModalOpen: false,
  productList: {
    totalItems: '',
    currentPage: '',
    totalPages: '',
    products: [],
  },
  loading: false,
};

export const addMember = createSlice({
  name: 'addMember',
  initialState,
  reducers: {
    updateModalOpen: state => {
      state.isModalOpen = !state.isModalOpen;
    },
    setProducts: (state, action: PayloadAction<Productlist>) => {
      state.productList = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const postData = createAsyncThunk(
  'addProduct',
  async (productInfo: FormValues, { dispatch }) => {
    try {
      dispatch(addMember.actions.setLoading(true));

      const response = await axiosPrivate.post(
        '/products/add-product',
        productInfo,
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
    } catch (err: any) {
      toast.error(err.response?.data.message || serverError);
    } finally {
      dispatch(addMember.actions.setLoading(false));
    }
  },
);

export const getAllMembers = createAsyncThunk(
  'getProducts',
  async (
    params: getProductsParams = { page: 1, searchTerm: '' },
    { dispatch },
  ) => {
    const { page, searchTerm } = params;
    try {
      dispatch(addMember.actions.setLoading(true));

      const response = await axiosPrivate.get(
        `/products/all-products?page=${page}&searchTerm=${searchTerm}`,
      );
      dispatch(addMember.actions.setProducts(response.data.data));
      // toast.success(response.data.message, {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'colored',
      // });
    } catch (err: any) {
      toast.error(err.response?.data.message || serverError);
    } finally {
      dispatch(addMember.actions.setLoading(false)); // Set loading to false after the request completes
    }
  },
);

export const { updateModalOpen } = addMember.actions;
export const { setProducts, setLoading } = addMember.actions;
export default addMember.reducer;
