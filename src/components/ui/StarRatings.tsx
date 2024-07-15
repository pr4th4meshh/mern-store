import React, { useEffect, useState } from "react"
import { Rate, message } from "antd"
import { StarFilled } from "@ant-design/icons"
import {
  useAddRatingMutation,
  useGetProductByIdQuery,
  useGetRatingsQuery,
} from "@/lib/api-slices/productsApiSlice"
import { useSelector } from "react-redux"

const StarRating = ({ productId }: any) => {
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [, setUserRating] = useState(0)

  const user = useSelector((state) => state.user.currentUser)
  const {
    data: ratingsData = [],
    refetch,
    error,
  } = useGetRatingsQuery(productId)
  const [addRating] = useAddRatingMutation()
  const { data: productDetails, refetch: productDetailsRefetch } =
    useGetProductByIdQuery(productId)

  useEffect(() => {
    if (productDetails && user) {
      const userRating = productDetails.ratings.find(
        (rating: { user: string }) => rating.user.toString() === user._id,
      )
      if (userRating) {
        setUserRating(userRating.rating)
        setRating(userRating.rating)
      }
    }
  }, [productDetails, user])

  useEffect(() => {
    if (ratingsData && Array.isArray(ratingsData)) {
      const total = ratingsData.reduce((sum, { rating }) => sum + rating, 0)
      setAverageRating(ratingsData.length ? total / ratingsData.length : 0)
    }
  }, [ratingsData])

  const handleChange = async (value: any) => {
    if (!user) {
      message.error("You must be logged in to submit a rating.")
      return
    }

    setRating(value)
    try {
      await addRating({ id: productId, rating: value, user: user._id }).unwrap()
      message.success("Rating submitted successfully!")
      refetch()
    } catch (error) {
      console.error("Error submitting rating:", error)
      message.error("Error submitting rating.")
    }
  }

  if (error) {
    return <div>Error loading ratings: {error.message}</div>
  }

  return (
    <div>
      <h2>
        <StarFilled className="text-secondary pr-1" />
        {averageRating.toFixed(1)} / 5
      </h2>
      You rate this product: <br />{" "}
      <Rate value={rating} onChange={handleChange} />
    </div>
  )
}

export default StarRating
