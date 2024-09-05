import { EditRounded } from "@mui/icons-material";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { projectContext } from "../context/Context";
import Spinner from "../components/Spinner";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useUpdateTasksMutation } from "../api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
const EditPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [updateTasks, { isLoading }] = useUpdateTasksMutation();
  const { loggedInUser, handleUserChange } = useContext(projectContext);
  let selectedTask = loggedInUser?.tasks.find((task) => task.id === taskId);
  const inputRef = useRef();
  const handleEditTask = async () => {
    const newContent = inputRef.current.value;
    const updatedTasks = loggedInUser.tasks.map((task) =>
      task.id === taskId ? { ...task, content: newContent } : task
    );
    const updatedUserInfo = { ...loggedInUser, tasks: [...updatedTasks] };
    try {
      await updateTasks(updatedUserInfo);
      handleUserChange(updatedUserInfo);
      toast.info("ویرایش انجام شد");
      navigate("/");
    } catch (error) {
      toast.error("مشکلی پیش اومده  مجددا  تلاش فرمایید");
      inputRef.current.value = selectedTask.content;
    }
  };
  return (
    <>
      <Helmet>
        <title>ویرایش تکلیف</title>
      </Helmet>
      {!selectedTask || isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="90vh"
        >
          <Spinner />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          height="90vh"
          mt={3}
        >
          <Box
            width="90%"
            height="10%"
            bgcolor="purple"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={1}
            borderRadius={5}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
            mb={6}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Edit Your Task
            </Typography>
          </Box>
          <TextField
            inputRef={inputRef}
            defaultValue={selectedTask.content}
            label="Edit Your Task"
            variant="outlined"
            sx={{
              width: "60%",
              bgcolor: "purple",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                  borderWidth: "2px",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            InputProps={{
              style: {
                padding: "10px 15px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <EditRounded sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"space-around"}
            flexShrink={1}
            width="40%"
            gap={2}
          >
            <CustomButton type={"button"} onClickFunc={() => navigate("/")}>
              Main Page
            </CustomButton>
            <CustomButton onClickFunc={handleEditTask}>Edit</CustomButton>
          </Box>
        </Box>
      )}
    </>
  );
};
export default EditPage;
