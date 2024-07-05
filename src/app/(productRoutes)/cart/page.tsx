"use client"
import { truncateDescription } from "@/utils/commonUtils"
import { List, Button, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addItemsToCart,
  deleteItemFromCart,
  removeItemsFromCart,
} from "@/lib/slices/cartSlice"

export const dynamic = "force-dynamic"

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cart)

  const handleDeleteItemFromCart = (selectedSize: string) => {
    dispatch(deleteItemFromCart(selectedSize))
    message.info("Item removed from Cart!")
  }

  const handleAddItemToCart = (productDetails, selectedSize) => {
    const productToBeAdded = { ...productDetails, selectedSize }
    dispatch(addItemsToCart({ item: productToBeAdded, quantity: 1 }))
    message.success(`Item of size ${selectedSize.toUpperCase()} added to the Cart!`)
  }

  const handleRemoveItemFromCart = (productDetails, selectedSize) => {
    const productToBeRemoved = { ...productDetails, selectedSize }
    dispatch(removeItemsFromCart({ item: productToBeRemoved, quantity: 1 }))
    message.info(`Item removed from the Cart!`)
  }

  if (cartItems.length < 1) {
    return (
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <SearchOutlined className="text-6xl mb-5 text-secondary" />
        <h1 className="text-3xl">You don't have any items wishlisted yet</h1>
      </div>
    )
  }

  console.log(cartItems)
  return (
    <div className="container mx-auto max-w-6xl p-10">
      <h1 className="text-4xl uppercase font-semibold text-center mb-8">
        Your Cart:
      </h1>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        locale={{ emptyText: "You don't have any items wishlisted yet" }}
        dataSource={cartItems}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            className="border-gray-400 rounded-lg shadow-lg my-4"
            extra={
              <Link href={`/product/${item._id}`}>
                <Image
                  width={200}
                  height={200}
                  className="object-cover rounded-xl w-[150px] h-[150px]"
                  alt={item.name}
                  src="https://via.placeholder.com/300x300/ff0000"
                />
              </Link>
            }
          >
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold mb-2">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </h1>
              <span className=" text-gray-500 mb-1">
                {truncateDescription(item.description)}
              </span>
              <p>
                Size:{" "}
                <span className="text-lg font-semibold mb-1">
                  {item?.selectedSize.toUpperCase()}
                </span>
              </p>

              <p>
                Price:{" "}
                <span className="text-lg font-semibold">${item?.price}</span>
              </p>

              <div className="flex">
                <div className="flex justify-center items-center mr-4">
                  <Button
                    onClick={() =>
                      handleRemoveItemFromCart(item, item.selectedSize)
                    }
                    type="default"
                    className="bg-secondary text-white text-lg w-min mt-2"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg px-3">{item.quantity}</span>
                  <Button
                    onClick={() => handleAddItemToCart(item, item.selectedSize)}
                    type="default"
                    className="bg-secondary text-white text-lg w-min mt-2"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => handleDeleteItemFromCart(item.selectedSize)}
                  type="default"
                  className="border-secondary text-secondary text-lg w-min mt-2"
                >
                  Remove Item
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Cart
