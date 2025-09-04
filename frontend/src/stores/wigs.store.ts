import type { CreateWigDto, UpdateWigDto, Wig } from '@/components/features/wigs/types/wigs.type'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wigsApi } from '@/lib/api/wigs.api'
import { AxiosError } from 'axios'

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
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  const fetchWigs = async (token?: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await wigsApi.findMany({ orderBy: { createdAt: 'desc' } }, { token })
      wigs.value = response.data
      sortWigs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch wigs'
    } finally {
      loading.value = false
    }
  }

  const createWig = async (data: CreateWigDto, token?: string) => {
    try {
      loading.value = true
      error.value = null
      if (wigs.value.length === 4) {
        error.value = 'You can only create up to 4 wigs'
        throw new Error('You can only create up to 4 wigs')
      }
      const newWig = await wigsApi.create(data, { token })
      wigs.value.push(newWig)
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

  const updateWig = async (id: string, data: UpdateWigDto, token?: string) => {
    try {
      loading.value = true
      error.value = null
      const updatedWig = await wigsApi.update(id, data, { token })
      const index = wigs.value.findIndex((wig) => wig.id === id)
      if (index !== -1) {
        wigs.value[index] = updatedWig
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

  const deleteWig = async (id: string, token?: string) => {
    try {
      loading.value = true
      error.value = null
      await wigsApi.delete(id, { token })
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
