import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import CoupleKissAnimation from './CoupleKissAnimation'

const CAROUSEL_NEXT_HINT_KEY = 'birthday-surprise-carousel-next-hint'

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [showNextHint, setShowNextHint] = useState(() => {
    try {
      return !localStorage.getItem(CAROUSEL_NEXT_HINT_KEY)
    } catch {
      return false
    }
  })
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const scrollRef = useRef(null)
  const suppressImageClickRef = useRef(false)

  const photos = CONFIG.photos
  const minSwipeDistance = 50

  const dismissNextHint = () => {
    setShowNextHint((was) => {
      if (!was) return false
      try {
        localStorage.setItem(CAROUSEL_NEXT_HINT_KEY, '1')
      } catch {
        /* private / blocked storage */
      }
      return false
    })
  }

  useEffect(() => {
    if (isPaused || photos.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, photos.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen])

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
    if (isLeftSwipe || isRightSwipe) {
      suppressImageClickRef.current = true
      window.setTimeout(() => {
        suppressImageClickRef.current = false
      }, 320)
    }
    if (isLeftSwipe) {
      setCurrent((prev) => (prev + 1) % photos.length)
      dismissNextHint()
    }
    if (isRightSwipe) setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
    setTimeout(() => setIsPaused(false), 500)
  }

  const openLightbox = () => {
    if (suppressImageClickRef.current) return
    setLightboxOpen(true)
    setIsPaused(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setIsPaused(false)
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
    dismissNextHint()
    if (navigator.vibrate) navigator.vibrate(15)
  }

  if (photos.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-romantic-mint/20 to-romantic-gold/10 dark:from-purple-900/20 dark:to-romantic-pink/10">
      <motion.h2
        className="font-dancing text-4xl md:text-5xl text-center text-romantic-pink mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Memories 💕
      </motion.h2>

      <CoupleKissAnimation />

      <div
        ref={scrollRef}
        className="max-w-2xl mx-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative my-7 w-full md:my-10">
          <div className="relative overflow-hidden rounded-2xl aspect-[6/7] bg-romantic-pink/10 shadow-inner md:aspect-square">
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    openLightbox()
                  }}
                  className="relative flex h-full w-full cursor-zoom-in touch-manipulation flex-col items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-romantic-pink"
                  aria-label={`View larger: ${photo.caption}`}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="max-h-full max-w-full object-contain rounded-xl shadow-xl ring-2 ring-romantic-pink/30 pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                  <motion.div
                    className="pointer-events-none absolute bottom-4 left-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg font-poppins text-sm text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {photo.caption}
                  </motion.div>
                </button>
              </motion.div>
            </motion.div>
          ))}
          </div>

          {showNextHint && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-[35] flex items-center justify-end pr-[4.25rem] md:pr-[4.75rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.4 }}
            >
              <div
                className="pointer-events-auto relative max-w-[min(14.5rem,calc(100vw-6.5rem))] rounded-xl border border-romantic-pink/35 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur-sm dark:border-romantic-pink/40 dark:bg-gray-900/95"
                role="status"
                aria-live="polite"
              >
                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-romantic-pink/35 bg-white dark:border-romantic-pink/40 dark:bg-gray-900/95" />
                <p className="pr-1 font-poppins text-xs leading-snug text-gray-800 dark:text-gray-100">
                  This <span aria-hidden>💖</span> button is <strong className="font-semibold text-romantic-pink">next</strong> — tap it to see the next memory.
                </p>
                <button
                  type="button"
                  onClick={dismissNextHint}
                  className="mt-2 w-full rounded-lg bg-gradient-to-br from-romantic-pink to-romantic-gold py-1.5 font-poppins text-xs font-medium text-white shadow-md active:scale-[0.98]"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                dismissNextHint()
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-romantic-pink w-6' : 'bg-romantic-pink/40'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {lightboxOpen &&
        photos[current] &&
        createPortal(
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged photo"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <motion.img
              src={photos[current].src}
              alt={photos[current].caption}
              className="max-h-[85vh] max-w-full cursor-zoom-out object-contain shadow-2xl"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={closeLightbox}
            />
            <p className="mt-4 max-w-lg text-center font-poppins text-sm text-white/90">
              {photos[current].caption}
            </p>
            <p className="mt-2 text-center font-poppins text-xs text-white/55">
              Tap anywhere to close
            </p>
          </motion.div>,
          document.body,
        )}
    </section>
  )
}
