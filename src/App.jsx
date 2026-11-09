import "./css/App.css";
import Nav from "./components/Navbar";
import Fav from "./pages/favourite";
import Home from "./pages/home";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="Mainc">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Fav />} />
          <Route path="/Favourites" element={<Navigate to="/favorites" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

