<script setup lang="ts">
import { ref } from 'vue'
import { UserButton } from '@clerk/vue'
import { Cog8ToothIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <UserButton.UserProfilePage label="Preferences" url="preferences">
    <template #labelIcon>
      <Cog8ToothIcon />
    </template>
    <div>
      <h1>Preferences</h1>
      <div class="mt-4 flex items-center gap-2">
        <Label for="theme-switcher" class="text-xs">Enable Dark mode</Label>
        <!-- <Switch :model-value="isDark" @update:model-value="toggleTheme"> -->
        <Switch id="theme-switcher" :model-value="isDark" @update:model-value="toggleTheme">
          <template #thumb>
            <div class="flex size-4 items-center justify-center">
              <MoonIcon class="size-3" v-if="isDark" />
              <SunIcon class="size-3" v-else />
            </div>
          </template>
        </Switch>
      </div>
    </div>
  </UserButton.UserProfilePage>
</template>
