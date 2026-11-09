import { useState, useEffect } from "react";
import Mc from "../components/Card";
import "../css/Home.css";
import { getPopularMovies, searchMovies, buildImageUrl } from "../service/api";

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
    setLoading(true);

    try {
      const results = searchQ.trim()
        ? await searchMovies(searchQ)
        : await getPopularMovies();

      setMovies(results);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const featuredMovie = movies[0];

  return (
    <div className="Homepg">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Trending this week</p>
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

      <section className="catalogue-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Featured picks</p>
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
