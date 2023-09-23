import { z } from 'zod'

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  completed: z.boolean(),
})

export type Todo = z.infer<typeof todoSchema>
