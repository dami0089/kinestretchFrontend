import { useContext } from "react";
import ContableContext from "../context/ContableProvider";

const useContable = () => {
  return useContext(ContableContext);
};

export default useContable;
