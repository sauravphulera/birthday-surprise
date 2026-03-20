import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_VOLUME = 0.42

/**
 * Mobile-friendly background music.
 * - Audio mounts early (preload); `playMusicRef.current()` should run synchronously
 *   inside the password submit handler so browsers treat it as user-initiated playback.
 * - `controlsVisible`: show FAB + optional hint only after unlock.
 */
export default function MusicPlayer({
  sources,
  title = 'Our song',
  playMusicRef,
  controlsVisible = true,
}) {
  const list = Array.isArray(sources) ? sources.filter(Boolean) : []
  const [sourceIndex, setSourceIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [exhausted, setExhausted] = useState(false)
  /** True only if autoplay was blocked after we tried from the unlock gesture */
  const [needsManualPlayHint, setNeedsManualPlayHint] = useState(false)
  const audioRef = useRef(null)

  const currentSrc = list[sourceIndex] ?? ''

  const tryNextSource = useCallback(() => {
    setSourceIndex((i) => {
      if (i + 1 < list.length) return i + 1
      setExhausted(true)
      return i
    })
  }, [list.length])

  useEffect(() => {
    if (list.length === 0) {
      setExhausted(true)
    }
  }, [list.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSrc) return

    audio.volume = DEFAULT_VOLUME

    const onError = () => tryNextSource()
    const onPlay = () => {
      setIsPlaying(true)
      setNeedsManualPlayHint(false)
    }
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('error', onError)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    setIsPlaying(false)
    audio.load()

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [currentSrc, tryNextSource])

  const playNow = useCallback(() => {
    const audio = audioRef.current
    if (!audio || exhausted || list.length === 0) return

    audio.volume = DEFAULT_VOLUME

    const attempt = () =>
      audio
        .play()
        .then(() => setNeedsManualPlayHint(false))
        .catch(() => setNeedsManualPlayHint(true))

    void attempt()

    // If not ready yet, try again once buffer is usable (still often OK after gesture)
    if (audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      const onCanPlay = () => {
        audio.removeEventListener('canplay', onCanPlay)
        void attempt()
      }
      audio.addEventListener('canplay', onCanPlay)
    }
  }, [exhausted, list.length])

  useLayoutEffect(() => {
    if (!playMusicRef) return
    playMusicRef.current = playNow
    return () => {
      playMusicRef.current = null
    }
  }, [playMusicRef, playNow])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio || exhausted) return
    try {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.volume = DEFAULT_VOLUME
        await audio.play()
        setNeedsManualPlayHint(false)
      }
    } catch {
      setNeedsManualPlayHint(true)
    }
    if (navigator.vibrate) navigator.vibrate(12)
  }

  if (list.length === 0 || exhausted) return null

  return (
    <>
      <audio
        key={currentSrc}
        ref={audioRef}
        src={currentSrc}
        loop
        playsInline
        preload="auto"
      />

      {controlsVisible && (
        <div
          className="fixed z-50 flex flex-col items-end gap-2"
          style={{
            right: 'max(1rem, env(safe-area-inset-right))',
            bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
          }}
        >
          <AnimatePresence>
            {needsManualPlayHint && !isPlaying && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
                onClick={toggle}
                className="max-w-[220px] rounded-2xl bg-white/90 px-3 py-2 text-left text-xs font-poppins text-romantic-pink shadow-lg ring-1 ring-romantic-pink/30 backdrop-blur-md dark:bg-gray-900/90 dark:text-romantic-pink"
              >
                <span className="font-semibold">Tap to play our song 💕</span>
                <span className="mt-0.5 block text-[10px] text-romantic-pink/70">
                  Your browser asked for one more tap
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-romantic-pink via-romantic-pink to-romantic-gold text-white shadow-xl ring-2 ring-white/60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 260 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggle}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            title={title}
          >
            {isPlaying && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full bg-romantic-pink/35"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-romantic-gold/25"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
            {isPlaying ? (
              <svg className="relative z-10 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <span className="relative z-10 text-xl" aria-hidden>
                🎵
              </span>
            )}
          </motion.button>
        </div>
      )}
    </>
  )
}
