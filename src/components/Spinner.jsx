function Spinner() {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <span className="spinner-label">Loading repositories…</span>
    </div>
  )
}

export default Spinner