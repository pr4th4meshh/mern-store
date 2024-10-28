"use client"
import React, { useEffect } from "react"
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { Button, List, Popconfirm, Space } from "antd"
import { useGetAllUserOrdersQuery } from "@/lib/api-slices/ordersApiSlice"
import { useSelector } from "react-redux"
import Image from "next/image"
import moment from "moment"
import Link from "next/link"

const Orders_Page = () => {
  const user = useSelector((state: any) => state.user.currentUser)
  const { data: userCart, refetch } = useGetAllUserOrdersQuery(user._id)
  useEffect(() => {
    refetch()
  }, [refetch])

  if (!userCart || userCart.length < 1) {
    return (
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <StarOutlined className="text-6xl mb-5 text-secondary" />
        <h1 className="text-3xl">Start with your first Order</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl p-10">
      <h1 className="text-3xl font-bold mb-8">Track your order(s):</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={userCart}
        renderItem={(item: any) => (
          <List.Item
            className="border-gray-400 rounded-lg shadow-lg my-4"
            key={item.products?.name}
            extra={
              <Image
                width={200}
                height={200}
                className="object-cover rounded-xl w-[150px] h-[150px]"
                alt="logo"
                src={"https://via.placeholder.com/600x600"}
              />
            }
          >
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Products:</h1>
              {item.products.map((product: any, i: number) => (
                <Link href={`/product/${product.product._id}`}>
                  <span className="text-lg">
                    {" "}
                    &#8599; {product.product.name}
                  </span>
                </Link>
              ))}
              <h1 className="text-lg">
                <span className="font-semibold">Order Id:</span> {item._id}
              </h1>
              <h1 className="text-xl font-semibold text-secondary">
                Order Status:{" "}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </h1>
              <h1 className="text-lg">
                on {moment(item.updatedAt).format("D MMM YYYY")}
              </h1>
              <Popconfirm
                title="Cancel order"
                description="Are you sure you want to cancel the order?"
                onConfirm={() => null}
                onCancel={() => null}
                okText="Confirm"
                cancelText="Cancel"
                placement="right"
                icon={
                  <ExclamationCircleOutlined
                    style={{ color: "red", fontSize: 18 }}
                  />
                }
              >
                <Button className="w-min mt-2" danger>
                  Cancel Order
                </Button>
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Orders_Page
