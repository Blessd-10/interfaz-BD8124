import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moduloApi = createApi({
  reducerPath: "moduloAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (correoalterno) => ({
        url: "login",
        method: "POST",
        body: {
          correoalterno,
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = moduloApi;
