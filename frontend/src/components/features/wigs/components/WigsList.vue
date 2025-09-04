<script lang="ts" setup>
import { useWigsStore } from '@/stores/wigs.store'
import { watch } from 'vue'
import { useAuth } from '@clerk/vue'
import { storeToRefs } from 'pinia'
import WigItem from './WigItem.vue'

const { isLoaded, isSignedIn, getToken } = useAuth()
const wigsStore = useWigsStore()
// update the v-for to use fallback loading and handle error states
const { wigs } = storeToRefs(wigsStore)

watch(
  () => isLoaded.value,
  async (v) => {
    if (v) {
      let token: string | undefined = undefined
      try {
        if (isSignedIn.value) {
          token = (await getToken.value()) ?? undefined
        }
      } catch (e) {
        console.error('Failed to get Clerk token', e)
      }

      await wigsStore.fetchWigs(token)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-for="wig in wigs" :key="wig.id" class="mt-4 flex flex-col gap-4">
    <WigItem :wig="wig" />
  </div>
</template>
