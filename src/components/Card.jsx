import "../css/MovieCard.css";
import { useMovieContexts } from "../contexts/useMovieContext";
function Mc({ movie }) {
  const { addFavorite } = useMovieContexts();

  function Onclicks() {
    addFavorite(movie);
     alert("Added to Favourites");
  }
  return (
    <div className="Card">
      <div className="picture">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
      </div>
      <div className="Icon">
        <button className="search" onClick={Onclicks}>
          ❤️
        </button>
      </div>
      <div className="Info">
        <h2>{movie.title}</h2>
        <h4>{movie.overview}</h4>
      </div>
    </div>
  );
}
export default Mc;
