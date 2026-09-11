export default function LandingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", lineHeight: "1.6" }}>
      <h1>D3 & React Learning Portfolio</h1>

      <p>
        This portfolio showcases my learning journey through a course on{" "}
        <strong>D3 and React</strong>.
      </p>

      <h2>What is this?</h2>
      <p>
        D3 (Data-Driven Documents) is a powerful JavaScript library for creating
        interactive data visualizations. React is a JavaScript framework for
        building user interfaces.
      </p>
      <p>
        This course combines both to teach how to build modern, interactive data
        visualizations on the web.
      </p>

      <h2>The Modules</h2>
      <p>Each module covers a different concept in data visualization:</p>
      <ul>
        <li>
          <strong>SVG Basics:</strong> Understanding Scalable Vector Graphics
        </li>
        <li>
          <strong>Scales:</strong> Mapping data to visual dimensions
        </li>
        <li>
          <strong>Axes:</strong> Adding readable axes to plots
        </li>
        <li>
          <strong>Responsiveness:</strong> Making visualizations adapt to
          different screen sizes
        </li>
        <li>...and more!</li>
      </ul>

      <p>
        <strong>
          👈 Select a module from the navigation to see the visualization!
        </strong>
      </p>
    </div>
  );
}
