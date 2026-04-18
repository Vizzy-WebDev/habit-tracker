import HabitCard from './HabitCard.jsx'

export default function HabitList({ habits, onToggle, onDelete }) {
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
