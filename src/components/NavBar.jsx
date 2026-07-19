import { Link, useLocation } from 'react-router-dom'

const ROUTES = [
  { path: '/', label: 'home' },
  { path: '/projects', label: 'projects' },
  { path: '/contact', label: 'contact' },
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
        <button className="tab theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? 'light mode' : 'dark mode'}
        </button>
      </nav>
    </header>
  )
}

export default NavBar
