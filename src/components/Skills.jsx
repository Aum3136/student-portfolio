function Skills({ skillList }) {
  return (
    <section id="skills" style={{ padding: "1.5rem", textAlign: "center" }}>
      <h2>Skills</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {skillList.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;