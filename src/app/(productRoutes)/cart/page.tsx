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
import BillComponent from "@/components/ui/BillComponent"
import { Elements } from "@stripe/react-stripe-js"
import Checkout from "../checkout/page"
import { getCheckoutPriceToPay } from "@/common/utils"
import { loadStripe } from "@stripe/stripe-js"

export const dynamic = "force-dynamic"
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY isn't defined",
  )
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cart)

  const handleDeleteItemFromCart = (id,selectedSize: string) => {
    dispatch(deleteItemFromCart({id, selectedSize}))
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
        <h1 className="text-3xl">Your Cart is empty</h1>
      </div>
    )
  }
  const items = useSelector((state)=> state.cart.cart)
  const CHECKOUT_PRICE_TO_PAY = getCheckoutPriceToPay(items)


  return (
    <div className="container mx-auto max-w-6xl p-10">
      <h1 className="text-4xl uppercase font-semibold text-center mb-8">
        Your Cart:
      </h1>
      <div className="flex flex-row justify-evenly">
      <List
       className="w-full mx-8"
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
            handleDeleteItem={() => handleDeleteItemFromCart(item._id, item.selectedSize)}
          />
        )}
      />
      <BillComponent />
      {/* <Elements stripe={stripePromise} options={{
        mode: "payment",
        amount: CHECKOUT_PRICE_TO_PAY,
        currency: "inr",
      }}>
        <Checkout amount={CHECKOUT_PRICE_TO_PAY} />
      </Elements> */}
      </div>
    </div>
  )
}

export default Cart
