"use client"
import { removeItemFromWishlist } from "@/lib/slices/wishlistSlice"
import { truncateDescription } from "@/utils/commonUtils"
import { List, Button, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

export const dynamic = "force-dynamic"

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlistedItems = useSelector(
    (state) => state.wishlistedItems.wishlistedItems,
  )

  const handleRemoveItemFromWishlist = (itemId: string) => {
    dispatch(removeItemFromWishlist(itemId))
    message.success("Item removed from Wishlist!")
  }

  if (wishlistedItems.length < 1) {
    return (
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <SearchOutlined className="text-6xl mb-5 text-secondary" />
        <h1 className="text-3xl">You don't have any items wishlisted yet</h1>
      </div>
    )
  }
  return (
    <div className="container mx-auto max-w-6xl p-10">
      <h1 className="text-4xl uppercase font-semibold text-center mb-8">
        You Wishlisted:
      </h1>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        locale={{ emptyText: "You don't have any items wishlisted yet" }}
        dataSource={wishlistedItems}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            className="border-gray-400 rounded-lg shadow-lg my-4"
            extra={
              <Link href={`/product/${item._id}`}>
                <Image
                  width={300}
                  height={300}
                  className="object-cover rounded-xl w-[200px] h-[200px]"
                  alt={item.name}
                  src="https://via.placeholder.com/300x300/ff0000"
                />
              </Link>
            }
          >
            <div className="flex flex-col">
              <h1 className="text-3xl mb-2">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </h1>
              <span className=" text-gray-500 mb-1">
                {truncateDescription(item.description)}
              </span>
              <span className="mb-1">Price:</span>
              <p className="text-lg font-semibold mb-3">${item?.price}</p>
              <Button
                onClick={() => handleRemoveItemFromWishlist(item._id)}
                type="default"
                className="border-secondary text-secondary cursor-pointer text-lg w-min"
              >
                Remove item from Wishlist
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Wishlist
