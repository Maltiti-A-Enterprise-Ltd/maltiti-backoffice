import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: Function;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  name: string;
  value: string;
}

const ImageUploadPreview: React.FC<ImageUploadProps> = (
  props: ImageUploadProps,
) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(URL.createObjectURL(file));
    props.onImageUpload(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input
          {...getInputProps()}
          type={'file'}
          onChange={props.onChange}
          onBlur={props.onBlur}
          name={props.name}
          value={props.value}
        />
        <Typography variant="h6">
          {selectedImage ? (
            <Box mt={2}>
              <Image
                src={selectedImage}
                alt="Uploaded"
                style={previewImageStyles}
                width={200}
                height={200}
              />
            </Box>
          ) : (
            <div className={'text-sm'}>
              Drag & Drop or Click to Upload an Image
            </div>
          )}
        </Typography>
      </div>
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  placeItems: 'center',
  padding: '20px',
  width: '12rem',
  height: '12rem',
  cursor: 'pointer',
};

const previewImageStyles: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '200px',
  border: '1px solid #cccccc',
  borderRadius: '4px',
};

export default ImageUploadPreview;
