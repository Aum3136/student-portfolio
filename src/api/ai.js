import { authHeader } from './tasks.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const generateDescription = async (title) => {
  const res = await fetch(`${BASE_URL}/api/ai/generate-description`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify({ title }),
  })

  if (res.status === 401) {
    try {
      localStorage.removeItem('token')
    } catch {
      // Ignore localStorage access failures
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth-change'))
    }
    throw new Error('Session expired, please log in again')
  }

  const data = await res.json().catch(() => ({}))

  if (res.status === 429) {
    const retryAfter = data.retryAfter
    const message = retryAfter
      ? `Too many requests. Please wait ${retryAfter} seconds before asking again.`
      : (data.error || 'Too many requests. Please wait before asking again.')
    throw new Error(message)
  }

  if (res.status === 400) {
    throw new Error(data.error || 'Invalid task title (must be between 3 and 100 characters).')
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`)
  }

  return data
}

