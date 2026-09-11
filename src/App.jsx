import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Module1_Barplot from "./components/plots/Module1_Barplot";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/module1" element={<Module1_Barplot />} />
        </Routes>
      </main>
    </div>
  );
}
