import { motion } from 'framer-motion'

/** Soft floating orbs + sparkles behind main content (pointer-events none). */
export default function RomanticAtmosphere() {
  const orbs = [
    { className: 'bg-romantic-pink/25', left: '5%', top: '10%', size: 180 },
    { className: 'bg-romantic-gold/20', left: '70%', top: '20%', size: 220 },
    { className: 'bg-romantic-mint/20', left: '40%', top: '55%', size: 160 },
    { className: 'bg-purple-400/15 dark:bg-romantic-pink/20', left: '15%', top: '70%', size: 200 },
  ]

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {orbs.map((o, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-3xl ${o.className}`}
          style={{
            width: o.size,
            height: o.size,
            left: o.left,
            top: o.top,
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 12, 0],
            y: [0, -10, 0],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Tiny drifting sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`spark-${i}`}
          className="absolute text-romantic-pink/40 text-sm select-none"
          style={{
            left: `${(i * 7 + 11) % 92}%`,
            top: `${15 + (i * 13) % 70}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.5, 0.15],
            rotate: [0, 180, 360],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}
