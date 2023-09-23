import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'
import { ITodo } from './Todo.api'
import {
  mutationOptionsDeleteTodo,
  mutationOptionsPostTodo,
  mutationOptionsPutTodo,
  queryOptionsGetTodos,
} from './Todo.queries'
import { Todo, todoSchema } from './Todo.schemas'

const formSchema = z.object({
  todos: z.array(todoSchema),
  entry: z.string().optional(),
})

export type TodoForm = z.infer<typeof formSchema>

function isTodoChanged(previousTodo: ITodo, newTodo: Todo) {
  return (
    previousTodo.id === newTodo.id &&
    (previousTodo.completed !== newTodo.completed || previousTodo.title !== newTodo.title)
  )
}

function findChanges(previousTodos: ITodo[], newTodos: Todo[]) {
  return {
    newTodos: newTodos.filter((todo) => !todo.id),
    updatedTodos: newTodos.filter((v) =>
      previousTodos.some((previousTodo) => isTodoChanged(previousTodo, v))
    ),
    removedTodos: previousTodos.filter((v) => newTodos.every(({ id }) => v.id !== id)),
  }
}

type Actions = {
  updateTodo: (todo: ITodo) => Promise<any>
  deleteTodo: (todoId: ITodo['id']) => Promise<any>
  createTodo: (todo: Todo) => Promise<any>
}

async function applyChanges(
  changes: ReturnType<typeof findChanges>,
  actions: Actions,
  queryClient: QueryClient
) {
  await Promise.all([
    ...changes.newTodos.map((todo) => actions.createTodo(todo)),
    ...changes.removedTodos.map((todo) => actions.deleteTodo(todo.id)),
    ...changes.updatedTodos.map((todo) => actions.updateTodo(todo as ITodo)),
  ])
  queryClient.invalidateQueries({ queryKey: ['Todos'] })
}

export function useFormTodo(queryClient: QueryClient) {
  return useForm<TodoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: () =>
      queryClient.fetchQuery(queryOptionsGetTodos()).then((todos) => ({
        todos,
      })),
  })
}

const TOAST_ID = 'useDelayedSavedChanges'
export function useDelayedSavedChanges(
  watch: UseFormReturn<TodoForm>['watch'],
  reset: () => void,
  todos?: ITodo[]
) {
  const queryClient = useQueryClient()

  const { toast, dismiss } = useToast()
  const { mutateAsync: updateTodo } = useMutation(mutationOptionsPutTodo())
  const { mutateAsync: deleteTodo } = useMutation(mutationOptionsDeleteTodo())
  const { mutateAsync: createTodo } = useMutation(mutationOptionsPostTodo())
  const isMutating = useIsMutating({ mutationKey: ['Todos'] }) > 0

  const submitChanges = useDebouncedCallback(applyChanges, 5000)

  useEffect(() => {
    const subscription = watch(({ todos: newTodos }, { name }) => {
      if (name !== 'todos' || isMutating) {
        return
      }
      if (!todos || !newTodos) {
        return
      }
      const changes = findChanges(todos, z.array(todoSchema).parse(newTodos))
      if (changes.newTodos.length || changes.removedTodos.length || changes.updatedTodos.length) {
        toast({
          id: TOAST_ID,
          title: 'Synchronizing your latest changes...',
          description: new Date().toDateString(),
          action: (
            <ToastAction altText="Undo" onClick={reset}>
              Undo
            </ToastAction>
          ),
        })
      }
      submitChanges(
        changes,
        {
          createTodo,
          updateTodo,
          deleteTodo,
        },
        queryClient
      )
    })

    return subscription.unsubscribe
  }, [watch, todos, isMutating])

  useEffect(() => {
    if (isMutating) {
      dismiss(TOAST_ID)
    }
  }, [isMutating])
}
