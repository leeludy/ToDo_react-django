import { SubmitHandler, useForm } from 'react-hook-form';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTodo } from './Tasks.services';

interface IFormInput {
  title: string;
  /* description?: string; */
  completed: boolean;
}

export default function FormAddTask() {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<IFormInput>();

  const { error, mutate } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError() {
      console.log('Mutation error: ', JSON.stringify(error));
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => [mutate(data), console.log(data)];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row justify-between bg-stone-100 p-4 rounded-lg"
    >
      <input
        {...register('title', {
          required: 'Please enter a task title.',
        })}
        placeholder=" Qu'est ce qui est à faire ?"
        className="w-full text-xl rounded-lg p-2"
      />
      {/*  <textarea
        {...register('detail')}
        placeholder="Description"
        className="w-full mb-2 text-xl rounded-lg p-[3px]"
      /> */}
      <input {...register('completed', { value: false })} type="hidden" />
      <button type="submit" className="m-2 ml-5 rounded text-gray-800 text-2xl">
        <PlusCircledIcon width={'1.5em'} height={'1.5em'} />
      </button>
    </form>
  );
}
