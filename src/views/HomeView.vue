<script setup lang="ts">
import MiButton from '@/components/global/MiButton.vue'
import { reactive } from 'vue'
import AddNoteModal from '@/views/component/AddNoteModal.vue'
import { Note } from '@/entities/note'

const modal = reactive({
  isShow: false
})

const notes = reactive<Array<Note>>([])

const toggleModal = (state?: boolean) => {
  if (typeof state == 'boolean') {
    modal.isShow = state
    return
  }
  modal.isShow = !modal.isShow
}

const saveData = (value: Note) => {
  const { note, title } = value
  notes.push({
    title,
    note
  })
  toggleModal(false)
}
</script>

<template>
  <add-note-modal v-if="modal.isShow" @add-data="saveData" />
  <div class="">
    <div class="border-b mb-4 p-4 shadow-lg">
      <span class="text-3xl font-bold">My Notes</span>
    </div>
    <div class="flex space-x-8 mx-4 mb-4">
      <span class="text-2xl font-semibold">List note</span>
      <mi-button text="Add Notes" @click="toggleModal(true)" />
    </div>
    <div>
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
