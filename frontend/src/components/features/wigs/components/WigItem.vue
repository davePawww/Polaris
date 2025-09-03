<script setup lang="ts">
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WigActionButton from '@/components/WigActionButton.vue'
import type { Wig } from '../types/wigs.type'
import WigDialogBtn from './WigDialogBtn.vue'
import { useAuth } from '@clerk/vue'
import { useWigsStore } from '@/stores/wigs.store'

const props = defineProps<{
  wig: Wig
}>()

const { getToken, isSignedIn } = useAuth()
const wigsStore = useWigsStore()

const update = async () => {
  let token: string | undefined = undefined
  try {
    if (isSignedIn.value) {
      token = (await getToken.value()) ?? undefined
    }
  } catch (e) {
    console.error('Failed to get Clerk token', e)
  }

  await wigsStore.updateWig(props.wig.id, { ...props.wig, completed: !props.wig.completed }, token)
}

const deleteWig = async () => {
  let token: string | undefined = undefined
  try {
    if (isSignedIn.value) {
      token = (await getToken.value()) ?? undefined
    }
  } catch (e) {
    console.error('Failed to get Clerk token', e)
  }

  await wigsStore.deleteWig(props.wig.id, token)
}
</script>

<template>
  <Card class="polaris-border polaris-shadow-sm py-4">
    <CardHeader class="px-4">
      <div class="flex items-center justify-between">
        <CardTitle :class="props.wig.completed ? 'text-gray-500 line-through' : 'text-black'">{{
          props.wig.title
        }}</CardTitle>
        <div class="flex items-center gap-2">
          <WigActionButton @click="update">
            <CheckIcon class="size-4 text-green-600" />
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
