import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { updateTodo } from './Tasks.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FormInput = {
  id: string | number;
  completed: boolean;
  title: string;
  /* description: string; */
};

export default function FormModifyTask({
  task,
  editMode,
  ...props
}: {
  task: FormInput;
  editMode: (value: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      editMode(false);
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(error));
    },
  });

  const form = useForm({
    defaultValues: {
      id: task.id,
      completed: task.completed,
      title: task.title,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => mutate(data);

  return (
    <FormProvider {...form}>
      <form className="flex flex-raw justify-between bg-stone-100 p-4 rounded-lg">
        <input
          {...form.register('title', {
            min: 1,
            max: 42,
            required: 'Please enter a task title',
            onBlur: form.handleSubmit(onSubmit),
          })}
          className="w-full text-xl rounded-lg p-2"
        />
        {/*  <textarea
        {...register('detail')}
        placeholder="Description"
        className="w-full mb-2 text-xl rounded-lg p-[3px]"
      /> */}

        <Pencil1Icon className="h-7 w-7 m-2 ml-5 rounded text-gray-800 text-2xl" />
      </form>
    </FormProvider>
  );
}
