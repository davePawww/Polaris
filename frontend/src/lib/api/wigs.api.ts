import type { CreateUpdateWigsDto, PaginatedWigs, Wigs } from '../types/wigs.type'
import apiClient from './client'

export const wigsApi = {
  async findMany(
    params?: {
      skip?: string
      take?: string
      cursor?: string
      where?: string
      orderBy?: string
    },
    options?: { token?: string },
  ): Promise<PaginatedWigs> {
    const headers = options?.token ? { Authorization: `Bearer ${options.token}` } : undefined

    const response = await apiClient.get('/goals', { params, headers })
    return response.data
  },

  async create(data: CreateUpdateWigsDto, options?: { token?: string }): Promise<Wigs> {
    const headers = options?.token ? { Authorization: `Bearer ${options.token}` } : undefined
    const response = await apiClient.post('/goals', data, { headers })
    return response.data
  },
}
