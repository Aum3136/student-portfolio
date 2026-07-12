import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  const skills = ["JavaScript", "React", "HTML", "CSS", "Node.js"];

  return (
    <div>
      <Header name="Aum" themeColor="#2c3e50" />
      <About />
      <Skills skillList={skills} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;