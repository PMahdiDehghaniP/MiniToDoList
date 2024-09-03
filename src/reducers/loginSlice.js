import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { projectApi } from "../api";
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
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdaptor.getSelectors((state) => state.users);
export default userSlice.reducer;
