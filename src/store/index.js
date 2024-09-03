import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../api";
import usersReducer from "../reducers/loginSlice";
export const projectStore = configureStore({
  reducer: {
    users: usersReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});
projectStore.dispatch(projectApi.endpoints.getAllUsers.initiate());
