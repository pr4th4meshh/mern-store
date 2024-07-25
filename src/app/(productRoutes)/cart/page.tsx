"use client"
import { Button, List, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addItemsToCart,
  deleteItemFromCart,
  removeItemsFromCart,
  clearCartItems,
} from "@/lib/slices/cartSlice"
import ListItemComponent from "@/components/ui/ListItemCompo"
import BillComponent from "@/components/ui/BillComponent"
import { getCheckoutPriceToPay } from "@/common/utils"
import { loadStripe } from "@stripe/stripe-js"
import {
  useClearUserCartMutation,
  useRemoveItemsFromUserCartMutation,
  useGetUserDetailsQuery,
  useAddItemToUserCartMutation,
  useReduceItemFromUserCartMutation,
} from "@/lib/api-slices/userApiSlice"

export const dynamic = "force-dynamic"

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY isn't defined",
  )
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const { data: userDetails, refetch } = useGetUserDetailsQuery(user?._id, {
    skip: !user,
  })
  const [clearUserCart] = useClearUserCartMutation()
  const [removeItemsFromUserCart] = useRemoveItemsFromUserCartMutation()
  const [addItemToUserCart] = useAddItemToUserCartMutation()
  const [reduceItemFromUserCart] = useReduceItemFromUserCartMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const cartItems = userDetails?.cart || []
  console.log("uds", userDetails)
  useEffect(() => {
    if (userDetails && userDetails.cart) {
      userDetails.cart.forEach((item) => {
        dispatch(addItemsToCart({ item, quantity: item.quantity }))
      })
    }
  }, [userDetails, dispatch])

  const handleClearCart = async () => {
    if (!user) {
      message.warning("You need to login/register to perform this action!")
      return
    }
    try {
      await clearUserCart(user._id).unwrap()
      dispatch(clearCartItems())
      message.success("Cart cleared successfully!")
      refetch()
    } catch (error) {
      console.error("Failed to clear cart:", error)
      message.error("Failed to clear cart!")
    }
  }

  const handleDeleteItemFromCart = async (productId, selectedSize) => {
    if (!user) {
      message.warning("You need to login/register to perform this action!")
      return
    }
    try {
      await removeItemsFromUserCart({
        userId: user._id,
        productId,
        selectedSize,
      }).unwrap()
      message.info("Item removed from Cart!")
      dispatch(deleteItemFromCart({ id: productId, selectedSize }))
      refetch()
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
      message.error("Failed to remove item from cart!")
    }
  }

  const handleAddItemToCart = async (productDetails, selectedSize) => {
    if (!user) {
      message.warning("You need to login/register to perform this action!")
      return
    }

    try {
      const {
        productId: { _id, name, description, price, category },
      } = productDetails

      // Create the productToBeAdded object with the required structure
      const productToBeAdded = {
        productId: _id,
        name,
        description,
        price,
        category,
        selectedSize,
        quantity: 1,
      }

      await addItemToUserCart({
        userId: user._id,
        item: productToBeAdded,
      }).unwrap()

      dispatch(addItemsToCart({ item: productToBeAdded, quantity: 1 }))

      message.success(
        `Item of size ${selectedSize.toUpperCase()} added to the Cart!`,
      )
      refetch()
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      message.error("Failed to add item to cart!")
    }
  }

  const handleReduceItemFromCart = async (productId, selectedSize) => {
    if (!user) {
      message.warning("You need to login/register to perform this action!")
      return
    }
    try {
      await reduceItemFromUserCart({
        userId: user._id,
        productId,
        selectedSize,
      }).unwrap()
      dispatch(
        removeItemsFromCart({
          item: { id: productId, selectedSize },
          quantity: 1,
        }),
      )
      message.info(`Item quantity updated or removed from the Cart!`)
      refetch()
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
      message.error("Failed to remove item from cart!")
    }
  }

  if (!cartItems || cartItems.length < 1) {
    return (
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <SearchOutlined className="text-6xl mb-5 text-secondary" />
        <h1 className="text-3xl">Your Cart is empty</h1>
      </div>
    )
  }

  const CHECKOUT_PRICE_TO_PAY = getCheckoutPriceToPay(cartItems)

  return (
    <div className="container mx-auto max-w-6xl p-10">
      <h1 className="text-4xl uppercase font-semibold text-center mb-8">
        Your Cart:
      </h1>
      <Button onClick={handleClearCart}>Clear Cart</Button>
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
          renderItem={(item) => (
            <ListItemComponent
              item={item}
              showQuantityCounter={true}
              handleAddQuantity={() =>
                handleAddItemToCart(item, item.selectedSize)
              }
              handleRemoveQuantity={() =>
                handleReduceItemFromCart(item.productId._id, item.selectedSize)
              }
              handleDeleteItem={() =>
                handleDeleteItemFromCart(item.productId._id, item.selectedSize)
              }
            />
          )}
        />
        <BillComponent cartButton />
      </div>
    </div>
  )
}

export default Cart
