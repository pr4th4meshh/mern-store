"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { message, Button } from "antd"
import { useCreateOrderMutation } from "@/lib/api-slices/ordersApiSlice"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { clearCartItems } from "@/lib/slices/cartSlice"
import { useClearUserCartMutation } from "@/lib/api-slices/userApiSlice"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  productImages: string[];
  ratings: string[];
}

const PaymentPage = () => {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState(null)
  const [createOrder] = useCreateOrderMutation()
  const [clearUserCart] = useClearUserCartMutation()
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user.currentUser)

  useEffect(() => {
    const details = searchParams.get("orderDetails")
    if (details) {
      const parsedDetails = JSON.parse(decodeURIComponent(details))
      setOrderDetails(parsedDetails)
    } else {
      message.error("Order details not found")
      router.push("/") // Redirect to home or error page
    }
  }, [searchParams, router])

  const validateOrderDetails = (orderDetails: any) => {
    if (!orderDetails || !orderDetails.products) {
      return false
    }
    return orderDetails.products.every(({ product, quantity, selectedSize }: {product: Product; quantity: number; selectedSize: string}) => product && quantity && selectedSize)
  }

  const paymentHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!orderDetails || !validateOrderDetails(orderDetails)) {
      message.error("Order details are invalid. Each product must have a valid product ID and quantity.")
      return
    }

    const { totalAmount } = orderDetails
    const currency = "INR"
    const receiptId = "qwsaq1" // You may want to generate a unique receiptId

    try {
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        body: JSON.stringify({
          amount: 1, // amount in paise
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to initiate payment")
      }

      const order = await response.json()
      console.log(order)

      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: 1,
        currency,
        name: "Re-Inventory",
        description: "Buying products",
        image: "",
        order_id: order.id,
        handler: async function (response: any) {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }

          try {
            const validateRes = await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              },
            )

            if (!validateRes.ok) {
              throw new Error("Failed to verify payment")
            }

            const jsonRes = await validateRes.json()
            console.log(jsonRes)

            if (jsonRes.msg === "success") {
              await createOrder(orderDetails)
              message.success("Order created successfully!")
              await clearUserCart(user._id).unwrap()
              dispatch(clearCartItems())
              router.push("/order-success")
            } else {
              message.error("Payment verification failed")
            }
          } catch (error) {
            console.error("Error verifying payment:", error)
            message.error("Failed to verify payment")
          }
        },
        prefill: {
          name: "re-inventory",
          email: "help.reinventory@rein.com",
          contact: "7506096826",
        },
        notes: {
          address: "Re-Inventory, India",
        },
        theme: {
          color: "#f58d42",
        },
      }

      var rzp1 = new window.Razorpay(options)
      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code)
        alert(response.error.description)
        alert(response.error.source)
        alert(response.error.step)
        alert(response.error.reason)
        alert(response.error.metadata.order_id)
        alert(response.error.metadata.payment_id)
      })
      rzp1.open()
      e.preventDefault()
    } catch (error) {
      console.error("Error initiating payment:", error)
      message.error("Failed to initiate payment")
    }
  }

  const handleCashOnDelivery = async () => {
    if (!orderDetails || !validateOrderDetails(orderDetails)) {
      message.error("Order details are invalid. Each product must have a valid product ID and quantity.")
      return
    }
    try {
      await createOrder(orderDetails)
      message.success("Order created successfully!")
      await clearUserCart(user._id).unwrap()
      dispatch(clearCartItems())
      router.push("/order-success")
    } catch (error) {
      console.error("Error verifying payment:", error)
      message.error("Failed to verify payment")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Complete Your Payment</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your preferred payment method below
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={paymentHandler}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Pay Now with Razorpay
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
          <Button 
            onClick={handleCashOnDelivery}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cash on Delivery
          </Button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage