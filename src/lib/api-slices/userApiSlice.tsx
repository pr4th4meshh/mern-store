import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApiSlice = createApi({
  reducerPath: "clientSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_USER_API_SLICE_KEY,
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    editUser: builder.mutation({
      query: ({ id, ...values }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Client"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    addItemToUserCart: builder.mutation({
      query: ({ userId, item }) => ({
        url: `/cart/${userId}`,
        method: "POST",
        body: item,
      }),
    }),
    clearUserCart: builder.mutation({
      query: (userId) => ({
        url: `/cart/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
    removeItemsFromUserCart: builder.mutation({
      query: ({ userId, productId, selectedSize }) => ({
        url: `/cart/${userId}/remove`,
        method: "POST",
        body: { productId, selectedSize },
      }),
      invalidatesTags: ["Client"],
    }),
    reduceItemFromUserCart: builder.mutation({
      query: ({userId, productId, selectedSize }) => ({
        url: `/cart/${userId}/reduceQuantity`,
        method: "POST",
        body: { productId, selectedSize },
      }),
      invalidatesTags: ["Client"]
    })
  }),
})

export const {
  useEditUserMutation,
  useGetUserDetailsQuery,
  useAddItemToUserCartMutation,
  useClearUserCartMutation,
  useRemoveItemsFromUserCartMutation,
  useReduceItemFromUserCartMutation
} = userApiSlice
