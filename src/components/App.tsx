import { useState, useEffect } from 'react'
import { loadHabits, saveHabits } from '../utils/storage'
import { getTodayStr } from '../utils/streaks'
import Dashboard from './Dashboard'
import AddHabitForm from './AddHabitForm'
import HabitList from './HabitList'
import type { Habit } from '../types'

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  useEffect(() => {
    setHabits(loadHabits())
  }, [])

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  function onAddHabit(name: string) {
    setHabits(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        createdAt: getTodayStr(),
        completions: [],
      },
    ])
  }

  function onToggleToday(id: string) {
    const today = getTodayStr()
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h
        const has = h.completions.includes(today)
        return {
          ...h,
          completions: has
            ? h.completions.filter(d => d !== today)
            : [...h.completions, today],
        }
      })
    )
  }

  function onDeleteHabit(id: string) {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-slate-100">Habit Tracker</h1>
        <p className="text-slate-400 mb-8">Build streaks, one day at a time.</p>

        <Dashboard habits={habits} />
        <AddHabitForm onAdd={onAddHabit} />
        <HabitList habits={habits} onToggle={onToggleToday} onDelete={onDeleteHabit} />
      </div>
    </div>
  )
}
