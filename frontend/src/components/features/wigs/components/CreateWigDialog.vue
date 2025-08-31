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
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import { useAuth } from '@clerk/vue'
import { useWigsStore } from '@/stores/wigs.store'

const { getToken, isSignedIn } = useAuth()
const wigsStore = useWigsStore()

const newWig = ref({
  title: '',
  description: '',
})

const submit = async () => {
  // handle submission logic here
  let token: string | undefined = undefined
  try {
    if (isSignedIn.value) {
      token = (await getToken.value()) ?? undefined
    }
  } catch (e) {
    console.error('Failed to get Clerk token', e)
  }

  await wigsStore.createWig(newWig.value, token)
  newWig.value = { title: '', description: '' }
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button><PlusCircleIcon /> Add a Goal</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new Goal</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new goal. You can only create up to 4 goals to
          maximize focus.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right">Title</Label>
          <Input
            v-model="newWig.title"
            id="title"
            default-value="Input a new goal"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">Description</Label>
          <Input
            v-model="newWig.description"
            id="description"
            default-value="Your goal description"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="submit" type="submit">Create Goal</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
