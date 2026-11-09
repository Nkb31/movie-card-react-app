import { useEffect, useMemo, useState } from "react";
import Mc from "../components/Card";
import "../css/Home.css";
import { buildImageUrl, getPopularMovies, searchMovies } from "../service/api";

function Home() {
  const [searchQ, setSearchQ] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQ.trim();
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

  const featuredMovie = useMemo(() => movies[0] ?? null, [movies]);

  return (
    <div className="Homepg">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1>Find your next favorite film.</h1>
          <p className="hero-text">
            Discover standout stories, cult classics, and new releases curated for your next movie night.
          </p>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a movie"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              aria-label="Search for movies"
            />
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
