<script setup lang="ts">
import { UserButton } from '@clerk/vue'
import { Cog8ToothIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <UserButton.UserProfilePage label="Preferences" url="preferences">
    <template #labelIcon>
      <Cog8ToothIcon />
    </template>
    <div>
      <h1>Help Page</h1>
      <p>This is the custom help page</p>
    </div>
  </UserButton.UserProfilePage>
</template>
