function Footer({ email }) {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="letter">
          <p className="greet">Dear reader,</p>
          <p>
            If something here made you curious — a project, a stack choice,
            or you just want to talk shop over chai — my inbox is genuinely
            open. I reply to most things within a day or two.
          </p>
          <p className="sign-off">— Aum</p>
        </div>
        <div className="foot-links">
          <a href={`mailto:${email}`}>email</a>
          <a href="#">github</a>
          <a href="#">linkedin</a>
          <a href="#">resume</a>
        </div>
        <div className="foot-bottom">
          <span>© 2026, built by hand.</span>
          <span>Vadodara, India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
