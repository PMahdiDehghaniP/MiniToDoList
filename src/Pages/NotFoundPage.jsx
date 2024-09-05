import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { ClimbingBoxLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title> 404 Not Found Error</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(to right, #1F2937, #2D3748)",
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{ fontSize: { xs: "5rem", md: "9rem" }, letterSpacing: "0.1em" }}
        >
          404
        </Typography>
        <ClimbingBoxLoader color="#bc77fd" size={23} />
        <Box
          sx={{
            bgcolor: "red",
            px: 2,
            py: 1,
            borderRadius: 1,
            transform: "rotate(12deg)",
            mt: 4,
          }}
        >
          <Typography variant="body2" color="white">
            صفحه‌ای پیدا نشد
          </Typography>
        </Box>
        <Box mt={4} textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
              fontWeight: "600",
            }}
          >
            متاسفانه صفحه‌ای که شما دنبالش می‌گردید وجود ندارد
          </Typography>
          <Typography
            variant="body1"
            color="gray"
            sx={{ mt: 2, mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            ممکن است این صفحه پاک شده باشد یا آدرس آن تغییر کرده باشد
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              px: 4,
              py: 2,
              background: "linear-gradient(to right, #2196F3, #9C27B0)",
              fontSize: "1.1rem",
              fontWeight: "medium",
              borderRadius: "12px",
              boxShadow: 3,
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            بازگشت
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotFoundPage;
