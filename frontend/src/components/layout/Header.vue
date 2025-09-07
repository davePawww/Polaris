<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import PolarisLight from '@/assets/Polaris-light.svg'
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
                </svg>
              </template>
              <div>
                <h1>Help Page</h1>
                <p>This is the custom help page</p>
              </div>
            </UserButton.UserProfilePage>

            <UserButton.UserProfilePage label="Pomodoro Settings" url="pomodoroSettings">
              <template #labelIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
                </svg>
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
