// app/components/NewCollectionComponent.tsx
"use client"
import React, { useEffect, useState } from "react"
import CardComponent from "./CardComponent"
import { fetchProductData } from "@/actions"
import { useGetAllProductsQuery } from "@/lib/api-slices/productsApiSlice"

const NewCollectionComponent = () => {
  const {data: productsData} = useGetAllProductsQuery(undefined)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const productsData = await fetchProductData()
      setProducts(productsData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Failed to fetch products", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="uppercase text-6xl text-center">New Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {productsData?.map((product) => (
          <CardComponent key={product.id} product={product} isLoading={loading} />
        ))}
      </div>
    </div>
  )
}

export default NewCollectionComponent
