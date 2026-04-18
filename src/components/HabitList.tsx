import HabitCard from './HabitCard'
import type { Habit } from '../types'

interface Props {
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function HabitList({ habits, onToggle, onDelete }: Props) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-slate-500 py-12">
        No habits yet. Add one above to get started!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
