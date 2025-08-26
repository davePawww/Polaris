<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import WigItem from './components/WigItem.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { watch } from 'vue'
import { useAuth } from '@clerk/vue'
import { storeToRefs } from 'pinia'

const { isLoaded, isSignedIn, getToken } = useAuth()
const wigsStore = useWigsStore()
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
      <div class="flex items-center gap-2">
        <Button
          class="polaris-shadow-sm bg-black hover:scale-105 hover:cursor-pointer hover:bg-black/85 focus:scale-105"
        >
          <PlusCircleIcon class="overflow-hidde size-6 text-white" />
          <p>Add a wig</p>
        </Button>
      </div>
    </div>

    <div v-for="wig in wigs" class="mt-6 flex flex-col gap-4">
      <WigItem :key="wig.id" :wig="wig" />
      <!-- <WigItem />
      <WigItem />
      <WigItem />
      <WigItem /> -->
    </div>
  </div>
</template>
