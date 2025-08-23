<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
import Container from './Container.vue'
</script>

<template>
  <div class="bg-background min-h-svh">
    <Header />
    <Container>
      <main class="flex min-h-svh flex-col items-center justify-center">
        <slot />
      </main>
    </Container>
    <Footer />
  </div>
</template>
