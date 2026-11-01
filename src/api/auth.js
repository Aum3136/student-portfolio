// Security note: Storing tokens in localStorage makes them readable by any script
// on the page (susceptible to XSS). This is acceptable for this coursework app,
// but httpOnly cookies are preferable in production to prevent script access.
// Never log tokens or passwords, never include them in URLs, and never store passwords.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`)
  }
  return data
}

export const register = (email, password) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)

export const login = async (email, password) => {
  const data = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)

  if (data?.token) {
    try {
      localStorage.setItem('token', data.token)
    } catch {
      // Ignore localStorage access failures (e.g. private mode restrictions)
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-change'))
    }
  }

  return data
}

export const logout = () => {
  try {
    localStorage.removeItem('token')
  } catch {
    // Ignore localStorage access failures
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'))
  }
}

export const isLoggedIn = () => {
  try {
    return Boolean(localStorage.getItem('token'))
  } catch {
    return false
  }
}

