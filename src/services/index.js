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
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    getAllUserMails: builder.query({
      query: () => ({
        url: "mensajes",
        method: "GET",
      }),
    }),
    createMessaje: builder.mutation({
      query: (messaje) => ({
        url: "enviomensaje",
        method: "POST",
        body: messaje,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutMutation,
  useCreateMessajeMutation,
  useGetAllUserMailsQuery,
} = moduloApi;
