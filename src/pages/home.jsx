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

  return (
    <div className="Homepg">
      <div className="Mcard">
        {movies.map(
          (mov) =>
            mov.title.toLowerCase().startsWith(searchQ) && (
              <Mc movie={mov} key={mov.id} />
            ),
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="MOVIE name"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Home;


