import { useEffect, useState } from 'react'

// Ensures a loading state stays visible for at least `ms`,
// even if the actual load finishes faster — avoids a jarring flash.
function useMinDelay(ms = 300) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), ms)
    return () => clearTimeout(timer)
  }, [ms])

  return ready
}

export default useMinDelay