"use client"

import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useRouter } from "next/navigation"
import ButtonComponent from "@/components/ui/ButtonComponent"
import {CheckCircleOutlined} from "@ant-design/icons"

export default function OrderSuccessPage() {
  const router = useRouter()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGoBack = () => {
    router.push("/", undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={400}
        tweenDuration={10000}
        recycle={false}
      />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center">
        <div>
          <span>
            <CheckCircleOutlined className="text-6xl text-secondary" />
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-secondary">
            Order Placed Successfully!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <ButtonComponent
            onClick={handleGoBack}
            title="Return to Home"
            textColor="text-white"
            bgColor="bg-secondary"
          />
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            You will receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  )
}