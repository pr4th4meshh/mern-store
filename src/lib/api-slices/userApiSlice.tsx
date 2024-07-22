import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApiSlice = createApi({
  reducerPath: 'clientSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_USER_API_SLICE_KEY,
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().user.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    editUser: builder.mutation({
      query: ({ id, ...values }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: ['Client'],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['Client'],
    }),
    addItemToUserCart: builder.mutation({
      query: ({ userId, item }) => ({
        url: `/cart/${userId}`,
        method: 'POST',
        body: item,
      }),
    }),
  }),
})

export const { useEditUserMutation, useGetUserDetailsQuery, useAddItemToUserCartMutation } = userApiSlice
