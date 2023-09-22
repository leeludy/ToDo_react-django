import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { CheckBoxRdx } from '../elements/Checkbox';
import { deleteTodo, updateTodo } from './Tasks.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export interface ITask {
  id: string | number;
  title: string;
  completed: boolean;
  /* onToggle: React.FunctionComponent;
  onDelete: React.FunctionComponent; */
}

interface IFormInput {
  id: string | number;
  completed: boolean;
  title: string;
  /* description: string; */
}

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
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => mutationUpdate.mutate(data);

  const [editMode, setEditMode] = useState(false);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={
            'flex items-center justify-between py-1 px-2 mt-1 rounded-lg bg-stone-100 transition-opacity delay-300' /* +
        (done ? 'opacity-30' : '') */
          }
        >
          <div className="flex flex-row items-center">
            <CheckBoxRdx id={`${task.id}`} />
            {!editMode && (
              <div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
                <span>{task.title}</span>
              </div>
            )}
            {editMode && (
              <>
                <input {...form.register('completed')} type="hidden" />
                <input
                  {...form.register('title', {
                    required: 'Please enter a task title',
                  })}
                  className="w-full text-xl rounded-lg p-2"
                />
                {/*  <textarea
                  {...register('detail')}
                  placeholder="Description"
                  className="w-full mb-2 text-xl rounded-lg p-[3px]"
                /> */}
                <button type="submit" className="m-2 ml-5 rounded text-gray-800 text-2xl">
                  <Pencil1Icon width={'1em'} height={'1em'} />
                </button>
              </>
            )}
          </div>
          <button className="flex cursor-pointer" onClick={() => mutationDelete.mutate(task.id)}>
            <TrashIcon className="h-5 w-5 my-2 mx-4 " />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
