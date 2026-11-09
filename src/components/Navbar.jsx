import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useMovieContexts } from "../contexts/useMovieContext";

function Nav() {
  const { favorites } = useMovieContexts();

  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="CineVerse home">
        <span className="brand-mark">C</span>
        CineVerse
      </NavLink>

      <nav className="navbar" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
        >
          Favorites
        </NavLink>
      </nav>

      <NavLink to="/favorites" className="favorites-pill" aria-label="Favorite movies">
        Favorites
        {favorites.length > 0 ? <span>{favorites.length}</span> : null}
      </NavLink>
    </header>
  );
}

export default Nav;
