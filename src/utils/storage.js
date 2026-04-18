const KEY = 'habit-tracker-habits'

export function loadHabits() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHabits(habits) {
  localStorage.setItem(KEY, JSON.stringify(habits))
}
