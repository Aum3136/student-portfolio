import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks.js'
import Spinner from '../components/Spinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Toast from '../components/Toast.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

function Tasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [title, setTitle] = useState('')
  const [creating, setCreating] = useState(false)

  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [confirmId, setConfirmId] = useState(null)

  const handleAuthError = (err) => {
    if (err.message === 'Session expired, please log in again') {
      navigate('/login')
      return true
    }
    return false
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type }), 2500)
  }

  const loadTasks = () => {
    setLoading(true)
    setError(null)
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => {
        if (handleAuthError(err)) return
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setCreating(true)

    // Optimistic UI update — show it immediately with a temp id.
    const tempTask = { _id: `temp-${Date.now()}`, title, completed: false }
    setTasks((prev) => [...prev, tempTask])
    setTitle('')

    createTask({ title })
      .then((savedTask) => {
        // Replace the optimistic temp task with the real one from the server.
        setTasks((prev) =>
          prev.map((t) => (t._id === tempTask._id ? savedTask : t))
        )
        showToast('Task created', 'success')
      })
      .catch((err) => {
        // Roll back the optimistic update since the write actually failed.
        setTasks((prev) => prev.filter((t) => t._id !== tempTask._id))
        if (handleAuthError(err)) return
        showToast(`Failed to create task: ${err.message}`, 'error')
      })
      .finally(() => setCreating(false))
  }

  const handleToggle = (task) => {
    const updated = { completed: !task.completed }
    updateTask(task._id, updated)
      .then((savedTask) => {
        setTasks((prev) => prev.map((t) => (t._id === savedTask._id ? savedTask : t)))
        showToast('Task updated', 'success')
      })
      .catch((err) => {
        if (handleAuthError(err)) return
        showToast(`Failed to update task: ${err.message}`, 'error')
      })
  }

  const handleDeleteConfirmed = () => {
    const id = confirmId
    setConfirmId(null)

    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t._id !== id))
        showToast('Task deleted', 'success')
      })
      .catch((err) => {
        if (handleAuthError(err)) return
        showToast(`Failed to delete task: ${err.message}`, 'error')
      })
  }

  return (
    <section id="tasks-page" className="is-visible">
      <div className="section-head">
        <span className="mark">05</span>
        <h2>Tasks</h2>
      </div>

      <form className="task-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" type="submit" disabled={creating || !title.trim()}>
          {creating ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {loading && <Spinner />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadTasks} />}

      {!loading && !error && (
        <div className="task-list">
          {tasks.length === 0 && <p className="repo-empty">No tasks yet — add one above.</p>}
          {tasks.map((task) => (
            <div className={`task-row${task.completed ? ' completed' : ''}`} key={task._id}>
              <label className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />
                <span>{task.title}</span>
              </label>
              <button className="task-delete" onClick={() => setConfirmId(task._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        message="Delete this task? This can't be undone."
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmId(null)}
      />

      <Toast message={toast.message} type={toast.type} />
    </section>
  )
}

export default Tasks
