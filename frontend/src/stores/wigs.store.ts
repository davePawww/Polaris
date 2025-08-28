import type { Wigs } from '@/lib/types/wigs.type'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wigsApi } from '@/lib/api/wigs.api'

export const useWigsStore = defineStore('wigs', () => {
  const wigs = ref<Wigs[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createWigs = async (data: { title: string; description: string }, token?: string) => {
    try {
      loading.value = true
      error.value = null
      const payload = {
        title: data.title,
        description: data.description,
      }
      const response = await wigsApi.create(payload, { token })
      wigs.value.push(response)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create wigs'
    } finally {
      loading.value = false
    }
  }

  const fetchWigs = async (token?: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await wigsApi.findMany(undefined, { token })
      wigs.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch wigs'
    } finally {
      loading.value = false
    }
  }

  return {
    wigs,
    loading,
    error,
    fetchWigs,
    createWigs,
  }
})
