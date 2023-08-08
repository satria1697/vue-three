import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { Note } from '@/entities/note'
import { v4 } from 'uuid'
import LocalStorageService from '@/service/local-storage-service'

const localStorageService = new LocalStorageService()

export const useHomeControllerStore = defineStore('homeControllerBindStore', () => {
  const notes = reactive<Array<Note>>(
    localStorageService.getNotes().length ? localStorageService.getNotes() : []
  )
  const getNotes = computed(() => notes)
  const getNoteById = (uuid: string) => getNotes.value.find((value) => (value.uuid = uuid))
  const setNotes = (note: Partial<Note>) => {
    notes.push({
      uuid: v4(),
      title: note.title ?? '',
      note: note.note ?? ''
    })
    localStorageService.setNotes(notes)
  }

  const updateNote = (note: Partial<Note>) => {
    const index = notes.findIndex((value1) => value1.uuid == note.uuid ?? '')
    if (index != -1) {
      const not: Note = notes[index]
      not.note = note.note ?? ''
      not.title = note.title ?? ''
      notes[index] = not
    }
  }

  return {
    getNotes,
    setNotes,
    updateNote,
    getNoteById
  }
})
