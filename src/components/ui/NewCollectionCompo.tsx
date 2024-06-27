import React from 'react'
import CardComponent from './CardComponent'

const NewCollectionComponent = () => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="uppercase text-6xl text-center ">new collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />

      </div>
    </div>
  )
}

export default NewCollectionComponent
