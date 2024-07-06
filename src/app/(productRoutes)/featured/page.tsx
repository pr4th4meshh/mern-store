"use client"
import React from "react"
import Image from "next/image"
import HeroImage from "../../../../public/reinwedding.webp"
import { useGetAllProductsQuery } from "@/lib/api-slices/productsApiSlice"
import CardComponent from "@/components/ui/CardComponent"

export const dynamic = "force-dynamic"

const Featured = () => {
  const { data: productsData, isLoading: productsDataLoading } =
    useGetAllProductsQuery(undefined)
  return (
    <div className="h-auto container mx-auto p-10 flex flex-col">
      <Image
        src={HeroImage}
        alt="Featured items"
        width="0"
        height="0"
        sizes="100vw"
        className="h-[35vh] w-[90vw] rounded-2xl object-cover"
        quality={100}
        priority
        placeholder="blur"
      />
      <h1 className="uppercase text-4xl text-center my-10">
        check out some featured pieces:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData?.map((product) => (
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

export default Featured
