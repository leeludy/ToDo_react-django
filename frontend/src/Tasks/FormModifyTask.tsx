import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { updateTodo } from './Tasks.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IFormInput {
  id: string | number;
  title: string;
  /* description: string; */
  /* completed: boolean; */
}

export default function FormModifyTask(props) {
  const queryClient = useQueryClient();

  const { error, mutate } = useMutation({
    mutationFn: updateTodo,
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      console.log(updatedTask);
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(error));
    },
  });

  const form = useForm({
    defaultValues: { id: props.task.id, title: props.task.title },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => mutate(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-raw justify-between bg-stone-100 p-4 rounded-lg"
      >
        <input
          {...form.register('title', {
            required: 'Please enter a task title.',
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
      </form>
    </FormProvider>
  );
}
