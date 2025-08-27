<script setup lang="ts">
import WigItem from './components/WigItem.vue'
import { useWigsStore } from '@/stores/wigs.store'
import { ref, watch } from 'vue'
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

interface CreateWigForm {
  title: string
  description: string
}

const form = ref<CreateWigForm>({
  title: '',
  description: '',
})

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
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-2xl font-bold">Wigs</h2>
      <div class="flex items-center gap-2">
        <Dialog>
          <DialogTrigger as-child>
            <Button>
              <PlusCircleIcon class="mr-2 size-4" />
              <p>Add new wig</p>
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a Wig</DialogTitle>
              <DialogDescription>
                You can create a wig here. The maximum wigs you can create is 4. This will make it
                easier to manage and focus on the most important ones.
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="title" class="text-right"> Title </Label>
                <Input id="title" default-value="A goal that you must do today" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="description" class="text-right"> Description </Label>
                <Input id="description" default-value="something about the goal" class="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button @click="console.log('test')"> Save changes </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <div v-for="wig in wigs" class="mt-6 flex flex-col gap-4">
      <WigItem :key="wig.id" :wig="wig" />
    </div>
  </div>
</template>
