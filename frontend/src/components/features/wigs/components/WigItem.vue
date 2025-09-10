<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WigActionButton from '@/components/WigActionButton.vue'
import type { Wig } from '../types/wigs.type'
import WigDialogBtn from './WigDialogBtn.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { toast } from 'vue-sonner'

const props = defineProps<{
  wig: Wig
}>()
const wigsStore = useWigsStore()

const update = async () => {
  try {
    await wigsStore.updateWig(props.wig.id, { ...props.wig, completed: !props.wig.completed })
    toast.success(`Wig marked as ${props.wig.completed ? 'incomplete' : 'complete'}`)
  } catch (error) {
    toast.error(`Failed to update wig`)
    console.error(error)
  }
}

const deleteWig = async () => {
  try {
    await wigsStore.deleteWig(props.wig.id)
    toast.success('Wig deleted successfully')
  } catch (error) {
    toast.error('Failed to delete wig')
    console.error(error)
  }
}
</script>

<template>
  <Card class="polaris-border polaris-shadow-sm py-4">
    <CardHeader class="px-4">
      <div class="flex items-center justify-between">
        <CardTitle :class="props.wig.completed ? 'text-gray-500 line-through' : 'text-black'">{{
          props.wig.title
        }}</CardTitle>
        <div class="flex items-center gap-1">
          <WigActionButton @click="update">
            <CheckCircleIcon class="size-5 text-green-600" />
          </WigActionButton>
          <WigDialogBtn type="update" :wig="wig" />
          <WigActionButton @click="deleteWig">
            <TrashIcon class="size-4 text-red-600" />
          </WigActionButton>
        </div>
      </div>
      <CardDescription :class="props.wig.completed ? 'text-gray-500 line-through' : 'text-black'">{{
        props.wig.description
      }}</CardDescription>
    </CardHeader>
  </Card>
</template>
