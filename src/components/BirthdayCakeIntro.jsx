import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'

const HEARTS = ['💕', '💖', '💗', '💝', '❤️', '🩷']

function candleDigitsFromConfig() {
  if (Array.isArray(CONFIG.cakeCandleDigits) && CONFIG.cakeCandleDigits.length > 0) {
    return CONFIG.cakeCandleDigits.map(String)
  }
  return String(CONFIG.cakeCandleAge ?? 27).split('')
}

/**
 * Blocky birthday cake (same-width rows — not a triangle), plus numbered candles on top.
 */
function getCakeSlots() {
  const slots = []
  function row(count, y, spread) {
    const step = count > 1 ? spread / (count - 1) : 0
    const start = 50 - (step * (count - 1)) / 2
    for (let i = 0; i < count; i++) {
      slots.push({
        x: count === 1 ? 50 : start + i * step,
        y,
        kind: 'heart',
      })
    }
  }

  const spread = 46
  const cols = 8

  // Plate (slightly wider band) — same width as before
  row(10, 86, 54)

  // Shorter cake: fewer rows, tighter vertical spacing; spread & cols unchanged
  const bodyRows = [78, 73, 68, 63, 58, 53]
  for (const y of bodyRows) {
    row(cols, y, spread)
  }

  const digits = candleDigitsFromConfig()
  const gap = digits.length > 2 ? 11 : 15
  const startX = 50 - ((digits.length - 1) * gap) / 2
  // `top` % is where the bottom of the candle (digit base) meets the cake
  digits.forEach((digit, idx) => {
    slots.push({
      x: startX + idx * gap,
      y: 48,
      kind: 'ageCandle',
      digit,
    })
  })

  return slots
}

function heartEmoji(i) {
  return HEARTS[i % HEARTS.length]
}

/**
 * Scattered hearts (and candles) that gather into a birthday cake on the welcome screen.
 */
export default function BirthdayCakeIntro({ visible, className = '' }) {
  const cakeSlots = useMemo(() => getCakeSlots(), [])
  const count = cakeSlots.length

  const scatter = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 84,
        rotate: Math.random() * 56 - 28,
        scale: 0.55 + Math.random() * 0.45,
      })),
    [count],
  )

  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    if (!visible) {
      setAssembled(false)
      return
    }
    const id = window.setTimeout(() => setAssembled(true), 2100)
    return () => clearTimeout(id)
  }, [visible])

  return (
    <motion.div
      className={`relative mx-auto w-full max-w-[min(100%,340px)] touch-none select-none ${className}`}
      style={{ height: 'min(32vh, 300px)' }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      aria-hidden
    >
      <div className="absolute inset-0 overflow-visible">
        {cakeSlots.map((slot, i) => {
          const s = scatter[i]
          const isCandle = slot.kind === 'ageCandle'
          return (
            <motion.span
              key={i}
              className={`absolute -translate-x-1/2 leading-none will-change-transform ${
                isCandle
                  ? '-translate-y-full flex flex-col items-center gap-px'
                  : '-translate-y-1/2 text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(255,107,157,0.45)]'
              }`}
              initial={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: 0,
                scale: 0.2,
                rotate: s.rotate,
              }}
              animate={{
                left: `${assembled ? slot.x : s.x}%`,
                top: `${assembled ? slot.y : s.y}%`,
                opacity: 1,
                scale: assembled ? 1 : s.scale,
                rotate: assembled ? 0 : s.rotate,
              }}
              transition={{
                opacity: { duration: 0.4, delay: i * 0.02 },
                left: assembled
                  ? { type: 'spring', stiffness: 115, damping: 15, delay: i * 0.016 }
                  : { duration: 0 },
                top: assembled
                  ? { type: 'spring', stiffness: 115, damping: 15, delay: i * 0.016 }
                  : { duration: 0 },
                scale: assembled
                  ? { type: 'spring', stiffness: 130, damping: 17, delay: i * 0.016 }
                  : { duration: 0.45, delay: i * 0.022 },
                rotate: assembled
                  ? { type: 'spring', stiffness: 95, damping: 18, delay: i * 0.016 }
                  : { duration: 0.55, delay: i * 0.02 },
              }}
            >
              {isCandle ? (
                <>
                  <span className="text-[0.7rem] leading-none md:text-[0.85rem]" aria-hidden>
                    🔥
                  </span>
                  {/* Wax: taller than a single candle emoji */}
                  <div
                    className="w-[5px] shrink-0 rounded-full bg-linear-to-b from-amber-50 via-amber-100 to-amber-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.65)] ring-1 ring-amber-300/45 dark:from-amber-200/90 dark:via-amber-300/80 dark:to-amber-400/70 dark:ring-amber-500/30"
                    style={{ height: '26px' }}
                  />
                  <div
                    className="w-[6px] shrink-0 rounded-full bg-linear-to-b from-amber-100 to-amber-300/90 ring-1 ring-amber-400/40 dark:from-amber-300/80 dark:to-amber-500/70"
                    style={{ height: '14px' }}
                  />
                  <span className="mt-px min-w-[0.85rem] rounded-sm bg-amber-100/95 px-1 py-px text-center font-dancing text-[0.7rem] font-semibold tabular-nums text-amber-950 shadow-sm ring-1 ring-amber-400/55 dark:bg-amber-900/70 dark:text-amber-50 dark:ring-amber-600/40 md:text-xs">
                    {slot.digit}
                  </span>
                </>
              ) : (
                heartEmoji(i)
              )}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}
