<script setup lang="ts">
import { onBeforeMount, onMounted, reactive } from 'vue'
import MiModal from '@/components/global/MiModal.vue'
import MiButton from '@/components/global/MiButton.vue'
import MiInput from '@/components/global/MiInput.vue'
import { Note } from '@/entities/note'
import { useHomeControllerStore } from '@/views/home-controller'

const homeControllerStore = useHomeControllerStore()

const emit = defineEmits<{
  addData: [data: Partial<Note>]
  changeData: [data: Partial<Note>]
  closeModal: []
}>()

const props = defineProps<{
  uuid: string | null
}>()

let note = reactive<Partial<Note>>({
  title: '',
  note: ''
})

onBeforeMount(() => {
  note = homeControllerStore.getNoteById(props.uuid ?? '')
})

const saveNote = () => {
  if (props.uuid) {
    emit('changeData', { uuid: note.uuid, title: note.title, note: note.note })
    return
  }
  emit('addData', { title: note.title, note: note.note })
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
        {{ note }}
        <div class="flex flex-col">
          <label>Title</label>
          <mi-input v-model="note.title" autofocus />
        </div>
        <div class="flex flex-col">
          <label>Note</label>
          <mi-input v-model="note.note" />
        </div>
        <div class="flex space-x-4">
          <mi-button text="Cancel" @click="closeModal()" />
          <mi-button type="submit" text="Save" />
        </div>
      </form>
    </div>
  </mi-modal>
</template>
