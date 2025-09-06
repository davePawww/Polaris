<script lang="ts" setup>
import { useWigsStore } from '@/stores/wigs.store'
import { storeToRefs } from 'pinia'
import WigItem from './WigItem.vue'
import { onMounted } from 'vue'

const wigsStore = useWigsStore()
const { wigs } = storeToRefs(wigsStore)

onMounted(async () => {
  await wigsStore.fetchWigs()
})
</script>

<template>
  <div v-for="wig in wigs" :key="wig.id" class="mt-4 flex flex-col gap-4">
    <WigItem :wig="wig" />
  </div>
</template>
