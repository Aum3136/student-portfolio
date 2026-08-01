function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p>Couldn't load repositories: {message}</p>
      <button className="btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export default ErrorMessage