import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  EditRounded,
  DeleteRounded,
  DoneRounded,
  CloseRounded,
} from "@mui/icons-material";
import CheckButton from "./CheckButton";
import { useContext } from "react";
import { projectContext } from "../context/Context";
import { useUpdateTasksMutation } from "../api";
import { toast } from "react-toastify";
import { ToDoSpinner } from "./Spinner";
const ToDoCard = ({ text, id, isDone }) => {
  const { loggedInUser, handleUserChange } = useContext(projectContext);
  const [updateTasks, { isLoading }] = useUpdateTasksMutation();
  const deleteTask = async () => {
    const updatedTask = loggedInUser.tasks.filter((task) => task.id !== id);
    const updatedUserInfo = { ...loggedInUser, tasks: [...updatedTask] };
    try {
      await updateTasks(updatedUserInfo);
      handleUserChange(updatedUserInfo);
      toast.info("تکلیف مورد نظر با موفقیت  حذف شد");
    } catch (error) {
      toast.error("مشکلی پیش اومده  مجددا  تلاش فرمایید");
    }
  };
  const changeTaskStatus = async () => {
    const updatedTasks = loggedInUser.tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    const updatedUserInfo = { ...loggedInUser, tasks: [...updatedTasks] };
    try {
      await updateTasks(updatedUserInfo);
      handleUserChange(updatedUserInfo);
      toast.info("تغییر  وضعیت انجام شد");
    } catch (error) {
      toast.error("مشکلی پیش اومده  مجددا  تلاش فرمایید");
    }
  };
  return (
    <>
      {isLoading ? (
        <ToDoSpinner />
      ) : (
        <Card
          sx={{
            width: "100%",
            paddingX: 3,
            paddingY: 1.5,
            my: 1.5,
            backgroundColor: isDone ? "#28fc5a" : "#fc284c",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
            }}
          >
            <Box
              display="flex"
              sx={{
                flexDirection: { xs: "row", sx: "column" },
                width: { xs: "100%", sm: "auto" },
                alignItems: "flex-start",
                gap: 1,
                mr: { sm: 2 },
                mb: { xs: 2, sm: 0 },
              }}
            >
              <CheckButton bgcolor={"green"} onClickFunction={changeTaskStatus}>
                {isDone ? (
                  <CloseRounded sx={{ color: "#fc284c" }} />
                ) : (
                  <DoneRounded />
                )}
              </CheckButton>
              <CheckButton bgcolor={"blue"}>
                <EditRounded />
              </CheckButton>
              <CheckButton bgcolor={"red"} onClickFunction={deleteTask}>
                <DeleteRounded />
              </CheckButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                width="100%"
                variant="h6"
                color="text.primary"
                textAlign="right"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  textDecoration: isDone ? "line-through" : "none",
                }}
              >
                {text}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
export default ToDoCard;
