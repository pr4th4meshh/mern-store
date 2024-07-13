import React from "react"
import { useSelector } from "react-redux"
import ButtonComponent from "./ButtonComponent"
import { Button } from "antd"
import { loadStripe } from "@stripe/stripe-js"
import {
  calculateTotalPrice,
  gstConversion,
  GST_PERCENTAGE,
} from "../../common/utils"
import Link from "next/link"
import { Elements } from "@stripe/react-stripe-js"
import Checkout from "@/app/(productRoutes)/checkout/page"

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY isn't defined",
  )
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const BillComponent = () => {
  const items = useSelector((state) => state.cart.cart)
  const getItemQuantity = (itemID) => {
    const item = items.find((item) => item._id === itemID)
    return item ? item.quantity : 0
  }

  const getItemTotalPrice = (item) => {
    return item.price * getItemQuantity(item._id)
  }

  const totalPriceToCheckout = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

    const CHECKOUT_PRICE_TO_PAY = calculateTotalPrice(
    totalPriceToCheckout,
    GST_PERCENTAGE,
  )
  console.log(CHECKOUT_PRICE_TO_PAY)

  return (
    <div className="p-6 shadow-lg border h-min w-[500px]">
      <h1 className="text-xl pb-1">Order summary:</h1>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex flex-row p-1 text-lg text-gray-500 justify-between"
        >
          <div>
            <span className="mr-2">X{getItemQuantity(item._id)}</span>
            <span>
              {item.name} ({item.selectedSize.toUpperCase()})
            </span>
          </div>
          <span className="ml-8">&#8377;{getItemTotalPrice(item)}</span>
        </div>
      ))}
      <div className="border-t border-gray-500 p-4">
        <span className="flex text-lg text-gray-500 justify-center">
          Items Total: &#8377;
          {totalPriceToCheckout}
        </span>
        <span className="flex text-lg text-gray-500 justify-center">
          GST: &#8377;
          {gstConversion(GST_PERCENTAGE, totalPriceToCheckout)}
        </span>
      </div>
      <span className="flex text-xl text-gray-500 justify-center border-y border-secondary p-4 font-semibold">
        Order Total: &#8377;
        {CHECKOUT_PRICE_TO_PAY}
      </span>
      <Link href={"/checkout"}>
        <Button className="p-6 my-4 rounded-full w-full bg-secondary text-white uppercase text-lg">
          Checkout
        </Button>
      </Link>
    </div>
  )
}

export default BillComponent
