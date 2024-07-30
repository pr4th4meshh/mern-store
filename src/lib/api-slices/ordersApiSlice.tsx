import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

export const ordersApiSlice = createApi({
  reducerPath: "orders",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ORDERS_API_KEY,
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
        query: (orderData) => ({
          url: '/create',
          method: 'POST',
          body: orderData,
        }),
      }),
      getOrderStatus: builder.query({
        query: (orderId) => `/orders/${orderId}/status`,
      }),
      updateOrderStatus: builder.mutation({
        query: ({ orderId, status }) => ({
          url: `/orders/${orderId}/status`,
          method: 'PATCH',
          body: { status },
        }),
      }),
      getAllUserOrders: builder.query({
        query: (userId) => `/${userId}/allOrders`
      })
  }),
})

export const {
    useCreateOrderMutation,
    useGetOrderStatusQuery,
    useUpdateOrderStatusMutation,
    useGetAllUserOrdersQuery
} = ordersApiSlice
