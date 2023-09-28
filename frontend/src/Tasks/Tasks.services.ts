import axios from 'axios'

const ApiUrl = `${import.meta.env.VITE_API_URL}todo/`

export type Todo = {
  id: number
  title: string

  completed: boolean
}

async function getTodos() {
  return axios.get<Todo[]>(ApiUrl).then((res) => res.data)
}

async function getTodo(id: number | string) {
  return axios.get<Todo>(`${ApiUrl}${id}`).then((res) => res.data)
}

async function postTodo({ title, completed }: { title: string; completed: boolean }) {
  return axios.post<Todo>(ApiUrl, { title, completed }).then((res) => res.data)
}

async function updateTodo({ id, completed, title }: { id: string | number; completed: boolean; title: string }) {
  return axios.put<Todo>(`${ApiUrl}${id}/`, { completed, title }).then((res) => res.data)
}

async function deleteTodo(id: string | number) {
  return axios.delete<Todo>(`${ApiUrl}${id}/`).then(() => console.log('task deleted'))
}

export { getTodos, getTodo, postTodo, updateTodo, deleteTodo }
