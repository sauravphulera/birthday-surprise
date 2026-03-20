/**
 * 🎂 Personalization Config - Edit these values for your special someone!
 */

/** Turn `weMet.jpg` / `OurFirstTrek.jpg` into captions like "We Met..", "Our First Trek.." */
export function captionFromPhotoFilename(filename) {
  const base = filename.replace(/\.[^.]+$/i, '')
  const spaced = base
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
  const words = spaced.split(/\s+/).filter(Boolean)
  const title = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
  return `${title}..`
}

export const CONFIG = {
  // Her name (shown in hero)
  herName: 'Ankita',

  // Password to unlock (our anniversary date format: DDMMYYYY or a phrase)
  // Examples: "15032024", "ILoveYou", "Forever"
  password: 'ILoveYou',

  // Countdown target - her birthday (YYYY-MM-DD) and optional time (HH:MM)
  birthdayDate: `2026-03-21`, // e.g. 2026-03-20
  birthdayTime: '00:00', // Midnight

  // Photo timeline — files live in public/photos/ (deployed with the site)
  // Tip: HEIC files in that folder won’t show in most browsers; convert to JPG if needed.
  photos: [
    { src: '/photos/weMet.jpg', caption: captionFromPhotoFilename('weMet💖.jpg') },
    { src: '/photos/WeStartedFromHere.jpg', caption: captionFromPhotoFilename('WeStartedDating.jpg') },
    { src: '/photos/OurFirstTrek.jpg', caption: captionFromPhotoFilename('OurFirstTrek💖.jpg') },
    { src: '/photos/5520f147-2088-47ae-b0df-5b5af60c3c77.jpg', caption: 'I Kissed You😍' },
    { src: '/photos/a802e8dd-9655-4eac-a3c5-8bb78618e60e.jpg', caption: 'My favorite kiss 😘' },
    { src: '/photos/IMG_1773.jpg', caption: `I don't know when... 💖` },
    { src: '/photos/7f857029-e97a-4838-8a3b-5042c611b217.jpg', caption: 'You became my whole heart ❤️' },
    { src: '/photos/03b43d37-4bf2-42b8-a05a-f79f04beaffa.jpg', caption: 'You have the most beautiful smile 💕' },
    { src: '/photos/2da18b19-9c6b-48a2-b8b8-a62545cd17df.jpg', caption: 'You are most beautiful girl in the world 🌟' },
    { src: '/photos/a53490e8-13f0-4027-9b65-28e709b75de8.jpg', caption: 'I want to hold on to you always 💖' },
    { src: '/photos/IMG_9916.jpg', caption: 'You are My favorite person 😘' },
    { src: '/photos/IMG_8441.jpg', caption: 'Thanks for being in my life 💖' },
  ],

  // Love messages (front text, back/reveal text)
  loveMessages: [
    { front: 'You are...', back: '...the best thing that ever happened to me. Every day with you is a gift. 💖' },
    { front: 'I love you because...', back: '...you make me want to be a better person. Your smile lights up my world. 🌟' },
    { front: 'My favorite memory...', back: '...is every moment we\'ve shared. But if I had to pick one—the first time you said you loved me. 💕' },
    { front: 'You deserve...', back: '...all the happiness in the world. Today and every day, I celebrate you. 🎂' },
    { front: 'Forever...', back: '...yours. No matter what, I\'ll always be here. Happy Birthday, my love! 💝' },
    { front: 'Today is special because...', back: '...it\'s the day the most amazing person was born. You! 🎉' },
    { front: 'My promise to you...', back: '...I\'ll love you more each day. Happy Birthday, beautiful! 💗' },
  ],

  // Background music — tries in order: add YOUR love song as /public/music.mp3 (best for romance + offline)
  // Fallback URL is royalty-free demo audio if local file is missing (replace with your own hosted MP3 if you prefer)
  musicSources: [
    '/music.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  ],
  musicTitle: 'For you 💕',

  // Final surprise message
  finalMessage: 'Forever yours 💕',
  finalSubtext: 'your favorite boyfriend 😉',
}
