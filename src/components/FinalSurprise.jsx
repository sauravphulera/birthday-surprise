import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useConfetti } from '../hooks/useConfetti'
import { CONFIG } from '../config'

export default function FinalSurprise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { fire } = useConfetti()
  const firedRef = useRef(false)

  useEffect(() => {
    if (isInView && !firedRef.current) {
      firedRef.current = true
      fire()
      if (navigator.vibrate) navigator.vibrate([50, 30, 50])
    }
  }, [isInView, fire])

  const floaters = ['💕', '✨', '💗', '🌸', '💝']

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4 bg-gradient-to-b from-romantic-pink/30 via-romantic-gold/20 to-romantic-mint/30 dark:from-purple-900/40 dark:via-romantic-pink/20 dark:to-romantic-gold/20"
    >
      {floaters.map((emoji, i) => (
        <motion.span
          key={emoji + i}
          className="pointer-events-none absolute text-2xl opacity-50 md:text-3xl"
          style={{
            left: `${12 + i * 18}%`,
            top: `${20 + (i % 3) * 22}%`,
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          aria-hidden
        >
          {emoji}
        </motion.span>
      ))}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-dancing text-5xl md:text-7xl text-romantic-pink mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {CONFIG.finalMessage}
        </motion.h2>
        <motion.p
          className="font-poppins text-romantic-pink/80 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {CONFIG.finalSubtext}
        </motion.p>
        <motion.p
          className="mt-6 font-dancing text-2xl text-romantic-gold"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden
        >
          ~ always ~
        </motion.p>
      </motion.div>
    </section>
  )
}
