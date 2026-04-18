import { calculateStreak, getTodayStr } from '../utils/streaks'
import type { Habit } from '../types'

interface Props {
  habits: Habit[]
}

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  highlight?: boolean
}

export default function Dashboard({ habits }: Props) {
  const today = getTodayStr()
  const totalHabits = habits.length
  const completedToday = habits.filter(h => h.completions.includes(today)).length

  const streakLeader = habits.reduce<{ name: string; streak: number } | null>((best, h) => {
    const s = calculateStreak(h.completions)
    return s > (best?.streak ?? -1) ? { name: h.name, streak: s } : best
  }, null)

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <StatCard label="Total Habits" value={totalHabits} />
      <StatCard
        label="Done Today"
        value={`${completedToday} / ${totalHabits}`}
        highlight={totalHabits > 0 && completedToday === totalHabits}
      />
      <StatCard
        label="Top Streak"
        value={streakLeader ? `🔥 ${streakLeader.streak}` : '—'}
        sub={streakLeader?.name}
      />
    </div>
  )
}

function StatCard({ label, value, sub, highlight }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-4 text-center ${highlight ? 'bg-emerald-900/30 border-emerald-700' : 'bg-slate-800 border-slate-700'}`}>
      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1 truncate">{sub}</p>}
    </div>
  )
}
