import { useState } from 'react'
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
  const [darkMode, setDarkMode] = useState(false)

  const musicSources = (CONFIG.musicSources ?? []).filter(Boolean)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Hero onUnlock={() => setIsUnlocked(true)} isUnlocked={isUnlocked} />

      {isUnlocked && (
        <>
          <RomanticAtmosphere />
          <div className="relative z-10 min-h-0 romantic-page-glow">
            <PhotoCarousel />
            <LoveMessages />
            <Countdown />
            <FinalSurprise />
          </div>

          <MusicPlayer sources={musicSources} title={CONFIG.musicTitle} />

          {/* Dark/Light toggle — top-left so it doesn’t crowd the music FAB */}
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
        </>
      )}
    </div>
  )
}

export default App
