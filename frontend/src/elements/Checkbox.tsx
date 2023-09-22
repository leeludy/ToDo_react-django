import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

function CheckBoxRdx(props) {
  const [checked, setChecked] = useState(props.completed);

  return (
    <Checkbox.Root
      id={props.id}
      checked={checked}
      onCheckedChange={setChecked}
      className="flex justify-center items-center w-6 h-6 rounded mx-4 my-2 bg-white border-4 border-lime-500 "
    >
      <Checkbox.Indicator>
        <CheckIcon className="h-5 w-5  text-lime-500" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export { CheckBoxRdx };
