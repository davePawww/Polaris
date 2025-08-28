<script setup lang="ts">
import WigItem from './components/WigItem.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { watch, ref, nextTick } from 'vue'
import { useAuth } from '@clerk/vue'
import { storeToRefs } from 'pinia'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import { useForm } from '@/composables/useForm'

type WigForm = {
  title: string
  description: string
}

const { form, errors, isDirty, reset, validate, setField } = useForm<WigForm>({
  title: 'A goal that you must do today',
  description: 'something about the goal',
})

const isDialogOpen = ref(false)
const creating = ref(false)
const createError = ref<string | null>(null)
const titleInput = ref<HTMLInputElement | null>(null)

const { isLoaded, isSignedIn, getToken } = useAuth()
const wigsStore = useWigsStore()
// update the v-for to use fallback loading and handle error states
const { wigs, loading, error } = storeToRefs(wigsStore)

watch(
  () => isLoaded.value,
  async (v) => {
    if (v) {
      let token: string | undefined = undefined
      try {
        if (isSignedIn.value) {
          token = (await getToken.value()) ?? undefined
        }
      } catch (e) {
        console.error('Failed to get Clerk token', e)
      }

      await wigsStore.fetchWigs(token)
    }
  },
  { immediate: true },
)

watch(isDialogOpen, async (open) => {
  if (open) {
    await nextTick()
    titleInput.value?.focus()
  } else {
    reset()
    createError.value = null
  }
})

async function onSubmit() {
  createError.value = null
  const valid = await validate((values) => {
    const errs: Partial<Record<keyof WigForm, string>> = {}
    if (!values.title?.trim()) errs.title = 'Title is required'
    return Object.keys(errs).length ? errs : null
  })
  if (!valid) return

  if ((wigs.value.length ?? 0) >= 4) {
    createError.value = 'You have reached the maximum number of wigs (4).'
    return
  }

  creating.value = true
  try {
    let token: string | undefined
    try {
      if (isSignedIn.value) token = (await getToken.value()) ?? undefined
    } catch (e) {
      console.warn('Failed to get token', e)
    }

    await wigsStore.createWigs({ title: form.title.trim(), description: form.description.trim() }, token)
    isDialogOpen.value = false
  } catch (e) {
    createError.value = (e as Error).message || 'Failed to create wig'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-2xl font-bold">Wigs</h2>
      <div class="flex items-center gap-2">
        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button>
              <PlusCircleIcon class="mr-2 size-4" />Add new wig
            </Button>
          </DialogTrigger>

          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a Wig</DialogTitle>
              <DialogDescription>The maximum wigs you can create is 4.</DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmit" class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="title" class="text-right">Title</Label>
                <Input id="title" ref="titleInput" v-model="form.title" class="col-span-3" />
              </div>

              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="description" class="text-right">Description</Label>
                <Input id="description" v-model="form.description" class="col-span-3" />
              </div>

              <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
              <p v-if="createError" class="text-red-500 text-sm">{{ createError }}</p>

              <DialogFooter>
                <Button type="submit" :disabled="creating">{{ creating ? 'Creating...' : 'Save' }}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <div v-for="wig in wigs" class="mt-6 flex flex-col gap-4">
      <WigItem :key="wig.id" :wig="wig" />
    </div>
  </div>
</template>
