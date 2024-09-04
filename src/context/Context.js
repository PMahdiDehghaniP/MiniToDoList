import { createContext } from "react";
export const projectContext = createContext({
  rememberMe: "",
  handleRememberMeChange: () => {},
  handleLogin: () => {},
  handleLogOut: () => {},
  isAuthenticated: "",
  handleSetIsAuthenticated: () => {},
  loggedInUser: null,
  handleUserChange: () => {},
});
