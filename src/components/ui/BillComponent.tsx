import React from "react"
import { useSelector } from "react-redux"
import ButtonComponent from "./ButtonComponent"
import { Button } from "antd"

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

  const GST_PERCENTAGE = 3
  const gstConversion = (percentage: number, total: number) => {
    const calculatedAmount = (percentage / 100) * total
    return calculatedAmount.toFixed(2)
  }

  const calculateTotalPrice = (subTotal: number, gstPercentage: number) => {
    const gstAmount = (gstPercentage / 100) * subTotal
    const totalPrice = subTotal + gstAmount
    const roundedTotalPrice = Math.round(totalPrice * 100) / 100
    return roundedTotalPrice
  }

  return (
    <div className="p-6 shadow-lg border h-min w-[500px]">
      <h1 className="text-xl pb-1">Order summary:</h1>
      {items.map((item) => (
        <div className="flex flex-row p-1 text-lg text-gray-500 justify-between">
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
        {calculateTotalPrice(totalPriceToCheckout, GST_PERCENTAGE)}
      </span>
      <span className="flex text-lg text-gray-500 justify-center">
        GST: &#8377;
        {gstConversion(GST_PERCENTAGE, totalPriceToCheckout)}
      </span>
      </div>
      <span className="flex text-xl text-gray-500 justify-center border-y border-secondary p-4 font-semibold">
        Order Total: &#8377;
        {calculateTotalPrice(totalPriceToCheckout, GST_PERCENTAGE)}
      </span>
      <Button className="p-6 my-4 rounded-full w-full bg-secondary text-white uppercase text-lg">Checkout</Button>
    </div>
  )
}

export default BillComponent
