import axios from 'axios'

const ApiUrl = `${import.meta.env.VITE_API_URL}todo/`

export interface ITodo {
  id: number
  title: string
  /* description?: string; */
  completed: boolean
}

async function getTodos(): Promise<ITodo[]> {
  return axios.get<ITodo[]>(ApiUrl).then((res) => res.data)
}

async function getTodo(id: number | string) {
  return axios.get<ITodo>(`${ApiUrl}${id}`).then((res) => res.data)
}

async function postTodo({ title, completed }: { title: string; completed: boolean }) {
  return axios.post<ITodo>(ApiUrl, { title, completed }).then((res) => res.data)
}

async function updateTodo({ id, title, completed }: ITodo) {
  return axios.put<ITodo>(`${ApiUrl}${id}/`, { title, completed })
}

async function deleteTodo(id: string | number) {
  return axios.delete<ITodo>(`${ApiUrl}${id}/`)
}

export { getTodos, getTodo, postTodo, updateTodo, deleteTodo }
