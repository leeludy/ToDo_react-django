import Task from './Task';

// test before building queries
const tasks = [
  {
    id: 1,
    title: 'Muffins',
    description: 'bake baby !',
    completed: true,
  },
  {
    id: 2,
    title: 'Dev',
    description: 'Codecodecodecode',
    completed: false,
  },
  {
    id: 3,
    title: 'Sail',
    description: 'sea is waiting !',
    completed: false,
  },
];

export default function ListTasks() {
  return (
    <div className="flex flex-col justify-between bg-stone-100 p-4 rounded-lg">
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          {...task}
          /*   onRename={(newName) => renameTask(index, newName)}
      onTrash={() => removeTask(index)}
      onToggle={(done) => updateTaskDone(index, done)} */
        />
      ))}
    </div>
  );
}
