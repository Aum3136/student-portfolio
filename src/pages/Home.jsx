import Header from '../components/Header.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'

const skillGroups = [
  { category: 'Frontend', items: ['React', 'JavaScript (ES6+)', 'HTML / CSS', 'Vite'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'MongoDB'] },
  { category: 'Python & ML', items: ['Python', 'AI / Machine Learning', 'Pandas', 'scikit-learn'] },
  { category: 'Tools', items: ['Git / GitHub', 'Docker', 'VS Code', 'Linux'] },
]

const marqueeItems = [
  'React', 'Node.js', 'Python', 'AI / ML', 'Express', 'MongoDB',
  'Vite', 'Docker', 'Git', 'scikit-learn',
]

function Home() {
  return (
    <>
      <Header name="Aum Pandya" role="Full-Stack Developer" themeColor="#C97D4B" />
      <About />
      <Skills skillGroups={skillGroups} marqueeItems={marqueeItems} />
    </>
  )
}

export default Home
