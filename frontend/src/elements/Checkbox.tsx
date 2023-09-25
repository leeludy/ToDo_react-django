import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { Todo } from '../Tasks/Tasks.services'

function CheckBoxRdx(props: Todo) {
  return (
    <Checkbox.Root
      id={`${props.id}`}
      className="flex justify-center items-center w-6 h-6 rounded mx-4 my-2 bg-white border-4  border-gray-800 "
    >
      <Checkbox.Indicator>
        <CheckIcon className="h-5 w-5  text-gray-800" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export { CheckBoxRdx }
