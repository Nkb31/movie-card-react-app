import { createContext } from "react";

export const MovieContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});
