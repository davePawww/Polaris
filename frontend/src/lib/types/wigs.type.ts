// Utility type to make certain properties of a type read-only
// Could be transferred to a common types file if needed
export type MakeReadOnly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

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

// Could be transferred to a common types file if needed
export type QueryParams<T> = Partial<{
  skip: number
  take: number
  cursor: string
  where: Record<string, any>
  orderBy: Partial<Record<keyof T, 'asc' | 'desc'>>
}>

// Could be transferred to a common types file if needed
export type PaginationMetadata = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

// Could be a generic type if needed?
export type PaginatedWigs = {
  data: Wig[]
  meta: PaginationMetadata
}
