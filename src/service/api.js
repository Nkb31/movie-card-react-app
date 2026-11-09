const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fallbackMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05NJ4lJ.jpg",
    release_date: "2024-02-28",
    vote_average: 8.4,
  },
  {
    id: 2,
    title: "Oppenheimer",
    overview:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    release_date: "2023-07-21",
    vote_average: 8.6,
  },
  {
    id: 3,
    title: "The Batman",
    overview:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    release_date: "2022-03-04",
    vote_average: 7.9,
  },
  {
    id: 4,
    title: "Inside Out 2",
    overview:
      "Riley's emotions return for a new adventure in a rather complex emotional world.",
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    release_date: "2024-06-14",
    vote_average: 7.7,
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    overview:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    release_date: "2023-06-02",
    vote_average: 8.4,
  },
  {
    id: 6,
    title: "Avatar: The Way of Water",
    overview:
      "Jake Sully and Ney'tiri form a family and explore the majestic oceans of Pandora.",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    release_date: "2022-12-16",
    vote_average: 7.6,
  },
];

const buildImageUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=500&q=80";

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getPopularMovies = async () => {
  if (!API_KEY) {
    return fallbackMovies;
  }

  try {
    const data = await fetchJson(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    );
    return data.results?.length ? data.results : fallbackMovies;
  } catch {
    return fallbackMovies;
  }
};

export const searchMovies = async (query) => {
  const trimmedQuery = query.trim();

  if (!API_KEY) {
    if (!trimmedQuery) {
      return fallbackMovies;
    }

    return fallbackMovies.filter((movie) =>
      movie.title.toLowerCase().includes(trimmedQuery.toLowerCase()),
    );
  }

  if (!trimmedQuery) {
    return getPopularMovies();
  }

  try {
    const data = await fetchJson(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}&language=en-US&page=1`,
    );
    return data.results?.length ? data.results : [];
  } catch {
    return fallbackMovies.filter((movie) =>
      movie.title.toLowerCase().includes(trimmedQuery.toLowerCase()),
    );
  }
};

export { buildImageUrl };
