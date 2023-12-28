import { useState, useEffect } from 'react';
import { uploadImage } from '../ImageUpload';
import { useAppDispatch } from '@/app/redux/hooks';
import { postData } from '@/app/redux/features/addMember';
import { useAppSelector } from '@/app/redux/hooks';
import { CircularProgress } from '@mui/material';
interface FormValues {
  name: string;
  code: string;
  wholesale: string;
  retail: string;

  weight: string;
  size: string;
  category: string;
  status: string;
  stockQuantity: string;
  description: string;
  ingredients: string;
}

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageurl, setImageurl] = useState<string>('');
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    code: '',
    wholesale: '',
    retail: '',

    weight: '',
    size: '',
    category: '',
    status: '',
    stockQuantity: '',
    description: '',
    ingredients: '',
  });
  const loading = useAppSelector(state => state.addMember.loading);
  const [uploading, setUploading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  useEffect(() => {
    if (file) {
      const handleUpload = async () => {
        if (!file) {
          alert('Please select a file');
          return;
        }
        setUploading(true);
        try {
          const imageUrl = await uploadImage(file);

          if (imageUrl) {
            setImageurl(imageUrl);
            setUploading(false);
          }
        } catch (error) {
          setUploading(false);
          console.error('Error during image upload:', error);
        }
      };
      handleUpload();
    }
  }, [file]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageurl) {
      // console.log(imageurl);
      const productInfo = {
        ...formValues,
        image: imageurl,
      };

      dispatch(postData(productInfo));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            value={formValues.name}
          />
        </div>

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Code/ID
          </label>
          <input
            type="text"
            id="code"
            name="code"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, code: e.target.value })
            }
            value={formValues.code}
          />
        </div>

        <div>
          <label
            htmlFor="wholesalePrice"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Wholesale Price
          </label>
          <input
            type="text"
            id="wholesalePrice"
            name="wholesalePrice"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, wholesale: e.target.value })
            }
            value={formValues.wholesale}
          />
        </div>

        <div>
          <label
            htmlFor="retailPrice"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Retail Price
          </label>
          <input
            type="text"
            id="retailPrice"
            name="retailPrice"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, retail: e.target.value })
            }
            value={formValues.retail}
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Weight
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, weight: e.target.value })
            }
            value={formValues.weight}
          />
        </div>

        <div>
          <label
            htmlFor="standardCode"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Size
          </label>
          <input
            type="text"
            id="standardCode"
            name="standardCode"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, size: e.target.value })
            }
            value={formValues.size}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, category: e.target.value })
            }
            value={formValues.category}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, status: e.target.value })
            }
            value={formValues.status}
          />
        </div>

        <div>
          <label
            htmlFor="quantityAvailable"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Quantity Available
          </label>
          <input
            type="text"
            id="quantityAvailable"
            name="quantityAvailable"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({
                ...formValues,
                stockQuantity: e.target.value,
              })
            }
            value={formValues.stockQuantity}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, description: e.target.value })
            }
            value={formValues.description}
          />
        </div>

        <div>
          <label
            htmlFor="ingredient"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Ingredient
          </label>
          <textarea
            id="ingredient"
            name="ingredient"
            className="border p-2 w-full rounded-md"
            onChange={e =>
              setFormValues({ ...formValues, ingredients: e.target.value })
            }
            value={formValues.ingredients}
          />
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Images
          </label>
          <span className="flex flex-row gap-2">
            {' '}
            <span className="flex flex-col">
              <input
                type="file"
                className="border p-2 w-full rounded-md"
                onChange={handleFileChange}
              />
            </span>
            {uploading && (
              <div className="flex items-center justify-center mt-4">
                <CircularProgress color="primary" size={30} />
                <div className="ml-2">Uploading...</div>
              </div>
            )}
          </span>

          <br />

          <button
            type="submit"
            className={`border-[1px] border-[#228B22] p-2 ${
              uploading
                ? 'bg-[#d3d3d3] text-[#808080] cursor-not-allowed'
                : 'bg-[#228B22] text-white'
            }`}
            disabled={uploading}
          >
            Submit
          </button>
        </div>
      </form>
      {loading && (
        <div className="flex items-center justify-center mt-4">
          <CircularProgress color="primary" size={30} />
          <div className="ml-2">Loading...</div>
        </div>
      )}
    </div>
  );
}
