/**
 * One-off: convert public/photos/*.HEIC to .jpg (browser-safe).
 * Run: node scripts/convert-heic.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import convert from 'heic-convert'

const __dirname = dirname(fileURLToPath(import.meta.url))
const photosDir = join(__dirname, '..', 'public', 'photos')

const files = await readdir(photosDir)
const heics = files.filter((f) => /\.heic$/i.test(f))

for (const name of heics) {
  const inPath = join(photosDir, name)
  const outName = name.replace(/\.heic$/i, '.jpg')
  const outPath = join(photosDir, outName)
  const buffer = await readFile(inPath)
  const jpegBuffer = await convert({
    buffer,
    format: 'JPEG',
    quality: 0.92,
  })
  await writeFile(outPath, Buffer.from(jpegBuffer))
  console.log('OK', name, '->', outName)
}

console.log('Done:', heics.length, 'file(s)')
