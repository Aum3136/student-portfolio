import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Tasks from './pages/Tasks.jsx'

function App() {
  // Supplementary task: dark/light toggle applying a CSS class to the root element
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={theme === 'light' ? 'theme-light' : ''}>
      <NavBar name="Aum Pandya" theme={theme} onToggleTheme={toggleTheme} />
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </main>
      <Footer email="aum.pandya@example.com" />
    </div>
  )
}

export default App
