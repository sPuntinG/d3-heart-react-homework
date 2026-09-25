import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const modules = [
    { id: "home", label: "🏠 Home", path: "/" },
    {
      id: "module0b",
      label: "🃏 Module 0b - Pokémon Cards",
      path: "/module0b",
    },
    { id: "module1", label: "📊 Module 1 - Barplot", path: "/module1" },
    { id: "module2", label: "📈 Module 2 - (Coming Soon)", path: "/module2" },
    { id: "module3", label: "📉 Module 3 - (Coming Soon)", path: "/module3" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-title">Modules</div>
      <ul className="nav-list">
        {modules.map((module) => (
          <li key={module.id}>
            <Link to={module.path} className="nav-link">
              {module.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
