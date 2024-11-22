import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  saveNotes(exerciseId: number, notes: string): void {
    const notesData = JSON.parse(localStorage.getItem('notes') || '{}');
    notesData[exerciseId] = notes;
    localStorage.setItem('notes', JSON.stringify(notesData));
  }

  getNotes(exerciseId: number): string | null {
    const notesData = JSON.parse(localStorage.getItem('notes') || '{}');
    return notesData[exerciseId] || null;
  }

  exportNotes(): void {
    const notes = localStorage.getItem('notes');
    const blob = new Blob([notes || '{}'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importNotes(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const notes = reader.result as string;
      localStorage.setItem('notes', notes);
    };
    reader.readAsText(file);
  }
}
