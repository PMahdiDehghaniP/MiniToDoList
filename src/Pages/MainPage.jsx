import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { projectContext } from "../context/Context";
import Spinner from "../components/Spinner";
import { Box } from "@mui/material";
const MainPage = () => {
  const { loggedInUser } = useContext(projectContext);
  console.log(loggedInUser)
  return (
    <>
      <Helmet>
        <title>داشبورد کاربری</title>
      </Helmet>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {loggedInUser ? <div>صفحه اصلی</div> : <Spinner />}
      </Box>
    </>
  );
};
export default MainPage;
