'use client'
import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import CardComponent from '@/components/ui/CardComponent'
import { useGetProductsByCategoryQuery } from '@/lib/api-slices/productsApiSlice'

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
  const { data: productsByCategory, isLoading: productsByCategoryLoading, refetch: productsByCategoryRefetch } = useGetProductsByCategoryQuery(params.categoryName)
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    productsByCategoryRefetch();
  }, [productsByCategoryRefetch]);

  useEffect(() => {
    setFilteredProducts(productsByCategory);
  }, [productsByCategory]);

  const handleFilterChange = (filterKey) => {
    let sortedProducts = [...productsByCategory];
    switch (filterKey) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "color-red":
        sortedProducts = productsByCategory.filter((product) => product.color === "Cream");
        break;
      case "color-blue":
        sortedProducts = productsByCategory.filter((product) => product.color === "blue");
        break;
      case "color-green":
        sortedProducts = productsByCategory.filter((product) => product.color === "green");
        break;
      default:
        sortedProducts = productsByCategory;
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const priceMenu = (
    <Menu onClick={({ key }) => handleFilterChange(key)}>
      <Menu.Item key="price-low-high">Price: Low to High</Menu.Item>
      <Menu.Item key="price-high-low">Price: High to Low</Menu.Item>
    </Menu>
  );

  const colorMenu = (
    <Menu onClick={({ key }) => handleFilterChange(key)}>
      <Menu.Item key="color-red">Red</Menu.Item>
      <Menu.Item key="color-blue">Blue</Menu.Item>
      <Menu.Item key="color-green">Green</Menu.Item>
    </Menu>
  );

  return (
      <div className='h-auto container mx-auto p-10'>
        <h1 className='text-4xl uppercase text-center'>Explore in {params.categoryName} Collection:</h1>
        <div className='flex justify-center gap-4 my-4'>
          <Dropdown overlay={priceMenu} trigger={['click']}>
            <Button>
              Sort by Price <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={colorMenu} trigger={['click']}>
            <Button>
              Sort by Color <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProducts?.map((product) => (
            <CardComponent key={product._id} product={product} isLoading={productsByCategoryLoading} />
          ))}
          {filteredProducts.length === 0 && <h1>no prods found</h1> }
        </div>
      </div>
  )
}

export default CategoryPage
