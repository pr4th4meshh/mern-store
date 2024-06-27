import { ProductOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import Image from 'next/image'
import ProductImage from '../../../public/reinhero.webp'
import ButtonComponent from './ButtonComponent'
import Link from 'next/link'

const CategoryCard = ({
  productName,
  icon,
  createdBy,
  createdAt,
  loading,
  productId,
}: any) => {
  return (
    <>
      <Card bodyStyle={{ padding: 0 }} className="border-none">
        <div className="flex flex-col">
          <Image
            src={ProductImage}
            alt="product image"
            height="0"
            width="0"
            sizes="100vw"
            className="w-full h-[450px] object-cover rounded-2xl"
          />
          <div className="w-full h-[450px] rounded-2xl bg-black absolute z-1 opacity-50"></div>
          <div className="flex flex-col py-2 absolute top-[300px] ml-10">
            <h1 className="text-4xl text-white">MENS</h1>
            <Link href={'/category/mens'}>
              <ButtonComponent
                title="See Details"
                bgColor="bg-white"
                textColor="text-black"
              />
            </Link>
          </div>
        </div>
      </Card>
    </>
  )
}

export default CategoryCard
