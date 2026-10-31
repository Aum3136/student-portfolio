function Footer({ email }) {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="letter">
          <p className="greet">Dear Reader,</p>
          <p>
            If something here made you curious — a project, a stack choice,
            or you just want to talk shop over chai — my inbox is genuinely
            open. I reply to most things within a day or two.
          </p>
          <p className="sign-off">— Aum</p>
        </div>
        <div className="foot-links">
          <a href={`mailto:${email}`}>Email</a>
          <a href="https://github.com/Aum3136" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/resume.pdf" download>Resume</a>
        </div>
        <div className="foot-bottom">
          <span>© 2026, Built by hand.</span>
          <span>Vadodara, India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
