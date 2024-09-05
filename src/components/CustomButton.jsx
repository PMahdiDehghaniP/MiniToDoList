import { Button } from "@mui/material";

const CustomButton = ({ children, type, onClickFunc }) => {
  return (
    <>
      <Button
        type={type}
        variant="contained"
        onClick={onClickFunc}
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
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#303f9f",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {children}
      </Button>
    </>
  );
};
export default CustomButton;
