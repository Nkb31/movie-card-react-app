import { useContext } from "react";
import { MovieContext } from "./MovieContext";

export const useMovieContexts = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContexts must be used within a MovieContextProvider");
  }

  return context;
};

