import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { modules } from "../modules";

export default function Navigation() {
  // const modules = [
  //   { id: "home", num: "00", label: "Home", path: "/" },
  //   { id: "module0b", num: "0b", label: "Pokémon cards", path: "/module0b" },
  //   { id: "module1", num: "01", label: "Barplot", path: "/module1" },
  //   { id: "module2", num: "02", label: "Scales", soon: true },
  // ];

  return (
    <nav className="navigation">
      <div>
        <div className="nav-title">
          Giulia's
          <br />
          D3 notebook
        </div>
        <p className="nav-subtitle">a data analyst learns the web</p>
      </div>

      <div>
        <div className="nav-label">Contents</div>
        <ul className="nav-list">
          {modules.map((module) => (
            <li key={module.id}>
              {module.soon ? (
                <span className="nav-link soon">
                  <span className="nav-num">{module.num}</span>
                  {module.label} — soon
                </span>
              ) : (
                <NavLink to={module.path} end className="nav-link">
                  <span className="nav-num">{module.num}</span>
                  {module.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
