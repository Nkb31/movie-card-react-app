import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { MovieContextProvider } from "./contexts/MovieContexts";
import { useMovieContexts } from "./contexts/useMovieContext";

const { movieCatalog } = vi.hoisted(() => ({
  movieCatalog: [
    {
      id: 101,
      title: "Midnight Run",
      overview: "A high-stakes chase across America that turns into a road trip adventure.",
      poster_path: "/midnight-run.jpg",
      release_date: "1988-07-01",
      vote_average: 8.7,
    },
    {
      id: 102,
      title: "Neon Skyline",
      overview: "A detective follows a trail of clues through a city that never sleeps.",
      poster_path: "/neon-skyline.jpg",
      release_date: "2024-11-12",
      vote_average: 7.8,
    },
    {
      id: 103,
      title: "The Quiet Harbor",
      overview: "A writer returns to the coast to confront an unfinished chapter of her life.",
      poster_path: "/quiet-harbor.jpg",
      release_date: "2025-02-04",
      vote_average: 7.2,
    },
  ],
}));

vi.mock("./service/api", () => ({
  getPopularMovies: vi.fn().mockResolvedValue(movieCatalog),
  searchMovies: vi.fn().mockImplementation(async (query) =>
    movieCatalog.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())),
  ),
  buildImageUrl: (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
}));

function FavoriteHarness() {
  const { favorites, addFavorite, removeFavorite } = useMovieContexts();

  return (
    <div>
      <span>{favorites.length}</span>
      <button type="button" onClick={() => addFavorite(movieCatalog[0])}>
        Add favorite
      </button>
      <button type="button" onClick={() => removeFavorite(movieCatalog[0].id)}>
        Remove favorite
      </button>
    </div>
  );
}

describe("movie app", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders popular movies on the home page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /find your next favorite film/i }),
    ).toBeInTheDocument();

    const posterTitles = await screen.findAllByText(/midnight run/i);
    expect(posterTitles.length).toBeGreaterThan(0);
  });

  it("shows recommendations when the search field is focused", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const input = await screen.findByLabelText(/search for movies/i);
    expect(screen.queryByText(/trending matches/i)).not.toBeInTheDocument();

    await user.click(input);
    expect(screen.getByText(/trending matches/i)).toBeInTheDocument();
  });

  it("searches movies by title", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const input = await screen.findByLabelText(/search for movies/i);
    await user.clear(input);
    await user.type(input, "quiet");

    const suggestionButtons = await screen.findAllByRole("button", { name: /the quiet harbor/i });
    expect(suggestionButtons.length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /search/i }));

    const quietResults = await screen.findAllByText(/the quiet harbor/i);
    expect(quietResults.length).toBeGreaterThan(0);
  });

  it("adds and removes favorites from the context provider", async () => {
    const user = userEvent.setup();

    render(
      <MovieContextProvider>
        <FavoriteHarness />
      </MovieContextProvider>,
    );

    const counter = screen.getByText("0");
    expect(counter).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add favorite/i }));
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /remove favorite/i }));
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem("movie-card-favorites") ?? "[]")).toEqual([]);
  });

  it("navigates to the favorites page and shows saved titles", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: /favorites/i }));

    expect(await screen.findByRole("heading", { name: /my favorites/i })).toBeInTheDocument();
    expect(screen.getByText(/no favorite movies yet/i)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /browse movies/i }));
    expect(await screen.findByRole("heading", { name: /find your next favorite film/i })).toBeInTheDocument();
  });

  it("allows toggling favorites from a movie card", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <MovieContextProvider>
          <App />
        </MovieContextProvider>
      </MemoryRouter>,
    );

    const favoriteButton = (await screen.findAllByRole("button", { name: /add .* to favorites/i }))[0];
    await user.click(favoriteButton);

    expect(JSON.parse(window.localStorage.getItem("movie-card-favorites") ?? "[]")).toHaveLength(1);
  });
});
