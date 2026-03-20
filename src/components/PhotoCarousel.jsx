import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const scrollRef = useRef(null)

  const photos = CONFIG.photos
  const minSwipeDistance = 50

  useEffect(() => {
    if (isPaused || photos.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, photos.length])

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false)
      return
    }
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) setCurrent((prev) => (prev + 1) % photos.length)
    if (isRightSwipe) setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
    setTimeout(() => setIsPaused(false), 500)
  }

  const pauseAutoThenResume = () => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000)
  }

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
    pauseAutoThenResume()
    if (navigator.vibrate) navigator.vibrate(15)
  }

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % photos.length)
    pauseAutoThenResume()
    if (navigator.vibrate) navigator.vibrate(15)
  }

  if (photos.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-romantic-mint/20 to-romantic-gold/10 dark:from-purple-900/20 dark:to-romantic-pink/10">
      <motion.h2
        className="font-dancing text-4xl md:text-5xl text-center text-romantic-pink mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Memories 💕
      </motion.h2>

      <div
        ref={scrollRef}
        className="max-w-2xl mx-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-romantic-pink/10 shadow-inner">
          {/* Cute prev / next — big tap targets, hearts */}
          <motion.button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-romantic-pink to-romantic-gold text-white shadow-lg ring-2 ring-white/70 backdrop-blur-sm active:scale-95 md:left-3"
            aria-label="Previous photo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-lg md:text-xl" aria-hidden>
              💕
            </span>
          </motion.button>
          <motion.button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-romantic-gold to-romantic-pink text-white shadow-lg ring-2 ring-white/70 backdrop-blur-sm active:scale-95 md:right-3"
            aria-label="Next photo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="text-lg md:text-xl" aria-hidden>
              💖
            </span>
          </motion.button>

          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={false}
              animate={{
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 0.95,
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative w-full h-full flex items-center justify-center p-4"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-xl ring-2 ring-romantic-pink/30"
                  loading="lazy"
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg font-poppins text-sm text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {photo.caption}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-romantic-pink w-6' : 'bg-romantic-pink/40'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
