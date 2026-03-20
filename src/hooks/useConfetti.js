import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const firedRef = useRef(false)

  const fire = useCallback(() => {
    const duration = 3 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B9D', '#FFD93D', '#A8E6CF', '#ffffff'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B9D', '#FFD93D', '#A8E6CF', '#ffffff'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return { fire }
}
