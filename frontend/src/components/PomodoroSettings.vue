<script setup lang="ts">
import { UserButton } from '@clerk/vue'
import { ClockIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <UserButton.UserProfilePage label="Pomodoro Settings" url="pomodoroSettings">
    <template #labelIcon>
      <ClockIcon />
    </template>
    <div>
      <h1>Help Page</h1>
      <p>This is the custom help page</p>
    </div>
  </UserButton.UserProfilePage>
</template>
