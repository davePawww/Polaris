<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="bg-background relative flex min-h-svh flex-col">
    <div class="polaris-border-grid flex flex-1 flex-col">
      <Header />
      <main class="flex flex-1 flex-col">
        <div
          class="polaris-container polaris-border-grid h-[calc(100vh-6rem)] w-full border-r border-l"
        >
          <slot />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
