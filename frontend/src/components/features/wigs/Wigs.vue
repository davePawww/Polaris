<script setup lang="ts">
import WigDialogBtn from './components/WigDialogBtn.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import WigsList from './components/WigsList.vue'
</script>

<template>
  <div class="polaris-border polaris-shadow-sm col-start-1 row-span-2 row-start-1 p-4">
    <div class="flex items-center justify-between gap-4">
      <SectionHeader title="Wigs" />
      <WigDialogBtn type="create" />
    </div>
    <WigsList />
  </div>
</template>
