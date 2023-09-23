import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { queryOptionsGetTodos } from './Todo/Todo.queries'
import { type Todo as EntityTodo, todoSchema } from './Todo/Todo.schemas'
import Todo from './Todo/Todo'
import { useEffect } from 'react'
import { ITodo } from './Todo/Todo.api'

const formSchema = z.object({
  todos: z.array(todoSchema),
  entry: z.string().optional(),
})

type TodoForm = z.infer<typeof formSchema>

function findChanges(previousTodos: ITodo[], newTodos: EntityTodo[]) {
  return {
    newTodos: newTodos.filter((todo) => !todo.id),
    updatedTodos: newTodos.filter((v) =>
      previousTodos.some(({ id, completed, title }) => id === v.id && (completed !== v.completed || title !== v.title))
    ),
    removedTodos: previousTodos.filter((v) => newTodos.every(({ id }) => v.id !== id)),
  }
}

export function App() {
  const queryClient = useQueryClient()
  const { data: todos } = useQuery({ ...queryOptionsGetTodos() })
  const { control, register, watch, resetField } = useForm<TodoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: () =>
      queryClient.fetchQuery(queryOptionsGetTodos()).then((todos) => ({
        todos,
      })),
  })

  const { fields, append, remove, update } = useFieldArray<TodoForm, 'todos', 'key'>({
    name: 'todos',
    control,
    keyName: 'key',
  })

  const entry = watch('entry')

  useEffect(() => {
    const subscription = watch(({ todos: newTodos }, { name }) => {
      if (name !== 'todos') {
        return
      }
      if (!todos || !newTodos) {
        return
      }

      findChanges(todos, z.array(todoSchema).parse(newTodos))
    })

    return subscription.unsubscribe
  }, [watch, todos])

  return (
    <form className="h-screen w-screen p-4 bg-stone-100">
      <h1>ToDo</h1>
      <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mb-8">
        <div className="flex flex-row justify-between bg-stone-100 p-4 rounded-lg">
          <input
            placeholder=" Qu'est ce qui est à faire ?"
            className="w-full text-xl rounded-lg p-2"
            {...register('entry')}
          />
          {entry && (
            <button
              className="m-2 ml-5 rounded text-gray-800 text-2xl"
              onClick={() => {
                append({ title: entry, completed: false })
                resetField('entry')
              }}
            >
              <PlusCircledIcon width={'1.5em'} height={'1.5em'} />
            </button>
          )}
        </div>
      </section>
      <section className="bg-white max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <div className="flex flex-col justify-between bg-stone-100 p-4 rounded-lg">
          {fields.map((todo, index) => (
            <Todo {...todo} onDelete={() => remove(index)} onUpdate={(todo) => update(index, todo)} />
          ))}
        </div>
      </section>
    </form>
  )
}
