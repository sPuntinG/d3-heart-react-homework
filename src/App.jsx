import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Module0b_PokemonCards from "./components/module0b-pokemon-cards/Module0b_PokemonCards";
import Module1_Barplot from "./components/module1-barplot/Module1_Barplot";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/module0b" element={<Module0b_PokemonCards />} />
          <Route path="/module1" element={<Module1_Barplot />} />
        </Routes>
      </main>
    </div>
  );
}
