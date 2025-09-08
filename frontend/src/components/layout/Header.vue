<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import PolarisLight from '@/assets/Polaris-light.svg'
import { Cog8ToothIcon, ClockIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <header
    class="polaris-border-grid bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-12 w-full border-b backdrop-blur"
  >
    <div
      class="polaris-container polaris-border-grid flex h-full items-center justify-between border-r border-l"
    >
      <img :src="PolarisLight" alt="Polaris Light Logo" class="-ml-4 h-12" />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.UserProfilePage label="Preferences" url="preferences">
              <template #labelIcon>
                <Cog8ToothIcon />
              </template>
              <div>
                <h1>Help Page</h1>
                <p>This is the custom help page</p>
              </div>
            </UserButton.UserProfilePage>

            <UserButton.UserProfilePage label="Pomodoro Settings" url="pomodoroSettings">
              <template #labelIcon>
                <ClockIcon />
              </template>
              <div>
                <h1>Help Page</h1>
                <p>This is the custom help page</p>
              </div>
            </UserButton.UserProfilePage>
          </UserButton>
        </SignedIn>
      </div>
    </div>
  </header>
</template>
