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
    getProductById: builder.query({
      query: (id) => `/product/id/${id}`,
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.mutation({
      query: (categoryName) => ({
        url: `/category/${categoryName}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query({
      query:() => "/categories/all"
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryMutation,
  useGetAllCategoriesQuery,
} = productsApiSlice
