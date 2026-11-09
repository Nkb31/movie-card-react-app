import { useEffect, useMemo, useState } from "react";
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
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota issues and continue using the in-memory state.
    }
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

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites],
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};


