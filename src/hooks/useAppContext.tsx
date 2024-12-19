import { useContext } from "react";
import { store } from "@/providers/AppContextProvider";

export const useAppContext = () => {
  const context = useContext(store);
  if (!context) {
    throw new Error(
      "useAppContext deve ser usado dentro de um AppContextProvider"
    );
  }
  return context;
};
