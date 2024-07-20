import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/api/payment/order',
        method: 'POST',
        body,
      }),
    }),
    verifyPayment: builder.mutation({
        query: (body) => ({
          url: '/api/payment/verify',
          method: 'POST',
          body,
        }),
      }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = paymentApiSlice;
