import React from "react"
import Logo from "../../../public/REINlight.png"
import { Button } from "antd"

const PaymentButton = ({ amount }) => {
  const handlePayment = async (e) => {
    const currency = "INR"
    const receiptId = "qwsaq1"
    const response = await fetch("http://localhost:5000/api/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount: amount * 100,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const order = await response.json()
    console.log(order)
    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Re-Inventory", //your business name
      description: "Buying products",
      image: Logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        }

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
        const jsonRes = await validateRes.json()
        console.log(jsonRes)
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "re-inventory", //your customer's name
        email: "help.reinventory@rein.com",
        contact: "7506096826", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Re-Inventory, India",
      },
      theme: {
        color: "#f58d42",
      },
    }
    var rzp1 = new window.Razorpay(options)
    rzp1.on("payment.failed", function (response) {
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
  }

  return (
    <Button
      onClick={handlePayment}
      className="p-6 my-4 rounded-full w-full bg-secondary text-white uppercase text-lg"
    >
      Pay Now
    </Button>
  )
}

export default PaymentButton
