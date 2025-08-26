<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  wig: {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
  }
}>()
</script>

<template>
  <Card class="polaris-border polaris-shadow-sm py-4">
    <CardHeader class="px-4">
      <div class="flex items-center justify-between">
        <CardTitle>{{ props.wig.title }}</CardTitle>
        <div class="flex items-center gap-2">
          <Button>
            <PencilIcon class="size-4" />
          </Button>
          <Button>
            <TrashIcon class="size-4" />
          </Button>
        </div>
      </div>
      <CardDescription>{{ props.wig.description }}</CardDescription>
    </CardHeader>
  </Card>
</template>
