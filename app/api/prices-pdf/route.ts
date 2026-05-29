import { NextResponse } from 'next/server'
import { getPrices, categoryLabels, type PriceEntry } from '@/lib/prices'

export async function GET() {
  const prices = getPrices()
  const grouped = prices.reduce<Record<string, PriceEntry[]>>((acc, item) => {
    const cat = item.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  const rows = Object.entries(grouped)
    .map(
      ([cat, items]) => `
      <tr><td colspan="3" style="background:#f0fdf4;padding:10px 12px;font-weight:600;font-size:15px;">
        ${categoryLabels[cat] ?? cat}
      </td></tr>
      ${items
        .map(
          (item) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.title}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;font-size:13px;">${item.description || ''}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;white-space:nowrap;">
            ${item.priceFrom ? 'от ' : ''}${item.price?.toLocaleString('ru-RU')} ₽
          </td>
        </tr>`
        )
        .join('')}`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Прайс-лист — DentClinic</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 40px; color: #1e293b; }
    h1 { font-size: 24px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>Прайс-лист — DentClinic</h1>
  <table>${rows}</table>
  <script>window.print()</script>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
