"use client"
import { List, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addItemsToCart,
  deleteItemFromCart,
  removeItemsFromCart,
} from "@/lib/slices/cartSlice"
import ListItemComponent from "@/components/ui/ListItemCompo"

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
    message.success(
      `Item of size ${selectedSize.toUpperCase()} added to the Cart!`,
    )
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
          <ListItemComponent
            item={item}
            showQuantityCounter={true}
            handleAddQuantity={() =>
              handleAddItemToCart(item, item.selectedSize)
            }
            handleRemoveQuantity={() =>
              handleRemoveItemFromCart(item, item.selectedSize)
            }
            handleDeleteItem={() => handleDeleteItemFromCart(item.selectedSize)}
          />
        )}
      />
    </div>
  )
}

export default Cart
