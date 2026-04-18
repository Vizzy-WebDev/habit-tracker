export function getTodayStr(): string {
  return new Date().toLocaleDateString('en-CA') // returns YYYY-MM-DD in local time
}

function subtractOneDay(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() - 1)
  return d.toLocaleDateString('en-CA')
}

export function calculateStreak(completions: string[]): number {
  if (!completions || completions.length === 0) return 0

  const set = new Set(completions)
  const today = getTodayStr()
  const yesterday = subtractOneDay(today)

  let anchor: string
  if (set.has(today)) {
    anchor = today
  } else if (set.has(yesterday)) {
    anchor = yesterday
  } else {
    return 0
  }

  let streak = 0
  let current = anchor
  while (set.has(current)) {
    streak++
    current = subtractOneDay(current)
  }
  return streak
}
