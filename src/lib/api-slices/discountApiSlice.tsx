import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const discountApiSlice = createApi({
  reducerPath: "discount",
  tagTypes: ["Discounts"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_DISCOUNT_API_KEY,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    validateDiscount: builder.mutation({
      query: (values) => ({
        url: "/validate-discount",
        method: "POST",
        body: values,
      }),
    }),
    applyDiscount: builder.mutation({
      query: (values) => ({
        url: "/apply-discount",
        method: "POST",
        body: values,
      }),
    }),
  }),
})

export const { useApplyDiscountMutation, useValidateDiscountMutation } = discountApiSlice
