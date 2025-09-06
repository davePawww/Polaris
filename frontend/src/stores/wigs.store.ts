import type { CreateWigDto, UpdateWigDto, Wig } from '@/components/features/wigs/types/wigs.type'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AxiosError } from 'axios'
import apiClient from '@/lib/api'
import type { PaginatedData } from '@/lib/shared.type'

export const useWigsStore = defineStore('wigs', () => {
  const wigs = ref<Wig[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const sortWigs = () => {
    wigs.value = wigs.value.slice().sort((a, b) => {
      const completedDiff = Number(a.completed) - Number(b.completed)
      if (completedDiff !== 0) return completedDiff
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }

  const fetchWigs = async () => {
    try {
      loading.value = true
      error.value = null
      const { data } = await apiClient.get<PaginatedData<Wig>>('/goals')
      wigs.value = data.payload
      sortWigs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch wigs'
    } finally {
      loading.value = false
    }
  }

  const createWig = async (payload: CreateWigDto) => {
    try {
      loading.value = true
      error.value = null
      if (wigs.value.length === 4) {
        error.value = 'You can only create up to 4 wigs'
        throw new Error('You can only create up to 4 wigs')
      }
      const { data } = await apiClient.post<Wig>('/goals', payload)
      wigs.value.push(data)
      sortWigs()

      return true
    } catch (err) {
      error.value =
        err instanceof AxiosError && err.response?.data.message === 'Validation failed'
          ? 'Required fields missing'
          : 'Failed to create wig'
    } finally {
      loading.value = false
    }
  }

  const updateWig = async (id: string, payload: UpdateWigDto) => {
    try {
      loading.value = true
      error.value = null
      const { data } = await apiClient.patch(`/goals/${id}`, payload)
      const index = wigs.value.findIndex((wig) => wig.id === id)
      if (index !== -1) {
        wigs.value[index] = data
      }
      sortWigs()
      return true
    } catch (err) {
      error.value =
        err instanceof AxiosError && err.response?.data.message === 'Validation failed'
          ? 'Required fields missing'
          : 'Failed to update wig'
    } finally {
      loading.value = false
    }
  }

  const deleteWig = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await apiClient.delete(`/goals/${id}`)
      wigs.value = wigs.value.filter((wig) => wig.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete wig'
    } finally {
      loading.value = false
    }
  }

  return {
    wigs,
    loading,
    error,
    fetchWigs,
    createWig,
    updateWig,
    deleteWig,
    clearError,
  }
})
