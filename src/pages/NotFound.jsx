import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section id="not-found" className="is-visible">
      <div className="section-head">
        <span className="mark">404</span>
        <h2>Page not found</h2>
      </div>
      <p style={{ color: 'var(--paper-dim)', marginBottom: '24px' }}>
        That page doesn't exist — but the work you're looking for is probably one click away.
      </p>
      <Link className="btn" to="/">Back to home</Link>
    </section>
  )
}

export default NotFound
