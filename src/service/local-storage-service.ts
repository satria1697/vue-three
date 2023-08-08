import { Note } from '@/entities/note'

class LocalStorageService {
  getNotes(): Array<any> {
    const item = localStorage.getItem('note') ?? '[]'
    return JSON.parse(item)
  }

  setNotes(notes: Array<Note>): void {
    localStorage.setItem('note', JSON.stringify(notes))
  }
}

export default LocalStorageService
