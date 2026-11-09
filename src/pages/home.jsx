import { useEffect, useMemo, useRef, useState } from "react";
import Mc from "../components/Card";
import "../css/Home.css";
import { buildImageUrl, getPopularMovies, searchMovies } from "../service/api";

function Home() {
  const [searchQ, setSearchQ] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);

      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const runSearch = async (query) => {
    const trimmedQuery = query.trim();
    setLoading(true);

    try {
      const results = trimmedQuery ? await searchMovies(trimmedQuery) : await getPopularMovies();
      setMovies(results);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const selectedMovie = recommendations[activeSuggestionIndex];

    if (selectedMovie && searchQ.trim()) {
      setSearchQ(selectedMovie.title);
      await runSearch(selectedMovie.title);
      return;
    }

    await runSearch(searchQ);
  };

  const handleSuggestionClick = async (title) => {
    setSearchQ(title);
    setActiveSuggestionIndex(-1);
    await runSearch(title);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!recommendations.length) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % recommendations.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev <= 0 ? recommendations.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      const selectedMovie = recommendations[activeSuggestionIndex];
      if (selectedMovie) {
        handleSuggestionClick(selectedMovie.title);
      }
    }
  };

  const recommendations = useMemo(() => {
    const query = searchQ.trim().toLowerCase();

    if (!query) {
      return movies.slice(0, 5);
    }

    const startsWithMatches = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(query),
    );
    const containsMatches = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) &&
        !movie.title.toLowerCase().startsWith(query),
    );

    return [...startsWithMatches, ...containsMatches].slice(0, 5);
  }, [movies, searchQ]);

  const featuredMovie = useMemo(() => movies[0] ?? null, [movies]);

  useEffect(() => {
    if (!searchQ.trim()) {
      setActiveSuggestionIndex(-1);
    }
  }, [searchQ]);

  return (
    <div className="Homepg">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1>Find your next favorite film.</h1>
          <p className="hero-text">
            Discover standout stories, cult classics, and new releases curated for your next movie night.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrap">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a movie"
                value={searchQ}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => {
                  setSearchQ(e.target.value);
                  setActiveSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                aria-label="Search for movies"
              />

              {isSearchFocused && recommendations.length > 0 ? (
                <div className="search-recommendations" aria-live="polite">
                  {searchQ.trim() ? null : (
                    <span className="search-suggestion search-suggestion--muted">Trending matches</span>
                  )}

                  {recommendations.map((movie, index) => (
                    <button
                      key={movie.id}
                      type="button"
                      className={`search-suggestion ${index === activeSuggestionIndex ? "search-suggestion--active" : ""}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(movie.title)}
                    >
                      {movie.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button type="submit">Search</button>
          </form>
        </div>

        {featuredMovie ? (
          <div className="hero-poster">
            <img src={buildImageUrl(featuredMovie.poster_path)} alt={featuredMovie.title} />
            <div className="hero-poster__badge">
              <span>Now playing</span>
              <strong>{featuredMovie.title}</strong>
            </div>
          </div>
        ) : null}
      </section>

      <section className="catalogue-section" aria-live="polite">
        <div className="section-header">
          <div>
            <h2>Browse the spotlight</h2>
          </div>
          <span>{movies.length} titles</span>
        </div>

        {loading ? (
          <div className="loading-state">Loading movies...</div>
        ) : movies.length > 0 ? (
          <div className="Mcard">
            {movies.map((mov) => (
              <Mc movie={mov} key={mov.id} />
            ))}
          </div>
        ) : (
          <div className="NoResults">No movies found for that search.</div>
        )}
      </section>
    </div>
  );
}

export default Home;
