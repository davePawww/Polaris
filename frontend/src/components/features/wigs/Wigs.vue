<script setup lang="ts">
import WigItem from './components/WigItem.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { watch } from 'vue'
import { useAuth } from '@clerk/vue'
import { storeToRefs } from 'pinia'
import WigDialogBtn from './components/WigDialogBtn.vue'
import SectionHeader from '@/components/SectionHeader.vue'

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
  <div class="polaris-border polaris-shadow-sm col-start-1 row-span-2 row-start-1 p-4">
    <div class="flex items-center justify-between gap-4">
      <SectionHeader title="Wigs" />
      <WigDialogBtn type="create" />
    </div>
    <div v-for="wig in wigs" :key="wig.id" class="mt-4 flex flex-col gap-4">
      <WigItem :wig="wig" />
    </div>
  </div>
</template>
