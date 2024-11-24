'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateTodo() {
  const [newTask, setNewTask] = useState('')
  const supabase = createClientComponentClient()

  const handleCreateTask = async () => {
    if (!newTask.trim()) return

    const { error } = await supabase
      .from('todos')
      .insert([{ task: newTask, is_complete: false }])

    if (!error) {
      setNewTask('')
      // Refresh the page to show the new todo
      window.location.reload()
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">Create New Task</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleCreateTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  )
} 