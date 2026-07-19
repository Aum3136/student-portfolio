import { useState } from 'react'

const MAX_LENGTH = 300

function Contact() {
  // useState #1 — controlled form input
  const [message, setMessage] = useState('')

  // useState #2 — toggling UI visibility (a help tooltip)
  const [showHelp, setShowHelp] = useState(false)

  return (
    <section id="contact-page" className="is-visible">
      <div className="section-head">
        <span className="mark">03</span>
        <h2>Contact</h2>
      </div>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="message">
          Your message
          <button
            type="button"
            className="help-toggle"
            onClick={() => setShowHelp((prev) => !prev)}
            aria-expanded={showHelp}
          >
            ?
          </button>
        </label>

        {showHelp && (
          <p className="help-tooltip">
            Tell me a bit about your project, timeline, or just say hi — I read everything myself.
          </p>
        )}

        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          rows={6}
          placeholder="Type your message here..."
        />

        <div className="char-count">
          {message.length} / {MAX_LENGTH} characters
        </div>

        <button type="submit" className="btn" disabled={message.trim().length === 0}>
          Send message
        </button>
      </form>
    </section>
  )
}

export default Contact
