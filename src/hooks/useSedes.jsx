import { useContext } from "react";

import SedesContext from "@/context/SedesProvider";

const useSedes = () => {
  return useContext(SedesContext);
};

export default useSedes;
