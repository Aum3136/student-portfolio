import useReveal from '../hooks/useReveal.js'
import profileImg from '../assets/profile.jpg'

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" ref={ref} className={visible ? 'is-visible' : ''}>
      <div className="section-head">
        <span className="mark">01</span>
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <img className="avatar" src={profileImg} alt="Aum Pandya" />
        <div className="about-text">
          <div className="now-badge">
            <span className="now-dot"></span>
            <span className="now-label">Currently Working On:</span>
            <span className="now-text">Building full-stack web apps & exploring applied ML</span>
          </div>
          <p>
            I'm <strong>Aum</strong>, a developer who spends most days
            somewhere between a terminal and a sketchbook. I care less about
            chasing every new framework and more about whether the thing I
            built actually holds up when someone leans on it.
          </p>
          <p>
            My work sits across the stack — <strong>React</strong> on the
            front, <strong>Node.js</strong> underneath, and increasingly,{' '}
            <strong>Python</strong> and small ML models when a problem needs
            a bit of intuition baked in.
          </p>
          <div className="signature-note">
            "Good code is a little like good handwriting — you can tell when
            someone actually meant it."
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
