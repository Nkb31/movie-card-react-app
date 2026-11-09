import "../css/MovieCard.css";
import { useMovieContexts } from "../contexts/useMovieContext";
import { buildImageUrl } from "../service/api";

function Mc({ movie, isFavorite = false, onRemoveFavorite }) {
  const { addFavorite, removeFavorite, favorites } = useMovieContexts();
  const alreadySaved = isFavorite || favorites.some((item) => item.id === movie.id);

  const handleFavoriteClick = () => {
    if (alreadySaved) {
      if (onRemoveFavorite) {
        onRemoveFavorite(movie.id);
        return;
      }

      removeFavorite(movie.id);
      return;
    }

    addFavorite(movie);
  };

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "New";
  const overview =
    movie.overview && movie.overview.length > 120
      ? `${movie.overview.slice(0, 120)}...`
      : movie.overview || "A cinematic pick loaded with suspense, emotion, and unforgettable moments.";

  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={buildImageUrl(movie.poster_path)} alt={movie.title} />
        <div className="movie-card__topbar">
          <span className="movie-score">★ {movie.vote_average?.toFixed(1) ?? "8.8"}</span>
          <button
            type="button"
            className={`favorite-toggle ${alreadySaved ? "favorite-toggle--active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={alreadySaved ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          >
            {alreadySaved ? "♥" : "♡"}
          </button>
        </div>
      </div>

      <div className="movie-card__content">
        <div className="movie-card__header">
          <h3>{movie.title}</h3>
          <span>{year}</span>
        </div>

        <p>{overview}</p>

        <div className="movie-card__footer">
          <span className="movie-tag">Popular</span>
          <button type="button" className="movie-action" onClick={handleFavoriteClick}>
            {alreadySaved ? "Saved" : "Add to list"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default Mc;
