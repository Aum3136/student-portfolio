import AmbientBlobs from './AmbientBlobs.jsx'
import useTypingEffect from '../hooks/useTypingEffect.js'

const ROLES = [
  'Full-Stack Developer',
  'React Developer',
  'ML Enthusiast',
  'Node.js Engineer',
]

function Header({ name, role, themeColor }) {
  const typedRole = useTypingEffect(ROLES)

  return (
    <div className="hero" id="top">
      <AmbientBlobs />
      <div className="eyebrow">Currently building · Ahmedabad, India</div>
      <h1 className="title">
        I write software that feels{' '}
        <em style={{ color: themeColor }}>considered</em>, not just functional.
      </h1>
      <p className="hero-sub">
        {name} — <span className="typing-role">{typedRole}<span className="typing-cursor">|</span></span>. Working across React, Node.js, Python, and applied ML.
      </p>
      <div className="hero-links">
        <a className="btn" style={{ borderColor: themeColor, color: themeColor }} href="#projects">
          See the work
        </a>
        <a className="btn ghost" href="#contact">
          Say hello
        </a>
        <a className="btn ghost resume-btn" href="/resume.pdf" download>
          Resume ↗
        </a>
      </div>
    </div>
  )
}

export default Header
