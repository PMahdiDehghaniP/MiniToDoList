import { useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { projectContext } from "../context/Context";
import Spinner, { ToDoSpinner } from "../components/Spinner";
import { Box, Typography, Button } from "@mui/material";
import NewTaskBar from "../components/newTaskBar";
import ToDoCard from "../components/ToDoCard";
import { useUpdateTasksMutation } from "../api";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LogoutRounded } from "@mui/icons-material";
const MainPage = () => {
  const { loggedInUser, handleUserChange, handleLogOut } =
    useContext(projectContext);
  const [updateTasks, { isLoading }] = useUpdateTasksMutation();
  const newTaskRef = useRef();
  const submitNewTask = async () => {
    const userInput = newTaskRef.current.value;
    const regex = /^(?!^[\W_]+$)(?!^\d+$)(?!^\s*$).+$/;
    if (regex.test(userInput)) {
      const task = { id: nanoid(), content: userInput, isDone: false };
      const updatedUser = {
        ...loggedInUser,
        tasks: [...loggedInUser.tasks, task],
      };
      try {
        await updateTasks(updatedUser);
        handleUserChange(updatedUser);
        toast.success("تکلیف  جدید اضافه شد");
        newTaskRef.current.value = "";
      } catch (error) {
        console.error("Failed to add task:", error);
        toast.error("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
      }
    } else {
      toast.error("نوشته شما معتبر  نیست مجددا تلاش  کنید");
      newTaskRef.current.value = "";
    }
  };

  return (
    <>
      <Helmet>
        <title>داشبورد کاربری</title>
      </Helmet>

      {loggedInUser ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100vh"
            padding={2}
          >
            <Box
              width="100%"
              height="10%"
              bgcolor="purple"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
              borderRadius={5}
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
              mb={2}
            >
              <Typography variant="h4" sx={{ color: "white" }}>
                To Do List
              </Typography>
              <Typography sx={{ color: "white" }}>
                {loggedInUser.firstName} {loggedInUser.lastName}: کاربر وارد شده
              </Typography>
              <Box display="flex">
                <Button
                  onClick={() => handleLogOut()}
                  sx={{
                    color: "whitesmoke",
                    "&:hover": {
                      color: "#fc284c",
                    },
                  }}
                >
                  <Typography>Log Out</Typography>
                  <LogoutRounded />
                </Button>
              </Box>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <NewTaskBar inputref={newTaskRef} />
              <Button
                onClick={submitNewTask}
                sx={{
                  width: "8%",
                  backgroundColor: "purple",
                  borderRadius: "8px",
                  mx: 2,
                  height: "60px",
                  color: "whitesmoke",
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#5f0475",
                    color: "black",
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="70%"
              padding={2}
              mt={2}
            >
              {isLoading ? (
                <ToDoSpinner />
              ) : loggedInUser.tasks.length === 0 ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="400px"
                >
                  <Typography variant="h4" color="whitesmoke">
                    هیچ تکلیفی موجود نیست
                  </Typography>
                </Box>
              ) : (
                loggedInUser.tasks.map((task) => (
                  <ToDoCard
                    key={task.id}
                    text={task.content}
                    id={task.id}
                    isDone={task.isDone}
                  />
                ))
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
        >
          <Spinner />
        </Box>
      )}
    </>
  );
};

export default MainPage;
