<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Layout from './components/layout/Layout.vue'
</script>

<template>
  <Layout>
    <div class="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Button class="polaris-shadow-sm m-4">Click me</Button>
      <Button class="polaris-shadow-md m-4">Click me</Button>
      <Button class="polaris-shadow-lg m-4">Click me</Button>
    </div>
  </Layout>
</template>

<style scoped></style>
