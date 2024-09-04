import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { projectApi } from "../api";
import { useSelector } from "react-redux";
const userAdaptor = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});
const initialState = userAdaptor.getInitialState({
  emailIndex: {},
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      projectApi.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        userAdaptor.setAll(state, action.payload);
        state.emailIndex = action.payload.reduce((acc, user) => {
          acc[user.email] = user.id;
          return acc;
        }, {});
      }
    );
    builder.addMatcher(
      projectApi.endpoints.addNewUser.matchFulfilled,
      (state, action) => {
        userAdaptor.addOne(state, action.payload);
      }
    );
  },
});
export const selectUsers = (state) => state.users.entities;
export const selectUserById = (userId) =>
  createSelector([selectUsers], (users) => users[userId]);
export default userSlice.reducer;
