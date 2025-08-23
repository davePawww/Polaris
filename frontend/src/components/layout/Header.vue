<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import Container from './Container.vue'
</script>

<template>
  <header class="sticky top-0 z-50 bg-black text-white">
    <Container>
      <div class="flex items-center justify-between">
        <p>This is the header</p>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </Container>
  </header>
</template>
