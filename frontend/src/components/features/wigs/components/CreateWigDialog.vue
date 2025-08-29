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
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        <PlusCircleIcon /> Add a Goal
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        Save changes
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
