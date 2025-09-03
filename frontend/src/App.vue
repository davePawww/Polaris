<script setup lang="ts">
import Layout from './components/layout/Layout.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <Layout>
    <Toaster />
    <RouterView />
  </Layout>
</template>
