import { useState, useEffect } from 'react'

/**
 * Custom hook for typing/rotating role text in hero
 * @param {string[]} words - Array of strings to cycle through
 * @param {number} typingSpeed - Speed of typing each char (ms)
 * @param {number} deletingSpeed - Speed of deleting each char (ms)
 * @param {number} delay - Pause duration before deleting (ms)
 */
export default function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 40, delay = 1800) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words || words.length === 0) return

    const currentWord = words[index]

    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), delay)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, delay])

  if (!words || words.length === 0) return ''
  return words[index].substring(0, subIndex)
}
