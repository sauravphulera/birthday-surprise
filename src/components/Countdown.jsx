import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useConfetti } from '../hooks/useConfetti'

function parseTarget() {
  const datePart = CONFIG.birthdayDate.split('T')[0] || CONFIG.birthdayDate
  const timePart = CONFIG.birthdayTime || '00:00'
  const [y, m, d] = datePart.split('-').map(Number)
  const [h, min] = (timePart || '00:00').split(':').map(Number)
  return new Date(y, m - 1, d, h, min, 0)
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [hasHitZero, setHasHitZero] = useState(false)
  const { fire } = useConfetti()

  useEffect(() => {
    const target = parseTarget()
    const tick = () => {
      const now = new Date()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
        if (!hasHitZero) {
          setHasHitZero(true)
          fire()
          if (navigator.vibrate) navigator.vibrate([100, 50, 100])
        }
        return
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ d, h, m, s })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [hasHitZero, fire])

  const units = [
    { label: 'Days', value: timeLeft.d },
    { label: 'Hours', value: timeLeft.h },
    { label: 'Mins', value: timeLeft.m },
    { label: 'Secs', value: timeLeft.s },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-romantic-pink/20 to-romantic-mint/20 dark:from-romantic-pink/30 dark:to-purple-900/30">
      <motion.h2
        className="font-dancing text-4xl md:text-5xl text-center text-romantic-pink mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {hasHitZero ? "It's Your Day! 🎉" : "Counting Down to Your Day ⏰"}
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-4 md:gap-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {units.map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-4 min-w-[80px] text-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="font-dancing text-4xl md:text-5xl text-romantic-pink">
              {String(value).padStart(2, '0')}
            </div>
            <div className="font-poppins text-sm text-gray-600 dark:text-gray-400">
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {hasHitZero && (
        <motion.p
          className="font-dancing text-3xl text-center text-romantic-pink mt-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          Happy Birthday! 💖🎂💖
        </motion.p>
      )}
    </section>
  )
}
