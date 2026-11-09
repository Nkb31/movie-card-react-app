import { useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";

const STORAGE_KEY = "movie-card-favorites";

export const MovieContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedFavorites = window.localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }

      return [movie, ...prev];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};


