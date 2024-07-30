"use client"
import React, { useEffect } from "react"
import CardComponent from "./CardComponent"
import { useGetAllProductsQuery } from "@/lib/api-slices/productsApiSlice"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  productImages: string[]
  ratings: string[]
}

const NewCollectionComponent = () => {
  const {
    data: productsData,
    refetch: productsDataRefetch,
    isLoading: productsDataLoading,
  } = useGetAllProductsQuery(undefined)

  useEffect(() => {
    productsDataRefetch()
  }, [productsDataRefetch])

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="uppercase text-5xl text-center">New Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {productsData
          ?.slice(0, 6)
          .map((product: Product) => (
            <CardComponent
              key={product._id}
              product={product}
              isLoading={productsDataLoading}
            />
          ))}
      </div>
    </div>
  )
}

export default NewCollectionComponent
