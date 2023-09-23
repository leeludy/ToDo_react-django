import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import type { Todo } from './Todo.schemas'

export interface TodoProps extends Todo {
  onDelete: () => void
  onUpdate: (todo: Todo) => void
}

export default function Todo({ id, title, completed, onDelete, onUpdate }: TodoProps) {
  const [editMode, setEditMode] = useState(false)

  return (
    <div
      className={
        'flex items-center justify-between py-1 px-2 mt-1 rounded-lg bg-stone-100 transition-opacity delay-300' /* +
        (done ? 'opacity-30' : '') */
      }
    >
      <div className="flex flex-row items-center">
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) => onUpdate({ title, id, completed: checked === true })}
        />
        {!editMode && (
          <div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
            <span>{title}</span>
          </div>
        )}
        {editMode && (
          <Input
            defaultValue={title}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onUpdate({ completed, title: event.currentTarget.value, id })
                setEditMode(false)
              }
            }}
            onBlur={(event) => {
              onUpdate({ completed, title: event.target.value, id })
              setEditMode(false)
            }}
          />
        )}
      </div>
      <button type="button" className="flex cursor-pointer" onClick={onDelete}>
        <TrashIcon className="h-5 w-5 my-2 mx-4 " />
      </button>
    </div>
  )
}
