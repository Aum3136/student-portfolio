import AmbientBlobs from './AmbientBlobs.jsx'

function Header({ name, role, themeColor }) {
  return (
    <div className="hero" id="top">
      <AmbientBlobs />
      <div className="eyebrow">currently building · Ahmedabad, India</div>
      <h1 className="title">
        I write software that feels{' '}
        <em style={{ color: themeColor }}>considered</em>, not just functional.
      </h1>
      <p className="hero-sub">
        {name} — {role}. Full-stack developer working across React, Node.js,
        Python, and applied ML.
      </p>
      <div className="hero-links">
        <a className="btn" style={{ borderColor: themeColor, color: themeColor }} href="#projects">
          See the work
        </a>
        <a className="btn ghost" href="#contact">
          Say hello
        </a>
      </div>
    </div>
  )
}

export default Header
