"use client"
import React from "react"
import { Form, Input, message } from "antd"
import { useCreateOrderMutation } from "@/lib/api-slices/ordersApiSlice"
import { useSelector } from "react-redux"
import ButtonComponent from "@/components/ui/ButtonComponent"
import BillComponent from "@/components/ui/BillComponent"
import { redirect } from "next/navigation"

const CheckoutPage = () => {
  const [form] = Form.useForm()
  const [addOrder, { isLoading, isError }] = useCreateOrderMutation()

  const cartProducts = useSelector((state) => state.cart.cart)
  const user = useSelector((state) => state.user.currentUser)

  const onFinish = async (values) => {
    const { phoneNumber, deliveryAddress } = values

    try {
      const orderProducts = cartProducts.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      }))

      await addOrder({
        user: user?._id,
        products: orderProducts,
        phoneNumber,
        deliveryAddress,
      })
      redirect("/payment")
    } catch (error) {
      console.error("Error placing order:", error)
      message.error("Failed to place order")
    }
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
          {isError && <h1>Some error occured {isError}</h1>}
        </Form>

        <BillComponent showButton={false} />
      </div>
    </div>
  )
}

export default CheckoutPage
