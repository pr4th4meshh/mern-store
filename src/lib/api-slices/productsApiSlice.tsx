import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApiSlice = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_API_SLICE_KEY,
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
    getProductById: builder.query({
      query: (id) => `/product/id/${id}`,
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.query({
      query: (categoryName) => `/category/${categoryName}`
    }),
    getAllCategories: builder.query({
      query:() => "/categories/all"
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
} = productsApiSlice
