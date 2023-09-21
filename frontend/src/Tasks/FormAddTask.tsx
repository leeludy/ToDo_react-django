import { SubmitHandler, useForm } from 'react-hook-form';
import { PlusCircledIcon } from '@radix-ui/react-icons';

interface IFormInput {
  title: string;
  /* detail: string; */
}

export default function FormAddTask() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
      <button type="submit" className="m-2 ml-5 rounded text-gray-800 text-2xl">
        <PlusCircledIcon width={'1.5em'} height={'1.5em'} />
      </button>
    </form>
  );
}
