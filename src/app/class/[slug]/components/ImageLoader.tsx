import React, { useState } from 'react';
import Image from 'next/image';

interface ImageUploadInterface {
    // eslint-disable-next-line
    setImageBlob: (blob: any) => void;
    imageBlob: string;
}

const ImageUpload: React.FC<ImageUploadInterface> = ({ setImageBlob, imageBlob }) => {
//   const [imageBlob, setImageBlob] = useState(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    // @ts-expect-error
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // eslint-disable-next-line
      // @ts-expect-error
      const dataUrl = event.target.result;
      setImageBlob(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`w-full flex items-center justify-center ${imageBlob && "h-[200px]  bg-neutral-100"} relative`}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageBlob && <Image layout='fill' src={imageBlob} alt="Uploaded" />}
    </div>
  );
}

export default ImageUpload;
