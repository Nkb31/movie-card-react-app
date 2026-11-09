import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useMovieContexts } from "../contexts/useMovieContext";

function Nav() {
  const { favorites } = useMovieContexts();

  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="CineVerse home">
        <span className="brand-mark">C</span>
        CineVerse
      </Link>

      <nav className="navbar" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/Favourites">Favourites</Link>
      </nav>

      <Link to="/Favourites" className="favorites-pill" aria-label="Favorite movies">
        Favorites
        {favorites.length > 0 ? <span>{favorites.length}</span> : null}
      </Link>
    </header>
  );
}

export default Nav;
