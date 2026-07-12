function Projects() {
  const projects = [
    { id: 1, title: "Portfolio Website", desc: "Built using React and Vite." },
    { id: 2, title: "Todo App", desc: "A task manager using local state." },
    { id: 3, title: "Weather App", desc: "Fetches live weather using an API." },
  ];

  return (
    <section id="projects" style={{ padding: "1.5rem", textAlign: "center" }}>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p.id} style={{ marginBottom: "1rem" }}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </section>
  );
}

export default Projects;