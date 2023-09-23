import { UseQueryOptions } from '@tanstack/react-query'
import { getTodos } from './Todo.api'

export function queryOptionsGetTodos() {
  return {
    queryKey: ['Todos'],
    queryFn: getTodos,
  } as const satisfies UseQueryOptions
}
