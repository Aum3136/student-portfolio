import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../api/auth.js'

const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/tasks', label: 'Tasks' },
]

function NavBar({ name, theme, onToggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(() => isLoggedIn())

  useEffect(() => {
    const syncAuth = () => setAuthed(isLoggedIn())
    window.addEventListener('auth-change', syncAuth)
    window.addEventListener('storage', syncAuth)
    return () => {
      window.removeEventListener('auth-change', syncAuth)
      window.removeEventListener('storage', syncAuth)
    }
  }, [])

  useEffect(() => {
    setAuthed(isLoggedIn())
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setAuthed(false)
    navigate('/login')
  }

  return (
    <header>
      <nav className="tab-row">
        <div className="tab name-tab">{name}</div>
        {ROUTES.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`tab${location.pathname === route.path ? ' active' : ''}`}
          >
            {route.label}
          </Link>
        ))}
        {authed ? (
          <button type="button" className="tab auth-tab" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`tab auth-tab${location.pathname === '/login' ? ' active' : ''}`}
          >
            Login
          </Link>
        )}
        <a href="/resume.pdf" download className="tab resume-tab" title="Download Resume">
          Resume ↗
        </a>
        <button className="tab theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  )
}

export default NavBar
