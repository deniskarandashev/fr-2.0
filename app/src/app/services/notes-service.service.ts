import { Injectable, signal } from '@angular/core';
import { ChapterNotes } from '../models/notes.model';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // notes = signal({});

  // saveNotes(): void {
  //   localStorage.setItem('FR_2_NOTES', JSON.stringify(this.notes));
  // }

  // getNotes(): void {
  //   const notesData = JSON.parse(localStorage.getItem('FR_2_NOTES') || '{}');
  // }
  
  // saveChapterNotes(course: string, chapter: number, notes: ChapterNotes): void {
  //   console.log('save ===========', notes)
  //   localStorage.setItem(course + '_notes_' + chapter, JSON.stringify(this.notes));
  // }

  // getChapterNotes(course: string, chapter: number): ChapterNotes {
  //   const notesData = JSON.parse(localStorage.getItem(course + '_notes_' + chapter) || '{}');
  //   console.log('get ===========', notesData)
  //   return notesData;
  // }

  // exportNotes(): void {
  //   const notes = localStorage.getItem('notes');
  //   const blob = new Blob([notes || '{}'], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'notes.json';
  //   a.click();
  //   URL.revokeObjectURL(url);
  // }

  // importNotes(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const notes = reader.result as string;
  //     localStorage.setItem('notes', notes);
  //   };
  //   reader.readAsText(file);
  // }
}
