<script setup lang="ts">
import Wigs from '@/components/features/wigs/Wigs.vue'
import Pomodoro from '@/components/features/pomodoro/Pomodoro.vue'
import Notes from '@/components/features/notes/Notes.vue'
import Calendar from '@/components/features/calendar/Calendar.vue'
import LoFi from '@/components/features/lofi/Lofi.vue'
</script>

<template>
  <div class="grid h-full grid-cols-3 grid-rows-3 gap-4 p-4">
    <Wigs />
    <Pomodoro />
    <Calendar />
    <Notes />
    <LoFi />
  </div>
</template>
