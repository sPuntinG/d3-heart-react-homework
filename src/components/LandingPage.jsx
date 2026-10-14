import { Link } from "react-router-dom";
import { modules } from "../modules";
import "./LandingPage.css";

function CardContent({ module }) {
  return (
    <>
      <div className="card-num">MODULE {module.num}</div>
      <div className="card-title">{module.label}</div>
      <p>{module.description}</p>
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="landing">
      <header>
        <h1>Learning D3 &amp; React</h1>
        <p className="intro">
          Placeholder — I need to write my intro here ...{" "}
        </p>
      </header>

      <div className="module-grid">
        {modules
          .filter((m) => m.id !== "home")
          .map((m) =>
            m.soon ? (
              <div key={m.id} className="module-card soon">
                <CardContent module={m} />
              </div>
            ) : (
              <Link key={m.id} to={m.path} className="module-card">
                <CardContent module={m} />
              </Link>
            ),
          )}
      </div>
    </div>
  );
}
