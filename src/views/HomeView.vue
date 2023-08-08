<script setup lang="ts">
import MiButton from '@/components/global/MiButton.vue'
import { reactive, ref } from 'vue'
import AddNoteModal from '@/views/component/AddNoteModal.vue'
import { Note } from '@/entities/note'
import { useHomeControllerStore } from '@/views/home-controller'

const homeControllerStore = useHomeControllerStore()

const modal = reactive({
  isShow: false,
  uuid: ''
})

const toggleModal = (state?: boolean, uuid?: string) => {
  if (uuid) {
    modal.uuid = uuid ?? ''
  }
  if (typeof state == 'boolean') {
    modal.isShow = state
    return
  }
  modal.isShow = !modal.isShow
}

const saveData = (value: Partial<Note>) => {
  homeControllerStore.setNotes(value)
  toggleModal(false)
}

const changeData = (value: Partial<Note>) => {
  homeControllerStore.updateNote(value)
  modal.uuid = ''
  toggleModal(false)
}
</script>

<template>
  <add-note-modal
    v-if="modal.isShow"
    :uuid="modal.uuid"
    @add-data="saveData"
    @change-data="changeData"
    @close-modal="toggleModal(false)"
  />
  <div class="">
    <div class="border-b mb-4 p-4 shadow-lg">
      <span class="text-3xl font-bold">My Notes</span>
    </div>
    <div class="flex space-x-8 mx-4 mb-4">
      <span class="text-2xl font-semibold">List note</span>
      <mi-button text="Add Notes" @click="toggleModal(true)" />
    </div>

    {{ homeControllerStore.getNotes }}
    <div>
      <div class="mx-4 flex flex-wrap">
        <div v-if="!homeControllerStore.getNotes.length">
          <span>Empty Notes</span>
        </div>
        <div
          v-for="note in homeControllerStore.getNotes"
          v-else
          :key="note.uuid"
          class="border rounded-md p-4 flex flex-col h-36 min-w-[24rem] m-2 hover:cursor-pointer hover:shadow-md transition"
          @click="toggleModal(true, note.uuid)"
        >
          <span>{{ note.uuid }}</span>
          <span class="font-semibold text-3xl">{{ note.title }}</span>
          <span class="overflow-ellipsis whitespace-normal overflow-hidden">{{ note.note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
