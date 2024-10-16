"use client"
import React from "react"
import Confetti from "react-confetti"
import { useRouter } from "next/navigation"
import ButtonComponent from "@/components/ui/ButtonComponent"

const OrderSuccessPage = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.push("/", undefined)
  }

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100"
      style={{ height: "calc(100vh - 6rem)" }}
    >
      <Confetti
        style={{ width: "99vw" }}
        numberOfPieces={400}
        tweenDuration={10000}
        recycle={false}
      />
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-secondary mb-4 animate-fade-in">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-700 mb-2 animate-fade-in animation-delay-1">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <ButtonComponent
          onClick={handleGoBack}
          title="Go back Home"
          textColor="text-white"
          bgColor="bg-secondary"
        />
      </div>
    </div>
  )
}

export default OrderSuccessPage
