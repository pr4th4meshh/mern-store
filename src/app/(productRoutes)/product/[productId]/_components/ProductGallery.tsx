"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[]
  apiImages: string[]
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, apiImages }) => {
  const [mainImage, setMainImage] = useState(apiImages ?  apiImages[0] : images[0]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <Image
          src={mainImage}
          alt="Main Product Image"
          width={800}
          height={800}
          className="object-cover rounded-xl w-full h-[500px]"
        />
      </div>
      <div className="flex gap-2">
        { apiImages?.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border ${
              mainImage === image ? 'border-secondary' : 'border-transparent'
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              width={100}
              height={100}
              className="object-cover h-[100px] w-[100px]"
            />
          </div>
        )) }
      </div>
    </div>
  );
};

export default ProductGallery;
