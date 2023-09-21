import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Pencil1Icon } from '@radix-ui/react-icons';

interface IFormInput {
  title: string;
  /* detail: string; */
  /* done: boolean; */
}

export default function FormModifyTask(props) {
  const form = useForm({
    defaultValues: { title: props.task.title },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
