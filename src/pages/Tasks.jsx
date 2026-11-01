import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks.js'
import { generateDescription } from '../api/ai.js'
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
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [isAiSuggested, setIsAiSuggested] = useState(false)

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
    setTimeout(() => setToast({ message: '', type }), 3000)
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

  const handleSuggest = async () => {
    if (title.trim().length < 3 || generating) return

    setGenerating(true)
    try {
      const data = await generateDescription(title.trim())
      if (data?.fallback) {
        showToast(data.message || 'AI suggestion is unavailable right now.', 'info')
        return
      }

      if (data?.description) {
        setDescription(data.description)
        setIsAiSuggested(true)
        showToast('AI description suggested!', 'success')
      }
    } catch (err) {
      if (handleAuthError(err)) return
      showToast(err.message || 'Failed to generate description', 'error')
    } finally {
      setGenerating(false)
    }
  }

  const handleCreate = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setCreating(true)

    const newTaskData = {
      title: title.trim(),
      ...(description.trim() ? { description: description.trim() } : {}),
    }

    // Optimistic UI update — show it immediately with a temp id.
    const tempTask = {
      _id: `temp-${Date.now()}`,
      title: newTaskData.title,
      description: newTaskData.description || '',
      completed: false,
    }
    setTasks((prev) => [...prev, tempTask])
    setTitle('')
    setDescription('')
    setIsAiSuggested(false)

    createTask(newTaskData)
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

      <form className="task-form-card" onSubmit={handleCreate}>
        <div className="task-form-row">
          <input
            type="text"
            placeholder="New task title (min 3 characters for AI suggestion)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="task-form-actions">
            <button
              type="button"
              className="btn ai-btn"
              onClick={handleSuggest}
              disabled={generating || title.trim().length < 3}
              title={
                title.trim().length < 3
                  ? 'Title must be at least 3 characters to suggest description'
                  : 'Suggest an AI description'
              }
            >
              {generating ? (
                <>
                  <span className="spinner-inline" />
                  <span>Generating...</span>
                </>
              ) : (
                'Suggest description'
              )}
            </button>
            <button className="btn" type="submit" disabled={creating || !title.trim()}>
              {creating ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </div>

        <div className="task-desc-wrap">
          <textarea
            className="task-desc-input"
            placeholder="Task description (optional or generated by AI)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          {isAiSuggested && (
            <div className="ai-disclaimer-box" role="status">
              <span className="ai-disclaimer-text">
                AI-generated suggestion. Please review and edit before saving.
              </span>
              <div className="ai-disclaimer-actions">
                <button
                  type="button"
                  className="ai-action-btn use"
                  onClick={() => setIsAiSuggested(false)}
                >
                  Use this
                </button>
                <button
                  type="button"
                  className="ai-action-btn dismiss"
                  onClick={() => {
                    setDescription('')
                    setIsAiSuggested(false)
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
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
                <div className="task-content">
                  <span className="task-title">{task.title}</span>
                  {task.description && <p className="task-desc">{task.description}</p>}
                </div>
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
