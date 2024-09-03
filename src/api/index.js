import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const projectApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  tagTypes: ["USERS"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["USERS"],
    }),
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["USERS"],
    }),
    editUserData: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddNewUserMutation,
  useDeleteUserMutation,
  useEditUserDataMutation,
  useGetAllUsersQuery,
} = projectApi;
