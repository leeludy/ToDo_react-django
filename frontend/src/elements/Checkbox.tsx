'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

const CheckBoxRdx = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>((props, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={'flex justify-center items-center w-6 h-6 rounded mx-4 my-2 bg-white border-4 border-lime-500'}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <CheckIcon className="h-5 w-5  text-lime-500" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

CheckBoxRdx.displayName = CheckboxPrimitive.Root.displayName;

export { CheckBoxRdx };
