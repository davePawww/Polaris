<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <h2 class="text-2xl font-bold">{{ props.title }}</h2>
</template>
