import type { MakeReadOnly } from '@/lib/shared.type'
export type Wig = MakeReadOnly<
  {
    id: string
    title: string
    description: string
    completed: boolean
    createdAt: string
    updatedAt: string
  },
  'id' | 'createdAt' | 'updatedAt'
>

export type CreateWigDto = {
  title: string
  description: string
  completed?: boolean
}

export type UpdateWigDto = Partial<CreateWigDto>
