const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const authHeader = () => {
  try {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}

async function handleResponse(res) {
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

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`)
  }
  return data
}

export const getTasks = () =>
  fetch(`${BASE_URL}/tasks`, {
    headers: {
      ...authHeader(),
    },
  }).then(handleResponse)

export const createTask = (task) =>
  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(task),
  }).then(handleResponse)

export const updateTask = (id, updates) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(updates),
  }).then(handleResponse)

export const deleteTask = (id) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeader(),
    },
  }).then(handleResponse)
