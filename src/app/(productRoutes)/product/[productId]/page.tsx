// app/product/[productId]/page.tsx
"use client"
import ProductGallery from "./_components/ProductGallery"
import React, { useEffect, useState } from "react"
import { StarFilled } from "@ant-design/icons"
import { Radio } from "antd"
import ButtonComponent from "@/components/ui/ButtonComponent"

export const dynamic = "force-dynamic"

const product = {
  id: "productId",
  name: "Sample Product",
  rating: "4.7",
  description: "This is a sample product description.",
  price: "90.00",
  color: "Cream",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  images: [
    "https://via.placeholder.com/600x600",
    "https://via.placeholder.com/600x600/ff0000",
    "https://via.placeholder.com/600x600/00ff00",
    "https://via.placeholder.com/600x600/0000ff",
  ],
}

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const onChangeSize = (e) => {
    setSelectedSize(e.target.value)
  }
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.images} />
        </div>
        <div className="w-full flex flex-col text-xl md:w-1/2 md:pl-10 mt-10 md:mt-10">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700 mb-4">
            <StarFilled className="pr-1 text-secondary" />
            {product.rating} / 5
          </p>
          <p className="text-gray-700 mb-4">Color: {product.color}</p>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <div className="flex flex-wrap gap-3 mb-3">
            {product.sizes.map((size, index) => (
              <>
                <input
                  type="button"
                  value={size}
                  key={index}
                  className={`min-w-min cursor-pointer border px-4 py-1 text-lg rounded-full ${
                    selectedSize === size ? "border-secondary" : "border-black"
                  } `}
                  onClick={() => setSelectedSize(size)}
                />
              </>
            ))}
          </div>
          <ButtonComponent
            title="Add to Cart"
            textColor="text-white"
            bgColor="bg-black"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
