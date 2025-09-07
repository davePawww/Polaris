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
      <img :src="PolarisLight" alt="Polaris Light Logo" class="h-12" />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  </header>
</template>
