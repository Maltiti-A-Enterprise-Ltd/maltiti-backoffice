'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { updateModalOpen, getAllMembers } from '@/app/redux/features/addMember';
import { Modal, Box } from '@mui/material';
import ProductForm from '@/app/components/addProduct';
import { modalStyle } from '@/app/utility/styles';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
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
interface Productlist {
  totalItems: number | string;
  currentPage: number | string;
  totalPages: number | string;
  products: FormValues[];
}
const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [productList, setProductList] = useState<Productlist>({
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    products: [],
  });

  const [index, setIndex] = useState<number>(1);
  const [searchItem, setSearchItem] = useState<string>('');
  const productData = useAppSelector(state => state.addMember.productList);
  const isModalOpen = useAppSelector(state => state.addMember.isModalOpen);
  const loading = useAppSelector(state => state.addMember.loading);
  // const [pagedetails, setPagedetails] = useState<boolean>(false);
  const showPopUp = () => {
    dispatch(updateModalOpen());
  };

  useEffect(() => {
    dispatch(getAllMembers({ page: index, searchTerm: searchItem }));
  }, [dispatch, index, searchItem]);
  console.log(productData);
  useEffect(() => {
    if (productData) {
      setProductList(productData);
    }
  }, [productData]);

  return (
    <div className=" mt-[18%] ">
      <div className="mb-2 flex flex-row items-center">
        <div className=" border-[1px] p-2 rounded-l flex-grow">
          <input
            type="text"
            className="w-full "
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            placeholder="Search by product name"
          />
        </div>
        <button
          onClick={showPopUp}
          className="ml-2 border-[1px] p-2 rounded text-gray-600"
        >
          Add Product
        </button>
      </div>
      {loading && (
        <div className="flex items-center justify-center mt-4">
          <CircularProgress color="primary" size={30} />
          <div className="ml-2">Loading...</div>
        </div>
      )}

      <div className="grid grid-cols-4 mt-4  gap-4">
        {productList.products?.map((product, index) => (
          <div key={index} className="">
            <div
              className="max-w-sm
            h-[320px]
            mx-auto overflow-hidden shadow-lg bg-white rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="flex flex-col items-start justify-between p-2  rounded-lg ">
                <div className="text-[12px] inline-flex font-semibold">
                  Product Name: {product.name}
                </div>

                <div className="text-[12px] inline-flex font-medium">
                  Product Retail: ₵{product.retail}
                </div>

                <div className="text-[12px] inline-flex font-medium">
                  Product Wholesale: ₵{product.wholesale}
                </div>
                <div>
                  <Link
                    href={`/dashboard/Product/${encodeURIComponent(
                      product.code
                    )}`}
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <Pagination
          count={productList.totalPages as number}
          page={index}
          onChange={(e, value) => setIndex(value)}
          color="primary"
        />
      </div>

      <div className="p-8">
        <Modal
          open={isModalOpen}
          onClose={() => dispatch(updateModalOpen())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ProductForm />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ProductPage;
