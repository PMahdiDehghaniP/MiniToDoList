import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { projectContext } from "./context/Context";
import { Login, SignUp, MainPage } from "./Pages/index";
import "./App.css";
function App() {
  //states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  //handleFunctions
  const handleSetIsAuthenticated = (value) => setIsAuthenticated(value);
  const handleRememberMeChange = (value) => setRememberMe(value);
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    if (isUserLoggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  //handleFunctions
  const handleLogin = (rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("userLoggedIn", "true");
      setIsAuthenticated(true);
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    setIsAuthenticated(false);
  };
  //Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <MainPage /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to="/" /> : <SignUp />,
    },
  ]);
  return (
    <>
      <projectContext.Provider
        value={{
          rememberMe,
          isAuthenticated,
          handleLogOut,
          handleLogin,
          handleSetIsAuthenticated,
          handleRememberMeChange,
        }}
      >
        <RouterProvider router={router} />
      </projectContext.Provider>
    </>
  );
}

export default App;
