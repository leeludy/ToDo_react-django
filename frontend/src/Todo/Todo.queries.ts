import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { deleteTodo, getTodos, postTodo, updateTodo } from './Todo.api'

export function queryOptionsGetTodos() {
  return {
    queryKey: ['Todos'],
    queryFn: getTodos,
  } as const satisfies UseQueryOptions
}

export function mutationOptionsPostTodo() {
  return {
    mutationFn: postTodo,
    mutationKey: ['Todos'],
  } as const satisfies UseMutationOptions<any, any, any>
}

export function mutationOptionsPutTodo() {
  return {
    mutationFn: updateTodo,
    mutationKey: ['Todos'],
  } as const satisfies UseMutationOptions<any, any, any>
}

export function mutationOptionsDeleteTodo() {
  return {
    mutationFn: deleteTodo,
    mutationKey: ['Todos'],
  } as const satisfies UseMutationOptions<any, any, any>
}
