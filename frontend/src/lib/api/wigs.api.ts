import type { CreateWigDto, Wig } from '../../components/features/wigs/types/wigs.type'
import type { PaginatedData, QueryParams } from '../types/shared.type'
import apiClient from './client'

export const wigsApi = {
  async findMany(
    params?: QueryParams<Wig>,
    options?: { token?: string },
  ): Promise<PaginatedData<Wig>> {
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
