export interface Wigs {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateUpdateWigsDto {
  title: string
  description: string
  completed?: boolean
}

export interface PaginationMetadata {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface PaginatedWigs {
  data: Wigs[]
  meta: PaginationMetadata
}
