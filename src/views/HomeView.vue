<script setup lang="ts">
import MiButton from '@/components/global/MiButton.vue'
import MiModal from '@/components/global/MiModal.vue'
import { reactive } from 'vue'
import MiInput from '@/components/global/MiInput.vue'

interface Note {
  title: string
  note: string
}

const notes = reactive<Array<Note>>([])

const modal = reactive({
  title: '',
  note: '',
  isShow: false
})

const toggleModal = (state?: boolean) => {
  if (typeof state == 'boolean') {
    modal.isShow = state
    return
  }
  modal.isShow = !modal.isShow
}

const saveNote = () => {
  notes.push({
    note: modal.note,
    title: modal.title
  })
  modal.note = ''
  modal.title = ''
  toggleModal(false)
}
</script>

<template>
  <mi-modal v-if="modal.isShow">
    <div class="m-4">
      <span>Add Notes</span>
      <form class="flex flex-col space-y-4" @submit.prevent="saveNote()">
        <div class="flex flex-col">
          <label>Title</label>
          <mi-input v-model="modal.title" autofocus />
        </div>
        <div class="flex flex-col">
          <label>Note</label>
          <mi-input v-model="modal.note" />
        </div>
        <div class="flex space-x-4">
          <mi-button text="Cancel" @click="toggleModal(false)" />
          <mi-button type="submit" text="Save" />
        </div>
      </form>
    </div>
  </mi-modal>
  <div class="m-4">
    <div class="flex space-x-4">
      <span class="text-3xl font-bold">My Notes</span>
      <mi-button text="Add Notes" @click="toggleModal(true)" />
    </div>
    <div>
      <span class="text-2xl font-semibold">List note</span>
      <div class="w-1/3 mx-4">
        <div v-if="!notes.length">
          <span>Empty Notes</span>
        </div>
        <div
          v-for="note in notes"
          v-else
          :key="note.title"
          class="border rounded-md p-4 flex flex-col h-36"
        >
          <span class="font-semibold text-3xl">{{ note.title }}</span>
          <span class="overflow-ellipsis whitespace-normal overflow-hidden">{{ note.note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
