import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MovieContextProvider } from "./contexts/MovieContexts";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
