import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config'

const FloatingHeart = ({ delay, x, size }) => (
  <motion.div
    className="absolute text-romantic-pink opacity-40"
    style={{ left: `${x}%`, top: `${20 + Math.random() * 60}%`, fontSize: size }}
    initial={{ y: 100, opacity: 0 }}
    animate={{
      y: [-20, 20, -20],
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  >
    💕
  </motion.div>
)

export default function Hero({ onUnlock, isUnlocked }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.toLowerCase().replace(/\s/g, '') === CONFIG.password.toLowerCase().replace(/\s/g, '')) {
      setError('')
      onUnlock()
      if (navigator.vibrate) navigator.vibrate(50)
    } else {
      setError('Try again... 💕')
      setPassword('')
      if (navigator.vibrate) navigator.vibrate([50, 50, 50])
    }
  }

  if (isUnlocked) return null

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-romantic-pink/20 via-romantic-mint/10 to-romantic-gold/20 dark:from-romantic-pink/30 dark:via-purple-900/20 dark:to-romantic-gold/20">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 0.3}
            x={Math.random() * 100}
            size={16 + Math.random() * 24}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showInput ? (
          <motion.div
            key="welcome"
            className="text-center px-6 z-10 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowInput(true)}
          >
            <motion.h1
              className="font-dancing text-4xl md:text-6xl lg:text-7xl text-romantic-pink mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Happy Birthday
            </motion.h1>
            <motion.span
              className="font-dancing text-5xl md:text-7xl lg:text-8xl block text-romantic-pink drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: [1, 1.03, 1],
                textShadow: [
                  '0 0 20px rgba(255, 107, 157, 0.45)',
                  '0 0 36px rgba(255, 217, 61, 0.35)',
                  '0 0 20px rgba(255, 107, 157, 0.45)',
                ],
              }}
              transition={{
                opacity: { delay: 0.6, duration: 0.8 },
                scale: { delay: 1, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                textShadow: { delay: 1, duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {CONFIG.herName}! 💖
            </motion.span>
            <motion.p
              className="font-poppins text-romantic-pink/80 mt-6 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Tap to enter our special place →
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="password"
            onSubmit={handleSubmit}
            className="z-10 flex flex-col items-center gap-4 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-poppins text-romantic-pink text-lg mb-2">
              Enter our secret code 💕
            </p>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Say ILoveYou..."
              className="w-64 md:w-80 px-4 py-3 rounded-full border-2 border-romantic-pink/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur text-center font-poppins focus:outline-none focus:ring-2 focus:ring-romantic-pink focus:border-transparent placeholder:text-gray-400"
              autoFocus
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-romantic-pink text-white font-poppins font-medium hover:bg-romantic-pink/90 transition-all active:scale-95"
            >
              Enter
            </button>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-romantic-pink font-poppins text-sm"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}
