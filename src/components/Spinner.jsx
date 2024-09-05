import { CircleLoader, HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <HashLoader color="#a016b9" size={76} />
    </>
  );
};
export const ToDoSpinner = () => {
  return (
    <>
      <CircleLoader color="#a016b9" size={76} />
    </>
  );
};
export default Spinner;
