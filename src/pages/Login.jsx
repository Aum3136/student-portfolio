import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../api/auth.js'
import Toast from '../components/Toast.jsx'

function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type }), 2500)
  }

  const validate = () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Email is required.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.')
      return false
    }

    if (!password) {
      setError('Password is required.')
      return false
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!validate()) {
      return
    }

    setLoading(true)

    if (isRegister) {
      try {
        await register(email.trim(), password)
        showToast('Registration successful! Please log in.', 'success')
        setIsRegister(false)
        setPassword('')
        setError(null)
      } catch (err) {
        setError(err.message || 'Registration failed. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      try {
        await login(email.trim(), password)
        showToast('Logged in successfully!', 'success')
        setPassword('')
        setError(null)
        navigate('/tasks')
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleMode = (targetMode) => {
    setIsRegister(targetMode)
    setError(null)
    setPassword('')
  }

  return (
    <section id="login-page" className="is-visible">
      <div className="section-head">
        <span className="mark">06</span>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
      </div>

      <div className="auth-container">
        <div className="auth-mode-toggle" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={!isRegister}
            className={`auth-mode-btn${!isRegister ? ' active' : ''}`}
            onClick={() => toggleMode(false)}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegister}
            className={`auth-mode-btn${isRegister ? ' active' : ''}`}
            onClick={() => toggleMode(true)}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className="password-input-wrap">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? isRegister
                ? 'Creating account…'
                : 'Logging in…'
              : isRegister
                ? 'Create Account'
                : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => toggleMode(!isRegister)}
          >
            {isRegister ? 'Log in' : 'Register'}
          </button>
        </p>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </section>
  )
}

export default Login

