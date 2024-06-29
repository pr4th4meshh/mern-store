"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <Image
          src={mainImage}
          alt="Main Product Image"
          width={600}
          height={600}
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex gap-2">
        {images.map((image, index) => (
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
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
