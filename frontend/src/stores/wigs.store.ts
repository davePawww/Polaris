import type { Wigs } from '@/lib/types/wigs.type'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { wigsApi } from '@/lib/api/wigs.api'

export const useWigsStore = defineStore('wigs', () => {
  const wigs = ref<Wigs[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

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
  }
})
