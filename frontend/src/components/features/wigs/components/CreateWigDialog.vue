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
          <Input id="title" default-value="Input a new goal" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="description" class="text-right">Description</Label>
          <Input id="description" default-value="Your goal description" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Goal</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
