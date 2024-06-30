import { Avatar, Card, Skeleton } from "antd"
import Image from "next/image"
import ProductImage from "../../../public/reinhero.webp"
import Link from "next/link"

const CardComponent = ({ icon, loading, product, isLoading, id }: any) => {
  return (
    <>
      {isLoading ? (
        <Skeleton.Image style={{ height: '450px', width: '100%' }} active />
      ) : (
        <Link href={`/product/${product._id}`} >
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
            <div className="flex flex-col py-2">
              <h1 className="text-xl font-semibold">
                {product.name.length > 30
                  ? product.name.slice(0, 9) + ".."
                  : product.name}
              </h1>
              <h3 className="text-gray-400">{product.description}</h3>
              <h1 className="text-lg font-semibold">${product.price}</h1>
            </div>
          </div>
        </Card>
        </Link>
      )}
    </>
  )
}

export default CardComponent
