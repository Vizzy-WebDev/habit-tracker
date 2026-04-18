import { useState } from 'react'

interface Props {
  onAdd: (name: string) => void
}

export default function AddHabitForm({ onAdd }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new habit..."
        className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors disabled:opacity-40"
        disabled={!value.trim()}
      >
        Add
      </button>
    </form>
  )
}
