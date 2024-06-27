import React from 'react'
import CardComponent from './CardComponent'
import CategoryCard from './CategoryCard'

const CategoriesComponent = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  )
}

export default CategoriesComponent
