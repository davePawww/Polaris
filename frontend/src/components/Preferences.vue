<script setup lang="ts">
import { UserButton } from '@clerk/vue'
import { Cog8ToothIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/composables/useTheme'

const { colorMode, isDark } = useTheme()
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    colorMode.value = 'dark'
  } else {
    colorMode.value = 'light'
  }
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
