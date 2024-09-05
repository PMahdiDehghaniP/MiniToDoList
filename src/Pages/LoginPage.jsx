import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../validation/validte";
import { toast } from "react-toastify";
import {
  Visibility,
  VisibilityOff,
  KeyRounded,
  AccountCircleRounded,
} from "@mui/icons-material";
import Particles from "react-particles";
import { Helmet } from "react-helmet-async";
import { formParticle } from "../constants/particles";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../api";
import Spinner from "../components/Spinner";
import { projectContext } from "../context/Context";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const {
    rememberMe,
    handleRememberMeChange,
    handleSetIsAuthenticated,
    handleLogin,
    handleUserChange,
  } = useContext(projectContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useGetAllUsersQuery();
  const users = useSelector((state) => state.users);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const selectUserByEmailAndPassword = (email, password) => {
    const userId = users.emailIndex[email];
    if (userId) {
      const user = users.entities[userId];
      if (user && user.password === password) {
        return user;
      }
    }
    return null;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      const user = selectUserByEmailAndPassword(email, password);
      if (user) {
        handleLogin(rememberMe, user);
        toast.success(`${user.firstName} ${user.lastName} خوش آمدید`);
        handleSetIsAuthenticated(true);
        if (!rememberMe) {
          handleUserChange(user);
        }
        navigate("/");
      } else {
        toast.error("چنین  کاربری  یافت نشد مجددا تلاش کنید");
        formik.resetForm();
      }
    },
  });
  return (
    <Box
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Helmet>
        <title> ورود به حساب کاربری</title>
      </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Particles params={formParticle} style={{ position: "absolute" }} />
          <Card
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
              height: { xs: "90%" },
              borderRadius: "10px",
              zIndex: 10,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3" color="black" sx={{ my: 1 }}>
                Login Page
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleRounded />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ my: 5 }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRounded />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 4 }}
                />
                <Box
                  component={Link}
                  to="/signup"
                  sx={{
                    display: "inline-block",
                    textDecoration: "none",
                    color: "rgba(128, 0, 128, 0.7)",
                    fontSize: "1rem",
                    transition:
                      "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                      color: "rgba(128, 0, 128, 1)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Don't Have an Account? Sign Up Now!
                </Box>
                <Box
                  component="label"
                  sx={{
                    mt: 2,
                    display: "inline-block",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "rgba(128, 0, 128, 0.7)",
                    transition:
                      "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                      color: "rgba(128, 0, 128, 1)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Box
                    component="input"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => handleRememberMeChange(!rememberMe)}
                    sx={{
                      marginRight: "8px",
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                  Remember Me
                </Box>
                <CustomButton>Log In</CustomButton>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Login;
