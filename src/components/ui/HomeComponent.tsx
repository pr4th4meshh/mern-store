import HeroImage from '../../../public/reinhero.webp'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeComponent = () => {
  return (
    <div className="relative p-10 flex justify-center">
      <Image
        src={HeroImage}
        alt="sdf"
        width="0"
        height="0"
        sizes="100vw"
        className="w-[90vw] h-[75vh] rounded-2xl absolute object-cover"
        quality={100}
        priority
      />
      <div className="w-[90vw] h-[75vh] rounded-2xl bg-black absolute z-1 opacity-50"></div>
      <div className="relative top-[500px] text-white flex flex-row items-end">
        <Link href="/featured">
          <div className=" flex flex-col justify-center hover:ease-in-out hover:text-secondary">
            <h1 className="text-7xl">RE-IN SPRING COLLECTION</h1>
            <p className="text-3xl text-center underline">TAP HERE TO SHOP</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomeComponent
