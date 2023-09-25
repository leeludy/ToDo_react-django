import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { FormProvider, useForm } from 'react-hook-form'
import { CheckBoxRdx } from '../elements/Checkbox'
import { Todo } from './Tasks.services'

export default function CardTask(task: Todo) {
  const form = useForm({
    defaultValues: { id: task.id, completed: task.completed, title: task.title },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <div className={'flex items-center justify-between py-1 px-2 mt-1 rounded-lg border-gray-800'}>
          <div className="flex flex-row items-center">
            <CheckBoxRdx {...task} />
            <input {...form.register('title')} className="w-full text-xl rounded-lg p-2" />
            <button type="submit" className="m-2 ml-5 rounded text-gray-800 text-2xl">
              <Pencil1Icon width={'1em'} height={'1em'} />
            </button>
          </div>
          <button type="button" className="flex cursor-pointer">
            <TrashIcon className="h-5 w-5 my-2 mx-4 " />
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
