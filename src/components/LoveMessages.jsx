import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'

const gradients = [
  'from-romantic-pink to-romantic-gold',
  'from-purple-500 to-romantic-pink',
  'from-romantic-gold to-romantic-mint',
  'from-romantic-mint to-romantic-pink',
  'from-romantic-pink to-purple-600',
  'from-romantic-gold to-romantic-pink',
  'from-purple-600 to-romantic-mint',
]

export default function LoveMessages() {
  const [flipped, setFlipped] = useState({})

  const toggleFlip = (i) => {
    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
    if (navigator.vibrate) navigator.vibrate(30)
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-romantic-gold/10 to-romantic-pink/20 dark:from-purple-900/30 dark:to-romantic-pink/20">
      <motion.h2
        className="font-dancing text-4xl md:text-5xl text-center text-romantic-pink mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Love Letters 💌
      </motion.h2>

      <div className="max-w-2xl mx-auto space-y-6">
        {CONFIG.loveMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="perspective-1000"
          >
            <div
              className="relative h-32 cursor-pointer select-none"
              onClick={() => toggleFlip(i)}
              style={{ minHeight: '8rem', perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped[i] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-xl flex items-center justify-center p-6`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="font-dancing text-2xl md:text-3xl text-white text-center">
                    {msg.front}
                  </p>
                </div>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-xl flex items-center justify-center p-6`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="font-poppins text-sm md:text-base text-white text-center">
                    {msg.back}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
