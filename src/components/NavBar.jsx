import { Link, useLocation } from 'react-router-dom'

const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
  { path: '/tasks', label: 'Tasks' },
]

function NavBar({ name, theme, onToggleTheme }) {
  const location = useLocation()

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
