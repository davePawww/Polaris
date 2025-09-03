<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref, watch } from 'vue'
import { useAuth } from '@clerk/vue'
import { useWigsStore } from '@/stores/wigs.store'
import type { Wig, CreateWigDto, UpdateWigDto } from '../types/wigs.type'
import WigActionButton from '@/components/WigActionButton.vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  type: string
  wig?: Wig
}>()

const open = ref(false)
const { getToken, isSignedIn } = useAuth()
const wigsStore = useWigsStore()

const form = ref<CreateWigDto | UpdateWigDto>({
  title: '',
  description: '',
  completed: false,
})

const submit = async () => {
  if (form.value.title?.trim() === '') {
    wigsStore.error = 'Title is required'
    return
  }

  let token: string | undefined = undefined
  try {
    if (isSignedIn.value) {
      token = (await getToken.value()) ?? undefined
    }
  } catch (e) {
    console.error('Failed to get Clerk token', e)
  }

  // we also need to add success messages
  let result: boolean | undefined = undefined
  if (props.type === 'create') {
    result = await wigsStore.createWig(form.value as CreateWigDto, token)
    if (result) {
      form.value = { title: '', description: '', completed: false }
      open.value = false
      toast.success('Goal created successfully!')
    }
  } else if (props.type === 'update') {
    const id = props.wig?.id
    if (!id) {
      wigsStore.error = 'Something went wrong. Please try again.'
      return
    }
    result = await wigsStore.updateWig(id, form.value as UpdateWigDto, token)
    if (result) {
      open.value = false
      toast.success('Goal updated successfully!')
    }
  } else {
    wigsStore.error = 'Invalid Wig action type. Please try again.'
  }
}

watch(open, (isOpen) => {
  if (!isOpen) wigsStore.clearError()

  if (isOpen && props.type === 'update' && props.wig) {
    form.value = {
      title: props.wig.title,
      description: props.wig.description,
      completed: props.wig.completed,
    }
  } else if (isOpen && props.type === 'create') {
    form.value = { title: '', description: '', completed: false }
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button v-if="props.type === 'create'"><PlusCircleIcon /> Add a Goal</Button>
      <WigActionButton v-else><PencilSquareIcon class="size-4" /></WigActionButton>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new Goal</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new goal. You can only create up to 4 goals to
          maximize focus.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 pt-2">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right">Title</Label>
          <Input
            v-model="form.title"
            id="title"
            @focus="wigsStore.error = ''"
            placeholder="Input a new goal"
            :class="[
              'col-span-3',
              wigsStore.error === 'Title is required' ? 'border-red-500' : 'border-gray-300',
            ]"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">Description</Label>
          <Input
            v-model="form.description"
            id="description"
            placeholder="add a description"
            class="col-span-3"
          />
        </div>
      </div>
      <p v-if="wigsStore.error" class="w-full text-right text-sm text-red-500">
        {{ wigsStore.error }}
      </p>
      <DialogFooter>
        <Button @click="submit" type="submit">
          <p v-if="props.type === 'create'">Create Goal</p>
          <p v-else>Update Goal</p>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
