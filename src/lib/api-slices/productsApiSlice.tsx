import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApiSlice = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (name) => {
        if (name) {
          return `/product/${name}`
        }
        return "/all"
      },
      providesTags: ["Product"],
    }),
  }),
})

export const { useGetAllProductsQuery } = productsApiSlice
