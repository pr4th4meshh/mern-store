import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setUser } from "../slices/userSlice" // Import actions from userSlice
import { RootState } from "../store"
// import { BASE_URL } from "../../env"

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_SLICE_KEY,
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
    }),
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser({ user: data.user, accessToken: data.token })) // Ensure correct field names
        } catch (error) {
          // Handle error
        }
      },
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),
    googleSignIn: builder.mutation({
      query: (user) => ({
        url: '/google',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useGoogleSignInMutation
} = authSlice
