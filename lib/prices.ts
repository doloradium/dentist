import fs from 'fs'
import path from 'path'

export type PriceEntry = {
  title: string
  category: string
  price: number
  priceFrom: boolean
  description?: string
  visible: boolean
}

export const categoryLabels: Record<string, string> = {
  therapy: 'Терапия',
  surgery: 'Хирургия',
  orthopedics: 'Ортопедия',
  orthodontics: 'Ортодонтия',
  hygiene: 'Гигиена',
}

export function getPrices(): PriceEntry[] {
  const dir = path.join(process.cwd(), 'content/prices')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as PriceEntry)
    .filter((p) => p.visible)
}
