import { useState, useEffect } from "react";
import Mc from "../components/Card";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../service/api";

function Home() {
  const [searchQ, setSearchQ] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch {
        console.error("Failed to load movies");
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!searchQ.trim()) {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } else {
        const results = await searchMovies(searchQ);
        setMovies(results);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Homepg">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="MOVIE name"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="Mcard">
          {movies.length > 0 ? (
            movies.map((mov) => <Mc movie={mov} key={mov.id} />)
          ) : (
            <div className="NoResults">No movies found for that search.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
