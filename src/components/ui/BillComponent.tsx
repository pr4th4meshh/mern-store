import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input, message, Space } from "antd"
import { loadStripe } from "@stripe/stripe-js"
import {
  calculateTotalPrice,
  gstConversion,
  GST_PERCENTAGE,
} from "../../common/utils"
import Link from "next/link"
import { useGetUserDetailsQuery } from "@/lib/api-slices/userApiSlice"
import { useValidateDiscountMutation } from "@/lib/api-slices/discountApiSlice"
interface ApiError {
  data?: {
    message?: string
  }
}

const BillComponent = ({ cartButton, onDiscountApplied, couponCode }: any) => {
  const [discountCode, setDiscountCode] = useState("")
  const [discountValue, setDiscountValue] = useState(0)
  const [finalAmount, setFinalAmount] = useState(0)
  const [discountError, setDiscountError] = useState<string | null>(null)

  const { data: items } = useGetUserDetailsQuery(
    useSelector((state: any) => state.user.currentUser)._id,
  )
  const [validateDiscount] = useValidateDiscountMutation()

  const getItemQuantity = (itemID: string) => {
    const item = items.cart?.find((item: any) => item._id === itemID)
    return item ? item.quantity : 0
  }

  const getItemTotalPrice = (item: any) => {
    return item.productId.price * getItemQuantity(item._id)
  }

  const totalPriceToCheckout = items.cart?.reduce(
    (total: number, item: any) => total + item.productId.price * item.quantity,
    0,
  )

  const CHECKOUT_PRICE_TO_PAY = calculateTotalPrice(
    totalPriceToCheckout,
    GST_PERCENTAGE,
  )

  const handleValidateDiscount = async () => {
    const cartTotal = CHECKOUT_PRICE_TO_PAY
    try {
      const result = await validateDiscount({
        code: discountCode,
        cartTotal,
      }).unwrap()
      const { discount } = result

      let newTotal = cartTotal

      // Apply discount based on type
      if (discount.discountType === "percentage") {
        newTotal = cartTotal - cartTotal * (discount.discountValue / 100)
        setDiscountValue((cartTotal * discount.discountValue) / 100)
      } else if (discount.discountType === "number") {
        newTotal = cartTotal - discount.discountValue
        setDiscountValue(discount.discountValue)
      }

      // setFinalAmount(newTotal)
      setFinalAmount(newTotal)
      onDiscountApplied(newTotal)
      couponCode(discountCode)
      message.success(result.message || "Discount applied successfully")
    } catch (error) {
      const typedError = error as ApiError
      const errorMessage =
        typedError.data?.message || "Failed to apply discount"
      message.error(errorMessage)
      setDiscountError(errorMessage)
    }
  }

  return (
    <div className="p-6 shadow-lg border rounded-lg bg-white w-[500px]">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      {items.cart.map((item: any) => (
        <div key={item._id} className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="mr-2 text-lg font-medium">
              X{getItemQuantity(item._id)}
            </span>
            <span className="text-lg">
              {item.productId.name} ({item.selectedSize.toUpperCase()})
            </span>
          </div>
          <span className="text-lg font-semibold">
            &#8377;{getItemTotalPrice(item)}
          </span>
        </div>
      ))}
      <div className="border-t border-gray-300 mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-lg">Items Total:</span>
          <span className="text-lg">&#8377;{totalPriceToCheckout}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-lg">GST:</span>
          <span className="text-lg">
            &#8377;{gstConversion(GST_PERCENTAGE, totalPriceToCheckout)}
          </span>
        </div>
        {discountValue > 0 && (
          <div className="flex justify-between mt-2">
            <span className="text-lg">Discount:</span>
            <span className="text-lg">&#8377; {discountValue}</span>
          </div>
        )}
        {cartButton ? null : (
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-lg font-semibold">Have a coupon?</h2>
            <Space.Compact style={{ width: "100%", marginTop: "10px" }}>
              <Input
                placeholder="ENTER COUPON CODE"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                style={{ borderRadius: "4px" }}
              />
              <Button
                type="primary"
                className="bg-secondary text-white uppercase"
                onClick={handleValidateDiscount}
              >
                Apply
              </Button>
            </Space.Compact>
            <div className="text-sm text-red-500 pt-2">{discountError}, continue without coupon or try another coupon.</div>
          </div>
        )}
      </div>
      <div className="flex justify-between text-xl font-bold border-t border-gray-300 mt-4 pt-4">
        <span>Order Total:</span>
        <span>
          &#8377;{finalAmount > 0 ? finalAmount : CHECKOUT_PRICE_TO_PAY}
        </span>
      </div>
      {cartButton && (
        <Link href="/checkout">
          <Button className="p-4 my-4 rounded-full w-full bg-secondary text-white uppercase text-lg">
            Checkout
          </Button>
        </Link>
      )}
    </div>
  )
}

export default BillComponent
