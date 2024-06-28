import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from '../slices/userSlice' // Import actions from userSlice
// import { BASE_URL } from "../../env"

export const userApiSlice = createApi({
  reducerPath: 'clientSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth/client',
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
  }),
})

export const { useEditUserMutation, useGetUserDetailsQuery } = userApiSlice
