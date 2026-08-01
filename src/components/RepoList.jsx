function RepoList({ data }) {
  if (data.length === 0) {
    return <div className="repo-empty">No repositories found.</div>
  }

  return (
    <div className="repo-list">
      {data.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-row"
        >
          <span>{repo.name}</span>
          <span className="repo-stars">★ {repo.stargazers_count}</span>
        </a>
      ))}
    </div>
  )
}

export default RepoList
