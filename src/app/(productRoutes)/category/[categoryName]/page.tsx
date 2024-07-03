'use client'
import CardComponent from '@/components/ui/CardComponent'
import { useGetProductsByCategoryQuery } from '@/lib/api-slices/productsApiSlice'
import React, { useEffect } from 'react'

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
    const {data: productsByCategory, isLoading: productsByCategoryLoading, refetch: productsByCategoryRefetch} = useGetProductsByCategoryQuery(params.categoryName)
    useEffect(() => {
        productsByCategoryRefetch()
    }, [productsByCategoryRefetch])
  return (
    <div className='h-auto'>
        <h1 className='text-4xl uppercase font-semibold text-center'>Explore in {params.categoryName} Collection:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {productsByCategory?.map((product) => (
          <CardComponent key={product._id} product={product} isLoading={productsByCategoryLoading} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage