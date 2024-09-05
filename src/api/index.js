import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const projectApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  tagTypes: ["USERS", "TASKS"],
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
    updateTasks: builder.mutation({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["TASKS"],
    }),
  }),
});
export const {
  useAddNewUserMutation,
  useGetAllUsersQuery,
  useUpdateTasksMutation
} = projectApi;
