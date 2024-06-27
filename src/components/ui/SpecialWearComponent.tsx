import React from 'react'
import Image from 'next/image'
import HeroImage from '../../../public/reinwedding.webp'
import ButtonComponent from './ButtonComponent'
import Link from 'next/link'

const SpecialWearComponent = () => {
  return (
    <div className="h-[90vh] pt-24 flex flex-col justify-center items-center">
      <Image
        src={HeroImage}
        alt="sdf"
        width="0"
        height="0"
        sizes="100vw"
        className="h-[35vh] w-[90vw] rounded-2xl object-cover"
        quality={100}
        priority
        placeholder="blur"
      />
      <h1 className="uppercase text-6xl text-center mt-8 mb-3">
        wear to wedding
      </h1>
      <Link href={'/special'}>
        <ButtonComponent
          title="See Details"
          textColor="text-white"
          bgColor="bg-black"
        />
      </Link>
    </div>
  )
}

export default SpecialWearComponent
