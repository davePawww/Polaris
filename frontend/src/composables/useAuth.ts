import { useAuth } from '@clerk/vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  async function fetchToken() {
    return await getToken.value()
  }

  return {
    fetchToken,
    isSignedIn,
    isLoaded,
  }
})
