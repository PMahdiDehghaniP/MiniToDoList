import { Button } from "@mui/material";

const CheckButton = ({ children, bgcolor,onClickFunction }) => {
  return (
    <>
      <Button
      onClick={onClickFunction}
        sx={{
          backgroundColor: "#242424",
          color: `${bgcolor}`,
          width: "10%",
          mx:1
        }}
      >
        {children}
      </Button>
    </>
  );
};
export default CheckButton;
