import { useContext } from "react";

import SalasContext from "@/context/SalasProvider";

const useSalas = () => {
  return useContext(SalasContext);
};

export default useSalas;
