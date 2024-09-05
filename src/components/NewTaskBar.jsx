import { InputAdornment, TextField } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";
const NewTaskBar = ({ inputref }) => {
  return (
    <>
      <TextField
      inputRef={inputref}
        label="Write Your Task"
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
              <AddBoxRounded sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default NewTaskBar;
