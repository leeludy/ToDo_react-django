import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CheckBoxRdx } from '../elements/Checkbox';
import { deleteTodo, updateTodo } from './Tasks.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import FormModifyTask from './FormModifyTask';

export interface ITask {
  id: string | number;
  title: string;
  completed: boolean;
}

// type FormInput = {
//   id: string | number;
//   title: string;
//   completed: boolean;
//   /* description: string; */
// };

export default function CardTask(task: ITask) {
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation({
    mutationFn: updateTodo,
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      console.log(updatedTask);
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(mutationUpdate.error));
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(mutationDelete.error));
    },
  });

  const form = useForm({
    defaultValues: { id: task.id, completed: task.completed, title: task.title },
    mode: 'onChange',
  });

  // const onSubmit: SubmitHandler<FormInput> = (data) => mutationUpdate.mutate(data);

  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className={
        'flex items-center justify-between py-1 px-2 mt-1 rounded-lg bg-stone-100 transition-opacity delay-300' /* +
            (done ? 'opacity-30' : '') */
      }
    >
      <div className="flex flex-row items-center">
        <FormProvider {...form}>
          <form>
            <Controller
              control={form.control}
              name="completed"
              render={({ field }) => (
                <CheckBoxRdx
                  id={`${task.id}`}
                  checked={field.value}
                  onCheckedChange={(v) => {
                    field.onChange(v);
                    console.log(field.name, 'value', v);
                  }}
                />
              )}
            />
          </form>
        </FormProvider>
        {!editMode && (
          <div className="text-lg  text-gray-800" onClick={() => setEditMode((v) => !v)}>
            <span>{task.title}</span>
          </div>
        )}
        {editMode && <FormModifyTask task={task} editMode={(state: boolean) => setEditMode(state)} />}
      </div>
      <button className="flex cursor-pointer" onClick={() => mutationDelete.mutate(task.id)}>
        <TrashIcon className="h-5 w-5 my-2 mx-2 " />
      </button>
    </div>
  );
}
