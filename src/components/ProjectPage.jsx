import { useEffect, useState } from 'react'
import Projects from '../components/Projects.jsx'
import Spinner from '../components/Spinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import RepoList from '../components/RepoList.jsx'

const GITHUB_USERNAME = 'Aum3136' // ← swap this for your own GitHub username

const projects = [
  {
    title: 'Portfolio Engine',
    hook: 'A component-driven site that renders its own data, instead of hardcoding markup.',
    tag: 'React · Vite',
    role: 'Sole developer — design, components, and deployment.',
    stack: 'React, React Router, Vite, plain CSS with custom properties.',
    outcome: 'A reusable, prop-driven multi-page site with client-side routing.',
  },
  {
    title: 'TaskFlow API',
    hook: 'A REST backend for a task manager, built on Node.js and Express with JWT auth.',
    tag: 'Node.js · MongoDB',
    role: 'Backend developer — API design and auth flow.',
    stack: 'Node.js, Express, MongoDB, JSON Web Tokens.',
    outcome: 'A documented REST API supporting create/read/update/delete task flows with per-user auth.',
  },
  {
    title: 'Churn Predictor',
    hook: 'A small ML model in Python that flags customers likely to churn, with a simple dashboard.',
    tag: 'Python · scikit-learn',
    role: 'Model author — data prep, training, and evaluation.',
    stack: 'Python, pandas, scikit-learn, a lightweight dashboard.',
    outcome: 'A classifier surfacing at-risk customers with an interpretable feature-importance view.',
  },
]

function ProjectsPage() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  // Bumping retryKey re-runs the effect below, re-triggering the fetch.
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`)
        return res.json()
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [retryKey])

  const handleRetry = () => setRetryKey((k) => k + 1)

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Projects items={projects} />

      <section id="github-repos">
        <div className="section-head">
          <span className="mark">04</span>
          <h2>Live from GitHub</h2>
        </div>

        <input
          className="repo-search"
          type="text"
          placeholder="Search repositories by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading || !!error}
        />

        {loading && <Spinner />}
        {!loading && error && <ErrorMessage message={error} onRetry={handleRetry} />}
        {!loading && !error && <RepoList data={filteredRepos} />}
      </section>
    </>
  )
}

export default ProjectsPage