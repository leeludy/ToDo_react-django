import { useQuery } from '@tanstack/react-query';
import Task from './Task';

export default function ListTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos,
  });
  console.log('data query todos', tasks);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }
  return (
    <div className="flex flex-col justify-between bg-stone-100 p-4 rounded-lg">
      {tasks?.map((task, index) => (
        <Task
          key={task.id}
          {...task}
          /*   onRename={(newName) => renameTask(index, newName)}
      onTrash={() => removeTask(index)}
      onToggle={(done) => updateTaskDone(index, done)}  */
        />
      ))}
    </div>
  );
}
