import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const paymentApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
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
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/api/payment/order",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (body) => ({
        url: "/api/payment/verify",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useCreateOrderMutation, useVerifyPaymentMutation } =
  paymentApiSlice
