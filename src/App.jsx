import { useState, useRef, useEffect } from 'react'
import Hero from './components/Hero'
import PhotoCarousel from './components/PhotoCarousel'
import LoveMessages from './components/LoveMessages'
import Countdown from './components/Countdown'
import MusicPlayer from './components/MusicPlayer'
import FinalSurprise from './components/FinalSurprise'
import RomanticAtmosphere from './components/RomanticAtmosphere'
import { CONFIG } from './config'

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  /** Set by MusicPlayer — call synchronously inside unlock gesture so audio can start */
  const playMusicNowRef = useRef(null)

  const musicSources = (CONFIG.musicSources ?? []).filter(Boolean)

  const handleUnlock = () => {
    setIsUnlocked(true)
    // Same synchronous turn as password submit / user gesture → best chance for autoplay (esp. mobile)
    playMusicNowRef.current?.()
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div>
      {/* Mount audio early so it preloads; play starts from handleUnlock on correct password */}
      <MusicPlayer
        sources={musicSources}
        title={CONFIG.musicTitle}
        playMusicRef={playMusicNowRef}
        controlsVisible={isUnlocked}
      />

      <Hero onUnlock={handleUnlock} isUnlocked={isUnlocked} />

      {/* Dark/Light toggle — available on lock screen too; safe-area so it misses the music FAB */}
      <button
        type="button"
        onClick={() => {
          setDarkMode((d) => !d)
          if (navigator.vibrate) navigator.vibrate(20)
        }}
        className="fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-romantic-pink/85 text-lg text-white shadow-lg ring-2 ring-white/40 transition-transform hover:scale-110 active:scale-95"
        style={{
          top: 'max(1rem, env(safe-area-inset-top))',
          left: 'max(1rem, env(safe-area-inset-left))',
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {isUnlocked && (
        <>
          <RomanticAtmosphere />
          <div className="relative z-10 min-h-0 romantic-page-glow">
            <PhotoCarousel />
            <LoveMessages />
            <Countdown />
            <FinalSurprise />
          </div>
        </>
      )}
    </div>
  )
}

export default App
