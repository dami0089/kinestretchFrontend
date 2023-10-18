import { useContext } from "react";
import ClasesContext from "@/context/ClasesProvider";

const useClases = () => {
  return useContext(ClasesContext);
};

export default useClases;
