import type {
  CreateWigDto,
  UpdateWigDto,
  Wig,
} from '../../components/features/wigs/types/wigs.type'
import type { PaginatedData, QueryParams } from '../types/shared.type'
import apiClient from './client'

const getHeaders = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export const wigsApi = {
  async findMany(
    params?: QueryParams<Wig>,
    options?: { token?: string },
  ): Promise<PaginatedData<Wig>> {
    const headers = getHeaders(options?.token)

    const response = await apiClient.get('/goals', { params, headers })
    return response.data
  },
  async create(data: CreateWigDto, options?: { token?: string }): Promise<Wig> {
    const headers = getHeaders(options?.token)

    const response = await apiClient.post('/goals', data, { headers })
    return response.data
  },
  async update(id: string, data: UpdateWigDto, options?: { token?: string }): Promise<Wig> {
    const headers = getHeaders(options?.token)

    const response = await apiClient.put(`/goals/${id}`, data, { headers })
    return response.data
  },
  async delete(id: string, options?: { token?: string }): Promise<void> {
    const headers = getHeaders(options?.token)

    await apiClient.delete(`/goals/${id}`, { headers })
  },
}
