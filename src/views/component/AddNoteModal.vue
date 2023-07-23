<script setup lang="ts">
import MiButton from '@/components/global/MiButton.vue'
import MiModal from '@/components/global/MiModal.vue'
import MiInput from '@/components/global/MiInput.vue'
import { reactive } from 'vue'
import { Note } from '@/entities/note'

const modal = reactive({
  title: '',
  note: '',
  isShow: false
})

const emit = defineEmits<{
  addData: [data: Note]
  closeModal: []
}>()

const saveNote = () => {
  emit('addData', { title: modal.title, note: modal.note })
}

const closeModal = () => {
  emit('closeModal')
}
</script>

<template>
  <mi-modal>
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
          <mi-button text="Cancel" @click="closeModal()" />
          <mi-button type="submit" text="Save" />
        </div>
      </form>
    </div>
  </mi-modal>
</template>
