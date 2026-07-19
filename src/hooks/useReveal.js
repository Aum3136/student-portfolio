import { useEffect, useRef, useState } from 'react'

// Reveals an element the first time it scrolls into view.
// Mirrors "motion with intent" — a single fade/slide, not repeated on every scroll.
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // reveal once, don't re-trigger
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

export default useReveal
