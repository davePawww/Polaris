import type { Wig } from '@/components/features/wigs/types/wigs.type'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wigsApi } from '@/lib/api/wigs.api'

export const useWigsStore = defineStore('wigs', () => {
  const wigs = ref<Wig[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWigs = async (token?: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await wigsApi.findMany({ orderBy: { createdAt: 'desc' } }, { token })
      wigs.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch wigs'
    } finally {
      loading.value = false
    }
  }

  const createWig = async (data: { title: string; description: string }, token?: string) => {
    try {
      loading.value = true
      error.value = null
      const newWig = await wigsApi.create(data, { token })
      wigs.value.push(newWig)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create wig'
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
  }
})
