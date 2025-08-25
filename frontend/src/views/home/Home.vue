<script setup lang="ts">
import Wigs from '@/components/features/wigs/Wigs.vue'
import Pomodoro from '@/components/features/pomodoro/Pomodoro.vue'
import Notes from '@/components/features/notes/Notes.vue'
import Calendar from '@/components/features/calendar/Calendar.vue'
import LoFi from '@/components/features/lofi/Lofi.vue'
</script>

<template>
  <div class="grid h-full grid-cols-3 grid-rows-3 gap-4 p-4">
    <div class="polaris-border polaris-shadow-sm col-start-1 row-span-2 row-start-1">
      <Wigs />
    </div>
    <div class="polaris-border polaris-shadow-sm col-start-1 row-start-3">
      <Pomodoro />
    </div>
    <div class="polaris-border polaris-shadow-sm col-start-3 row-start-1">
      <Calendar />
    </div>
    <div class="polaris-border polaris-shadow-sm col-start-2 row-span-3 row-start-1">
      <Notes />
    </div>
    <div class="polaris-border polaris-shadow-sm col-start-3 row-start-2">
      <LoFi />
    </div>
  </div>
</template>
