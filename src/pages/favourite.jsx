import "../css/Favorites.css";
import { useMovieContexts } from "../contexts/useMovieContext";
import Mc from "../components/Card";

function Fav() {
  const { favorites, removeFavorite } = useMovieContexts();

  return (
    <div className="favorites-page" aria-live="polite">
      <header className="favorites-header">
        <div>
          <h1>My Favorites</h1>
        </div>
        <span>{favorites.length} saved</span>
      </header>

      {favorites.length > 0 ? (
        <div className="Mcard">
          {favorites.map((movie) => (
            <Mc
              key={movie.id}
              movie={movie}
              isFavorite
              onRemoveFavorite={removeFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No favorite movies yet.</h2>
          <p>Save a few titles from the home page and they will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default Fav;