import { Link } from "react-router-dom";
import "../css/Navbar.css";
function Nav() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/Favourites">Favourites</Link>
      </div>
    </nav>
  );
}
export default Nav;
