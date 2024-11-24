import AuthButton from '@/components/AuthButton'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import CreateTodo from '@/components/CreateTodo'
import TodoItem from '@/components/TodoItem'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  const supabase = createServerClient(cookieStore)
  const { data: todos } = await supabase.from('todos').select('*')

  return (
    <div className="flex-1 flex flex-col gap-20 max-w-3xl mx-auto px-4 py-8">
      <CreateTodo />
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">My Todo List</h2>
        <div className="flex flex-col gap-3">
          {todos?.filter(todo => !todo.is_complete).map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {todos?.filter(todo => todo.is_complete).map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}
