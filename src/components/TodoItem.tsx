'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function TodoItem({ todo }: { todo: any }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const toggleComplete = async () => {
    await supabase
      .from('todos')
      .update({ is_complete: !todo.is_complete })
      .eq('id', todo.id)
    
    router.refresh()
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={toggleComplete}
        className="w-4 h-4"
      />
      <span>{todo.task}</span>
    </div>
  )
}