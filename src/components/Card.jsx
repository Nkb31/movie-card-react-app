import "../css/MovieCard.css";
function Mc({ movie }) {
  function Onclicks() {
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
          🤞🏼
        </button>
      </div>
      <div className="Info">
        <h2>{movie.title}</h2>
        <h4>{movie.description}</h4>
      </div>
    </div>
  );
}
export default Mc;
