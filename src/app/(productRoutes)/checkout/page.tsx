"use client"
import React from "react"
import { Form, Input, message } from "antd"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import ButtonComponent from "@/components/ui/ButtonComponent"
import BillComponent from "@/components/ui/BillComponent"
import { useGetUserDetailsQuery } from "@/lib/api-slices/userApiSlice"

const CheckoutPage = () => {
  const [form] = Form.useForm()
  const userState = useSelector((state) => state.user.currentUser)
  const { data: user } = useGetUserDetailsQuery(userState._id)
  const cartProducts = user?.cart || []
  console.log(cartProducts)
  const router = useRouter()

  const onFinish = (values) => {
    const { phoneNumber, deliveryAddress } = values

    try {
      const orderProducts = cartProducts.map((product) => ({
        product: product.productId._id,
        quantity: product.quantity,
        selectedSize: product.selectedSize
      }))

      const orderDetails = JSON.stringify({
        user: user?._id,
        products: orderProducts,
        phoneNumber,
        deliveryAddress,
        totalAmount: calculateTotalPrice(cartProducts),
      })

      message.loading("Redirecting to payment page")
      router.push(`/payment?orderDetails=${encodeURIComponent(orderDetails)}`)
    } catch (error) {
      console.error("Error preparing order details:", error)
      message.error("Failed to proceed to payment")
    }
  }

  const calculateTotalPrice = (cartProducts) => {
    return cartProducts.reduce((total, product) => total + product.productId.price * product.quantity, 0)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Select delivery address:</h1>
      <div className="flex flex-row justify-evenly">
        <Form
          className="w-full px-10"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter a valid phone number",
                max: 10,
                min: 10,
              },
            ]}
          >
            <Input
              type="number"
              maxLength={10}
              placeholder="Enter your phone number.."
            />
          </Form.Item>
          <Form.Item
            name="deliveryAddress"
            label="Delivery Address"
            rules={[
              { required: true, message: "Please enter your delivery address" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter your delivery address.."
            />
          </Form.Item>
          <Form.Item>
            <ButtonComponent
              htmlType="submit"
              title="Continue"
              bgColor="bg-secondary"
              textColor="text-white"
            />
          </Form.Item>
        </Form>

        <BillComponent />
      </div>
    </div>
  )
}

export default CheckoutPage