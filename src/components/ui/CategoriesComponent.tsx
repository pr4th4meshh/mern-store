"use client"
import React, { useEffect } from "react"
import CategoryCard from "./CategoryCard"
import { useGetAllCategoriesQuery } from "@/lib/api-slices/productsApiSlice"

const CategoriesComponent = () => {
  const { data: allCategoriesData, refetch: allCategoriesRefetch } =
    useGetAllCategoriesQuery(undefined)
  useEffect(() => {
    allCategoriesRefetch()
  }, [allCategoriesRefetch])
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {allCategoriesData
          ?.slice(0, 3)
          .map((category: string, index: number) => (
            <CategoryCard key={index} categoryName={category} />
          ))}
      </div>
    </div>
  )
}

export default CategoriesComponent
