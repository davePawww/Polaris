export type MakeReadOnly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

export type QueryParams<T> = Partial<{
  skip: number
  take: number
  cursor: string
  where: Record<string, any>
  orderBy: Partial<Record<keyof T, 'asc' | 'desc'>>
}>

export type PaginationMetadata = {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export type PaginatedData<T> = {
  data: T[]
  meta: PaginationMetadata
}
