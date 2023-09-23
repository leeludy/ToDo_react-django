import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFieldArray } from 'react-hook-form'
import Todo from './Todo/Todo'
import { TodoForm, useDelayedSavedChanges, useFormTodo } from './Todo/Todo.form'
import { queryOptionsGetTodos } from './Todo/Todo.queries'

export function App() {
  const queryClient = useQueryClient()
  const { data: todos } = useQuery({ ...queryOptionsGetTodos() })
  const { control, register, watch, resetField, reset } = useFormTodo(queryClient)

  const { fields, append, remove, update } = useFieldArray<TodoForm, 'todos', 'key'>({
    name: 'todos',
    control,
    keyName: 'key',
  })

  const entry = watch('entry')
  useDelayedSavedChanges(watch, () => reset({ entry: '', todos }), todos)

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
            <Todo
              {...todo}
              onDelete={() => remove(index)}
              onUpdate={(todo) => update(index, todo)}
            />
          ))}
        </div>
      </section>
    </form>
  )
}
