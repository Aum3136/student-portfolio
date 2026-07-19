import useReveal from '../hooks/useReveal.js'
import Marquee from './Marquee.jsx'

function Skills({ skillGroups, marqueeItems }) {
  const [ref, visible] = useReveal()

  return (
    <section id="skills" ref={ref} className={visible ? 'is-visible' : ''}>
      <div className="section-head">
        <span className="mark">02</span>
        <h2>Skills</h2>
      </div>

      {marqueeItems && marqueeItems.length > 0 && (
        <Marquee items={marqueeItems} />
      )}

      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div className="chips">
              {group.items.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
