import { useContext } from "react";

import ProfesoresContext from "@/context/ProfesoresProvider";

const useProfesores = () => {
  return useContext(ProfesoresContext);
};

export default useProfesores;
