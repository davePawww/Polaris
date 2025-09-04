<script setup lang="ts">
import Layout from './components/layout/Layout.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <Layout>
    <Toaster />
    <RouterView />
  </Layout>
</template>
