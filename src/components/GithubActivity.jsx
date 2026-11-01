import React, { useEffect, useState } from 'react'

const TARGET_REPOS = [
  'task-manager-api',
  'student-portfolio',
  'AUM_Portfolio',
  'itue301-exam-24IT058-C1',
  'Sahyog'
]

function formatTimeAgo(dateString) {
  if (!dateString) return ''
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffDay > 0) return `${diffDay}d ago`
  if (diffHr > 0) return `${diffHr}h ago`
  if (diffMin > 0) return `${diffMin}m ago`
  return 'just now'
}

export default function GithubActivity({ username = 'Aum3136' }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      const cacheKey = `gh_activity_${username}`
      const cached = sessionStorage.getItem(cacheKey)

      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          // Use cached data if fresh (less than 15 mins)
          if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
            setActivities(parsed.data)
            setLoading(false)
            return
          }
        } catch (e) {
          sessionStorage.removeItem(cacheKey)
        }
      }

      try {
        // Fetch user public events to capture pushes across repos
        const res = await fetch(`https://api.github.com/users/${username}/events/public`)
        if (!res.ok) throw new Error('Failed to fetch')
        const events = await res.json()

        const pushEvents = Array.isArray(events)
          ? events.filter(e => e.type === 'PushEvent')
          : []

        const latestByRepo = {}
        pushEvents.forEach(evt => {
          const repoShortName = evt.repo?.name ? evt.repo.name.split('/')[1] : null
          if (repoShortName && !latestByRepo[repoShortName]) {
            latestByRepo[repoShortName] = {
              repo: repoShortName,
              action: 'last pushed',
              time: formatTimeAgo(evt.created_at)
            }
          }
        })

        // Build list strictly ordered by TARGET_REPOS
        const results = TARGET_REPOS.map(repo => {
          if (latestByRepo[repo]) {
            return latestByRepo[repo]
          }
          return {
            repo,
            action: 'last pushed',
            time: 'recently'
          }
        })

        setActivities(results)
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data: results,
          timestamp: Date.now()
        }))
      } catch (err) {
        // Fallback to static items if GitHub rate-limits
        setActivities(TARGET_REPOS.map(repo => ({
          repo,
          action: 'last pushed',
          time: 'recently'
        })))
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [username])

  return (
    <div className="gh-activity-card">
      <div className="gh-activity-header">
        <div>
          <span className="gh-badge">GITHUB ACTIVITY</span>
          <h2 className="gh-title">Latest Repository Commits</h2>
          <p className="gh-subtitle">
            Live stream of recent pushes and commits across my active public repositories. Cached locally to preserve API rate-limits.
          </p>
        </div>
        <div className="gh-live-indicator">
          <span className="gh-live-dot" />
          <span>LIVE</span>
        </div>
      </div>

      <div className="gh-terminal">
        <div className="gh-terminal-topbar">
          <span className="terminal-user">aum@antigravity:~</span>
          <span className="terminal-dims">bash — 80x24</span>
        </div>

        <div className="gh-terminal-body">
          {loading ? (
            <div className="terminal-row terminal-muted">Fetching latest activities...</div>
          ) : (
            activities.map(item => (
              <div key={item.repo} className="terminal-row">
                <span className="terminal-repo">[{item.repo}]</span>
                <span className="terminal-action">{item.action}</span>
                <span className="terminal-time">·{item.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}