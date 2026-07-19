import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'

function ProjectRow({ project, index }) {
  const [open, setOpen] = useState(false)
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`project${visible ? ' is-visible' : ''}${open ? ' is-open' : ''}`}
    >
      <button className="project-summary" onClick={() => setOpen((o) => !o)}>
        <span className="num">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-title-group">
          <h4>{project.title}</h4>
          <p className="project-hook">{project.hook}</p>
        </span>
        <span className="tag">{project.tag}</span>
        <span className={`chevron${open ? ' open' : ''}`}>▾</span>
      </button>

      <div className="project-details" style={{ maxHeight: open ? '400px' : '0px' }}>
        <div className="detail-grid">
          <div>
            <span className="detail-label">Role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span className="detail-label">Stack</span>
            <p>{project.stack}</p>
          </div>
          <div>
            <span className="detail-label">Outcome</span>
            <p>{project.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects({ items }) {
  return (
    <section id="projects">
      <div className="section-head">
        <span className="mark">03</span>
        <h2>Selected work</h2>
      </div>
      <div className="projects">
        {items.map((p, i) => (
          <ProjectRow project={p} index={i} key={p.title} />
        ))}
      </div>
    </section>
  )
}

export default Projects
