import { useQuery } from '@tanstack/react-query'
import CardTask from './CardTask'
import { getTodos } from './Tasks.services'

export default function ListTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>
  }
  return (
    <div className="flex flex-col justify-between bg-white p-4">
      {tasks?.map((task) => (
        <CardTask key={task.id} {...task} />
      ))}
    </div>
  )
}
