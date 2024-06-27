import { ProductOutlined } from '@ant-design/icons'
import { Avatar, Card, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import Image from 'next/image'
import ProductImage from '../../../public/reinhero.webp'

const CardComponent = ({
  icon,
  loading,
}: any) => {
  return (
    <>
      {loading ? (
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar icon={<ProductOutlined /> || icon} size={50} />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      ) : (
        <Card bodyStyle={{padding: 0}} className='border-none'>
          <div className="flex flex-col">
            <Image
              src={ProductImage}
              alt="product image"
              height="0"
              width="0"
              sizes="100vw"
              className="md:w-[400px] md:h-[400px] h-[360px] w-full object-cover rounded-2xl"
              placeholder='blur'
            />
            <div className="flex flex-col py-2">
              <h1 className="text-xl font-semibold">
                {/* {productName?.length > 10
                  ? productName?.slice(0, 9) + '..'
                  : productName} */}
                Gray pants
              </h1>
              <h3 className="text-gray-400">Slim Fit Mens Pant</h3>
              <h1 className="text-lg font-semibold">$90</h1>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default CardComponent
