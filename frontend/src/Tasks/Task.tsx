import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CheckBoxRdx } from '../elements/Checkbox';
import FormModifyTask from './FormModifyTask';
import { deleteTodo } from './Tasks.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface ITask {
  id: number;
  title: string;
  /*  done: boolean;
  onToggle: React.FunctionComponent;
  onDelete: React.FunctionComponent; */
}

export default function Task(task: ITask) {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(error));
    },
  });
  const [editMode, setEditMode] = useState(false);
  return (
    <div
      className={
        'flex items-center justify-between py-1 px-2 mt-1 rounded-lg bg-stone-100 transition-opacity delay-300' /* +
        (done ? 'opacity-30' : '') */
      }
    >
      <div className="flex flex-row items-center">
        <CheckBoxRdx id={`${task.id}`} /* checked={done} onClick={() => onToggle(!done)} */ />
        {!editMode && (
          <div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
            <span>{task.title}</span>
          </div>
        )}
        {editMode && <FormModifyTask task={task} />}
      </div>
      <button className="flex cursor-pointer" onClick={() => mutate(task.id)}>
        <TrashIcon className="h-5 w-5 my-2 mx-4 " />
      </button>
    </div>
  );
}
