import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { lazy, Suspense } from 'react'

const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
import NotFound from './pages/NotFound.jsx'
import Tasks from './pages/Tasks.jsx'

function PageLoadingFallback() {
  return (
    <div className="spinner-wrap" style={{ padding: '60px 0', justifyContent: 'center' }}>
      <span className="spinner" />
      <span className="spinner-label">Loading page…</span>
    </div>
  )
}

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
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer email="aum.pandya@example.com" />
      <ScrollToTop />
    </div>
  )
}

export default App
