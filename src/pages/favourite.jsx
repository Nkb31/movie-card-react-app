import "../css/Favorites.css";
import { useMovieContexts } from "../contexts/useMovieContext";
import Mc from "../components/Card";

function Fav() {
  const { favorites } = useMovieContexts();

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      <div className="Mcard">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Mc key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
}

export default Fav;