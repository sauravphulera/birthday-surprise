import { motion } from 'framer-motion'

const DURATION = 7.2
const REPEAT_DELAY = 0.9
const EASE = [0.45, 0.02, 0.25, 0.98]

const t = [0, 0.1, 0.26, 0.4, 0.5, 0.56, 0.62, 0.66, 0.7, 0.74, 0.82, 0.94, 1]

/* Shallow approach: lips nearly touch, torsos stay mostly separate (no deep merge) */
const guyX = [0, 1, 5, 11, 16, 20, 22.5, 23.5, 23.2, 23.5, 23.5, 12, 0]
const guyY = [0, 0, 0.25, 0.65, 1.05, 1.35, 1.5, 1.55, 1.52, 1.55, 1.55, 0.8, 0]
const guyRotate = [0, 0, 1, 2.5, 4, 5.2, 5.8, 6, 5.95, 6, 6, 3.2, 0]

/* Tiny extra Y so shoulders / faces align; she stays a hair forward for a light lip touch */
const girlX = [0, -1.2, -5.5, -12, -17, -21, -23.5, -24.5, -24.2, -24.5, -24.5, -13, 0]
const girlY = [0, 0, 0.35, 0.85, 1.25, 1.55, 1.75, 1.82, 1.78, 1.82, 1.82, 0.95, 0]
const girlRotate = [0, 0, -1, -2.5, -4, -5.2, -5.8, -6, -5.95, -6, -6, -3.2, 0]

/** Eyes open → closed through kiss → open */
const eyeOpenOp = [1, 1, 1, 1, 0.85, 0.35, 0, 0, 0, 0, 0, 0.6, 1]
const eyelidOp = [0, 0, 0, 0, 0.4, 0.85, 1, 1, 1, 1, 0.9, 0.35, 0]

const blushOp = [0.08, 0.1, 0.2, 0.38, 0.55, 0.72, 0.88, 0.92, 0.9, 0.88, 0.75, 0.35, 0.12]
const blushOp75 = blushOp.map((v) => v * 0.75)
const blushOp70 = blushOp.map((v) => v * 0.7)

/** Big heart + rose over lip meet — peaks when eyes close */
const coverOp = [0, 0, 0, 0, 0, 0.2, 0.72, 1, 1, 1, 0.98, 0.45, 0]
const coverScale = [0.45, 0.45, 0.45, 0.5, 0.62, 0.82, 1.02, 1.12, 1.14, 1.12, 1.08, 0.75, 0.45]

const kissTransition = {
  duration: DURATION,
  repeat: Infinity,
  repeatDelay: REPEAT_DELAY,
  ease: EASE,
  times: t,
}

const faceTransition = {
  duration: DURATION,
  repeat: Infinity,
  repeatDelay: REPEAT_DELAY,
  ease: EASE,
  times: t,
}

const SKIN = '#f5d0c0'
const SKIN_DARK = '#e8b5a0'
const SKIN_LIGHT = '#fde8dc'
const HAIR_BOY = '#4a3728'
const HAIR_GIRL = '#b91c1c'
const HAIR_GIRL_HI = '#ef4444'
const HOODIE = '#f9a8d4'
const HOODIE_SHADOW = '#f472b6'
const BOW = '#ec4899'
const SHIRT = '#fdf2f8'

/**
 * Close-up kiss: dark bg, pink hoodie boy, red hair + ponytail + bow girl (no tie),
 * soft lip touch (not stacked torsos); no hands in frame.
 * Heart + rose cover the faces at the kiss peak.
 */
export default function CoupleKissAnimation() {
  return (
    <motion.div
      className="mx-auto mb-1 max-w-md px-2 md:mb-2"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative mx-auto h-[3.5rem] w-[5.25rem] max-w-full shrink-0 md:h-[11rem] md:w-full md:max-w-[360px]"
        role="img"
        aria-label="Close-up animation of a couple leaning in; they close their eyes and kiss"
      >
        <svg
          className="h-full w-full overflow-visible rounded-2xl"
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="kiss-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="45%" stopColor="#134e4a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="kiss-vignette" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.55" />
            </radialGradient>
            <radialGradient id="skin-boy-cheek" cx="40%" cy="45%" r="50%">
              <stop offset="0%" stopColor={SKIN_LIGHT} />
              <stop offset="100%" stopColor={SKIN} />
            </radialGradient>
            <radialGradient id="skin-girl-cheek" cx="60%" cy="45%" r="50%">
              <stop offset="0%" stopColor={SKIN_LIGHT} />
              <stop offset="100%" stopColor={SKIN} />
            </radialGradient>
            <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor={HOODIE_SHADOW} />
            </linearGradient>
            <filter id="kiss-soft" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
            </filter>
            {/* Glossy ruby heart: hot highlight upper-left, rich red body, deep crimson edge */}
            <radialGradient
              id="cover-heart-grad"
              cx="32%"
              cy="28%"
              r="78%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
              <stop offset="12%" stopColor="#fecdd3" />
              <stop offset="32%" stopColor="#fb7185" />
              <stop offset="58%" stopColor="#e11d48" />
              <stop offset="82%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <linearGradient id="cover-heart-rim" x1="18%" y1="12%" x2="88%" y2="92%">
              <stop offset="0%" stopColor="#fda4af" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.35" />
            </linearGradient>
            <filter id="cover-heart-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow
                in="SourceGraphic"
                dx="0"
                dy="-1"
                stdDeviation="2.5"
                floodColor="#fff5f5"
                floodOpacity="0.9"
                result="rimLight"
              />
              <feDropShadow
                in="SourceGraphic"
                dx="0"
                dy="0"
                stdDeviation="6"
                floodColor="#f87171"
                floodOpacity="0.65"
                result="innerGlow"
              />
              <feDropShadow
                in="SourceGraphic"
                dx="0"
                dy="5"
                stdDeviation="14"
                floodColor="#7f1d1d"
                floodOpacity="0.55"
                result="deepGlow"
              />
              <feMerge>
                <feMergeNode in="deepGlow" />
                <feMergeNode in="innerGlow" />
                <feMergeNode in="rimLight" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="420" height="280" fill="url(#kiss-bg-grad)" rx="16" />
          <rect width="420" height="280" fill="url(#kiss-vignette)" rx="16" />

          {/* Bokeh */}
          <circle cx="60" cy="70" r="28" fill="#2dd4bf" opacity="0.06" />
          <circle cx="360" cy="90" r="36" fill="#a78bfa" opacity="0.07" />
          <circle cx="200" cy="40" r="20" fill="#f472b6" opacity="0.05" />

          {/* —— Boy (left, ¾ toward her) —— */}
          {/* Boy first in paint order; girl group below is drawn on top */}
          <motion.g
            style={{ transformOrigin: '155px 245px' }}
            animate={{ x: guyX, y: guyY, rotate: guyRotate }}
            transition={kissTransition}
          >
            {/* Hoodie body */}
            <path
              fill="url(#hoodie-grad)"
              d="M 85 175 Q 75 200 72 235 L 72 280 L 238 280 L 232 230 Q 220 185 195 165 L 160 158 Q 130 162 108 175 Q 95 188 85 175 Z"
            />
            <path
              fill={HOODIE_SHADOW}
              opacity="0.35"
              d="M 108 175 Q 130 195 155 188 L 165 280 L 72 280 L 72 235 Q 85 195 108 175 Z"
            />
            {/* Hood behind head */}
            <path
              fill={HOODIE_SHADOW}
              d="M 118 95 Q 100 78 128 62 Q 155 52 178 68 Q 188 82 185 100 Q 175 88 150 85 Q 125 88 118 95 Z"
            />

            {/* Neck */}
            <path fill={SKIN} d="M 142 148 L 142 175 L 175 175 L 172 148 Q 158 152 142 148 Z" />

            {/* Face */}
            <ellipse cx="155" cy="108" rx="40" ry="44" fill="url(#skin-boy-cheek)" />
            <ellipse cx="155" cy="112" rx="34" ry="36" fill={SKIN_LIGHT} opacity="0.22" />

            {/* Blush */}
            <motion.ellipse
              cx="128"
              cy="118"
              rx="14"
              ry="8"
              fill="#fda4af"
              animate={{ opacity: blushOp }}
              transition={faceTransition}
            />
            <motion.ellipse
              cx="175"
              cy="120"
              rx="10"
              ry="6"
              fill="#fda4af"
              animate={{ opacity: blushOp75 }}
              transition={faceTransition}
            />

            {/* Ear */}
            <ellipse cx="118" cy="108" rx="6" ry="9" fill={SKIN_DARK} />

            {/* Eye (visible) */}
            <motion.g animate={{ opacity: eyeOpenOp }} transition={faceTransition}>
              <ellipse cx="172" cy="100" rx="9" ry="7" fill="#fff" />
              <ellipse cx="174" cy="100" rx="4.5" ry="5" fill="#1e293b" />
              <ellipse cx="175" cy="98" rx="1.5" ry="1.5" fill="#fff" opacity="0.85" />
            </motion.g>
            <motion.path
              d="M 163 96 Q 172 92 181 96"
              stroke={SKIN_DARK}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: eyelidOp }}
              transition={faceTransition}
            />

            {/* Brow */}
            <path
              d="M 160 88 Q 172 84 184 88"
              stroke={HAIR_BOY}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Hair */}
            <path
              fill={HAIR_BOY}
              d="M 118 95 Q 115 60 138 42 Q 155 32 175 38 Q 200 48 198 82 Q 195 65 170 58 Q 145 55 128 70 Q 118 82 118 95 Z"
            />
            <path
              fill={HAIR_BOY}
              d="M 120 88 L 108 95 L 105 115 Q 115 100 125 92 Z"
              opacity="0.9"
            />
          </motion.g>

          {/* —— Girl (right, ¾ toward him) —— */}
          <motion.g
            filter="url(#kiss-soft)"
            style={{ transformOrigin: '265px 245px' }}
            animate={{ x: girlX, y: girlY, rotate: girlRotate }}
            transition={kissTransition}
          >
            {/* Soft top — original silhouette, no tie; neckline hint only */}
            <path
              fill={SHIRT}
              d="M 232 175 Q 228 210 225 280 L 395 280 L 388 220 Q 375 175 340 162 L 300 158 Q 265 162 245 172 Z"
            />
            <path
              stroke="#f9a8d4"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              d="M 252 168 Q 268 176 284 168"
              opacity="0.75"
            />

            <path fill={SKIN} d="M 268 148 L 268 175 L 298 175 L 295 148 Q 282 152 268 148 Z" />

            <ellipse cx="265" cy="108" rx="40" ry="44" fill="url(#skin-girl-cheek)" />
            {/* Opaque face so she paints solidly over the boy in the kiss overlap */}
            <ellipse cx="265" cy="112" rx="36" ry="38" fill={SKIN} />

            <motion.ellipse
              cx="292"
              cy="118"
              rx="14"
              ry="8"
              fill="#fda4af"
              animate={{ opacity: blushOp }}
              transition={faceTransition}
            />
            <motion.ellipse
              cx="238"
              cy="120"
              rx="9"
              ry="6"
              fill="#fda4af"
              animate={{ opacity: blushOp70 }}
              transition={faceTransition}
            />

            <ellipse cx="312" cy="108" rx="6" ry="9" fill={SKIN_DARK} />

            <motion.g animate={{ opacity: eyeOpenOp }} transition={faceTransition}>
              <ellipse cx="248" cy="100" rx="9" ry="7" fill="#fff" />
              <ellipse cx="246" cy="100" rx="4.5" ry="5" fill="#1e293b" />
              <ellipse cx="245" cy="98" rx="1.5" ry="1.5" fill="#fff" opacity="0.85" />
            </motion.g>
            <motion.path
              d="M 239 96 Q 248 92 257 96"
              stroke={SKIN_DARK}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ opacity: eyelidOp }}
              transition={faceTransition}
            />

            <path
              d="M 236 88 Q 248 84 260 88"
              stroke={HAIR_GIRL}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Red hair + ponytail + bow */}
            <path
              fill={HAIR_GIRL}
              d="M 228 95 Q 225 55 252 38 Q 275 28 302 42 Q 318 58 315 88 Q 308 62 280 55 Q 252 52 235 72 Q 228 82 228 95 Z"
            />
            <path fill={HAIR_GIRL_HI} d="M 248 48 Q 268 42 288 52 Q 298 62 295 75 Q 285 58 265 52 Q 248 50 248 48 Z" opacity="0.55" />
            <path
              fill={HAIR_GIRL}
              d="M 302 52 Q 340 48 368 62 Q 385 78 382 105 Q 378 88 355 78 Q 328 68 308 72 Z"
            />
            <path
              fill={HAIR_GIRL}
              d="M 308 65 Q 335 58 358 72 Q 372 88 370 115 L 362 118 Q 360 92 340 80 Q 318 72 302 78 Z"
            />
            {/* Pink streak */}
            <path
              fill="#fb7185"
              opacity="0.65"
              d="M 318 58 Q 340 54 352 68 Q 348 62 330 58 Q 318 56 318 58 Z"
            />
            {/* Bow */}
            <ellipse cx="372" cy="58" rx="14" ry="10" fill={BOW} />
            <ellipse cx="388" cy="58" rx="10" ry="8" fill={BOW} />
            <ellipse cx="378" cy="58" rx="4" ry="5" fill="#be185d" />
          </motion.g>

          {/* Kiss sparkles (under the cover heart) */}
          <motion.g
            animate={{
              opacity: [0, 0, 0.2, 0.55, 0.7, 0.55, 0.25, 0, 0],
              scale: [0.8, 0.8, 0.95, 1, 1.05, 1, 0.95, 0.85, 0.8],
            }}
            transition={{
              duration: DURATION,
              repeat: Infinity,
              repeatDelay: REPEAT_DELAY,
              times: [0, 0.35, 0.48, 0.55, 0.62, 0.68, 0.76, 0.88, 1],
              ease: EASE,
            }}
          >
            <circle cx="212" cy="108" r="2.5" fill="#fef3c7" opacity="0.9" />
            <circle cx="220" cy="100" r="1.8" fill="#fce7f3" opacity="0.85" />
            <circle cx="204" cy="104" r="1.8" fill="#e0e7ff" opacity="0.8" />
          </motion.g>

          {/* Covers lip meet: heart + rose on top */}
          <motion.g
            filter="url(#cover-heart-glow)"
            style={{ transformOrigin: '210px 108px' }}
            animate={{ opacity: coverOp, scale: coverScale }}
            transition={kissTransition}
          >
            <path
              fill="url(#cover-heart-grad)"
              d="M 210 166
                 C 186 142, 168 122, 168 100
                 C 168 80, 183 70, 198 78
                 C 205 82, 210 92, 210 92
                 C 210 92, 215 82, 222 78
                 C 237 70, 252 80, 252 100
                 C 252 122, 234 142, 210 166 Z"
            />
            <path
              fill="url(#cover-heart-rim)"
              d="M 210 166
                 C 186 142, 168 122, 168 100
                 C 168 80, 183 70, 198 78
                 C 205 82, 210 92, 210 92
                 C 210 92, 215 82, 222 78
                 C 237 70, 252 80, 252 100
                 C 252 122, 234 142, 210 166 Z"
              style={{ mixBlendMode: 'soft-light' }}
            />
            <text x="210" y="104" textAnchor="middle" dominantBaseline="middle" fontSize="36">
              🌹
            </text>
          </motion.g>
        </svg>
      </div>
    </motion.div>
  )
}
