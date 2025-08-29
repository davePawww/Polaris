<script setup lang="ts">
import WigItem from './components/WigItem.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { watch, ref, nextTick } from 'vue'
import { useAuth } from '@clerk/vue'
import { storeToRefs } from 'pinia'
import CreateWigDialog from './components/CreateWigDialog.vue'

const { isLoaded, isSignedIn, getToken } = useAuth()
const wigsStore = useWigsStore()
// update the v-for to use fallback loading and handle error states
const { wigs, loading, error } = storeToRefs(wigsStore)

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
  <div class="p-4">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-2xl font-bold">Wigs</h2>
      <CreateWigDialog />
    </div>
    <div v-for="wig in wigs" class="mt-4 flex flex-col gap-4">
      <WigItem :key="wig.id" :wig="wig" />
    </div>
  </div>
</template>
