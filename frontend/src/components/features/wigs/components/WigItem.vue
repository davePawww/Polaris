<script setup lang="ts">
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WigActionButton from '@/components/WigActionButton.vue'
import type { Wig } from '../types/wigs.type'
import WigDialogBtn from './WigDialogBtn.vue'

const props = defineProps<{
  wig: Wig
}>()
</script>

<template>
  <Card class="polaris-border polaris-shadow-sm py-4">
    <CardHeader class="px-4">
      <div class="flex items-center justify-between">
        <CardTitle>{{ props.wig.title }}</CardTitle>
        <div class="flex items-center gap-2">
          <WigActionButton>
            <CheckIcon class="size-4 text-green-600" />
          </WigActionButton>
          <WigDialogBtn type="update" :wig="wig" />
          <WigActionButton>
            <TrashIcon class="size-4 text-red-600" />
          </WigActionButton>
        </div>
      </div>
      <CardDescription>{{ props.wig.description }}</CardDescription>
    </CardHeader>
  </Card>
</template>
