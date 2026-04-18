import { calculateStreak, getTodayStr } from '../utils/streaks.js'

export default function HabitCard({ habit, onToggle, onDelete }) {
  const today = getTodayStr()
  const completedToday = habit.completions.includes(today)
  const streak = calculateStreak(habit.completions)

  return (
    <li className="flex items-center gap-3 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3">
      <button
        onClick={() => onToggle(habit.id)}
        aria-label={completedToday ? 'Mark incomplete' : 'Mark complete'}
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
          completedToday
            ? 'bg-emerald-600 border-emerald-600'
            : 'border-slate-500 hover:border-violet-400'
        }`}
      >
        {completedToday && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-base truncate ${completedToday ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
        {habit.name}
      </span>

      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold flex-shrink-0">
        🔥 {streak}
      </span>

      <button
        onClick={() => onDelete(habit.id)}
        aria-label="Delete habit"
        className="flex-shrink-0 text-slate-600 hover:text-red-400 transition-colors ml-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  )
}
