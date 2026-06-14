import "./css/App.css";
import Mc from "./components/Card";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Fav from "./pages/favourite";
import Nav from "./components/Navbar";

function App() {
  return (
    <div>
      <Nav />
      <div>
        <main className="Mainc">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Favourites" element={<Fav />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

