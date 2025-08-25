<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import WigItem from './components/WigItem.vue'
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

    <div class="mt-6 flex flex-col gap-4">
      <WigItem />
      <WigItem />
      <WigItem />
      <WigItem />
    </div>
  </div>
</template>
