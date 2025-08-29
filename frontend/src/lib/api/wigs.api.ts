import type { CreateWigDto, PaginatedWigs, QueryParams, Wig } from '../types/wigs.type'
import apiClient from './client'

export const wigsApi = {
  async findMany(params?: QueryParams<Wig>, options?: { token?: string }): Promise<PaginatedWigs> {
    const headers = options?.token ? { Authorization: `Bearer ${options.token}` } : undefined

    const response = await apiClient.get('/goals', { params, headers })
    return response.data
  },
  async create(data: CreateWigDto, options?: { token?: string }): Promise<Wig> {
    const headers = options?.token ? { Authorization: `Bearer ${options.token}` } : undefined

    const response = await apiClient.post('/goals', data, { headers })
    return response.data
  },
}
