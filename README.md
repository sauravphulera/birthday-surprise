# 💖 Romantic Birthday Surprise

A beautiful, personalized birthday website for your special someone. Built with React 18, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Hero Section** – Password-protected entrance (anniversary date or "ILoveYou")
- **Photo Timeline** – Auto-scrolling carousel with touch/swipe support
- **Love Messages** – Flip cards with personalized messages
- **Countdown Timer** – Live countdown to midnight (heart explosion at zero!)
- **Music Player** – Floating play/pause for your song
- **Final Surprise** – Scroll-triggered confetti shower
- **Dark/Light Mode** – Romantic candlelight toggle
- **PWA Ready** – Add to home screen on mobile

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## ⚙️ Personalization

Edit `src/config.js`:

| Setting | Description |
|---------|-------------|
| `herName` | Her name (shown in hero) |
| `password` | Unlock code (e.g. "15032024", "ILoveYou") |
| `birthdayDate` | Countdown target (YYYY-MM-DD) |
| `photos` | Your photo URLs + captions |
| `loveMessages` | Front/back text for flip cards |
| `musicSources` | Audio URLs in order — put **`public/music.mp3`** first for your real love song; a demo URL is used only if that file is missing |

## 📸 Adding Your Photos

1. Add images to `public/photos/` (e.g. `1.jpg`, `2.jpg`)
2. Update `photos` in `src/config.js`:
   ```js
   { src: '/photos/1.jpg', caption: 'Our first date 💕' }
   ```

## 🎵 Adding Music (phones too)

1. Export or download your song as **MP3** and save it as **`public/music.mp3`** (best quality + works offline when deployed).
2. Browsers usually **block autoplay** — visitors tap the **💕 “Tap for our song”** chip or the **🎵** button (one tap starts playback; iOS uses `playsInline` so it stays in-page).
3. In `config.js`, edit `musicSources`: keep `/music.mp3` first; replace or remove the demo URL in the second slot if you only use your file.

## 📱 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your repo at [vercel.com](https://vercel.com) for automatic deploys.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx
│   ├── PhotoCarousel.jsx
│   ├── LoveMessages.jsx
│   ├── Countdown.jsx
│   ├── MusicPlayer.jsx
│   └── FinalSurprise.jsx
├── hooks/
│   └── useConfetti.js
├── config.js      ← Edit this!
├── App.jsx
└── main.jsx
```

---

Made with 💖 for someone special
