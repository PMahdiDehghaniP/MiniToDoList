import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { AccountCircleRounded, KeyRounded } from "@mui/icons-material";
import { signUpValidationSchema } from "../validation/validte";
import { useFormik } from "formik";
import { useAddNewUserMutation } from "../api";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const navigate = useNavigate();
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      const { firstName, lastName, password, email } = values;
      try {
        await addNewUser({
          id: nanoid(),
          firstName,
          lastName,
          email,
          password,
        });
        toast.success("کاربر با موفقیت  ساخته شد.");
        formik.resetForm();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Box
        height="90vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Card
              sx={{
                width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                height: "auto",
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
                <Typography variant="h3" color="black" sx={{ mt: 1, mb: 3 }}>
                  Sign Up Page
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
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      sx={{ ml: 1 }}
                    />
                  </Box>
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
                    sx={{ my: 3 }}
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyRounded />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 4 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      my: 3,
                      width: "60%",
                      px: 4,
                      py: 1.5,
                      borderRadius: "50px",
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        backgroundColor: "#303f9f",
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </>
  );
};

export default SignUp;
