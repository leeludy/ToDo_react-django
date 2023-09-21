import axios from 'axios';

const ApiUrl = `${import.meta.env.VITE_API_URL}todo/`;

export interface ITodo {
  id: number;
  title: string;
  /* description?: string; */
  completed: boolean;
}

async function getTodos() {
  return axios.get<ITodo[]>(ApiUrl).then((res) => res.data);
}

async function getTodo(id: number | string) {
  return axios.get<ITodo>(`${ApiUrl}${id}`).then((res) => res.data);
}

async function postTodo({ title, completed }: { title: string; completed: boolean }) {
  return axios.post<ITodo>(ApiUrl, { title, completed }).then((res) => res.data);
}

async function updateTodo({
  id,
  title,
}: /* description, */
{
  id: string | number;
  title: string;
  /* description?: string; */
}) {
  return axios.put<ITodo>(`${ApiUrl}${id}/`, { title }).then((res) => console.log(res));
}

async function deleteTodo(id: string | number) {
  return axios.delete<ITodo>(`${ApiUrl}${id}/`).then(() => console.log('task deleted'));
}

export { getTodos, getTodo, postTodo, updateTodo, deleteTodo };
