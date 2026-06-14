import { useState, useEffect } from "react";
import Mc from "../components/Card";
import "../css/Home.css";
import { getPopularMovies } from "../service/api";

function Home() {
  const [searchQ, setSearchQ] = useState("");
  const [movies, setMovies] = useState([]);

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

  const normalizedQuery = searchQ.trim().toLowerCase();
  const filteredMovies = movies.filter((mov) =>
    mov.title?.toLowerCase().includes(normalizedQuery),
  );

  return (
    <div className="Homepg">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="MOVIE name"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="Mcard">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((mov) => <Mc movie={mov} key={mov.id} />)
        ) : (
          <div className="NoResults">No movies found for that search.</div>
        )}
      </div>
    </div>
  );
}

export default Home;
