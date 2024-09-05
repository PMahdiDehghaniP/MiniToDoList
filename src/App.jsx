import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { projectContext } from "./context/Context";
import { Login, SignUp, MainPage, NotFoundPage } from "./Pages/index";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUserById } from "./reducers/userSlice";
import EditPage from "./Pages/EditPage";

function App() {
  // states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedInUser, handleUserChange] = useState(null);

  // handleFunctions
  const handleSetIsAuthenticated = (value) => setIsAuthenticated(value);
  const handleRememberMeChange = (value) => setRememberMe(value);

  const userToken = localStorage.getItem("token");
  const currentUser = useSelector(selectUserById(userToken));
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    if (isUserLoggedIn === "true" && userToken) {
      handleUserChange(currentUser ? currentUser : null);
      setIsAuthenticated(true);
    }
  }, [currentUser, userToken]);

  // handleFunctionsّ
  const handleLogin = (rememberMe, user) => {
    if (rememberMe && user.id) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("token", user.id);
      handleUserChange(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    handleUserChange(null);
    setIsAuthenticated(false);
  };

  // Router
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
    {
      path: "/editTask/:taskId",
      element: isAuthenticated ? <EditPage /> : <Login />,
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return (
    <>
      <projectContext.Provider
        value={{
          rememberMe,
          isAuthenticated,
          loggedInUser,
          handleLogOut,
          handleLogin,
          handleSetIsAuthenticated,
          handleRememberMeChange,
          handleUserChange,
        }}
      >
        <RouterProvider router={router} />
      </projectContext.Provider>
    </>
  );
}

export default App;
