"use client"
import { removeItemFromWishlist } from "@/lib/slices/wishlistSlice"
import { List, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import WishlistItemComponent from "@/components/ui/WishlistItemComponent"

export const dynamic = "force-dynamic"

const Wishlist = () => {
  const dispatch = useDispatch()
  const wishlistedItems = useSelector(
    (state: any) => state.wishlistedItems.wishlistedItems,
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
          pageSize: 5,
          hideOnSinglePage: true
        }}
        locale={{ emptyText: "You don't have any items wishlisted yet" }}
        dataSource={wishlistedItems}
        renderItem={(item: any) => (
          <WishlistItemComponent
            item={item}
            handleDeleteItem={() => handleRemoveItemFromWishlist(item._id)}
          />
        )}
      />
    </div>
  )
}

export default Wishlist
