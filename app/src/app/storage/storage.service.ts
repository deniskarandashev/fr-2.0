import { data_1 } from './db/data_1';
import { AllNotes, Book } from './../models/notes.model';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { FullClass } from '../models/full-class.model';
import { Chapter } from '../models/chapter.model';
import { BooksEnum } from '../models/books.enum';
import { data_2 } from './db/data_2';
import { data_3 } from './db/data_3';
import { data_4 } from './db/data_4';
import { data_5_a1_grammEnDialGrDeb } from './db/data_5_a1_grammEnDialGrDeb';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isQuiz: WritableSignal<boolean> = signal<boolean>(false);
  currentBook: WritableSignal<Book> = signal<Book>({});
  notes: WritableSignal<AllNotes> = signal<AllNotes>({});
  currentChapter: WritableSignal<FullClass> = signal<FullClass>({} as FullClass);

  constructor() {
    if (this.isBrowser()) {
      // get notes
      const notesStr = localStorage.getItem('NOTES_FR');
      if (notesStr) {
        const notes = JSON.parse(notesStr);
        this.notes.set(notes ?? {});
      }

      // get current book
      const currBook = localStorage.getItem('BOOK_FR');
      if (currBook) {
        const book = JSON.parse(currBook);
        this.currentBook.set(book)
      }
    }  

    if (this.isBrowser()) {
      window.addEventListener('beforeunload', () => {
        this.exportNotes('on-app-close');
    });
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // TODO: fix
  getChapter(id: number): FullClass | undefined {
    switch(this.currentBook().name) {
      case BooksEnum.A1_CO:
        return data_3.find(d => d.id === id)
      case BooksEnum.A1_COMM:
        return data_1.find(d => d.id === id)
      case BooksEnum.A1_GRAMM_EN_CONTEXT:
        return data_2.find(d => d.id === id)
      case BooksEnum.A1_GRAMM_EN_DIALODUES:
        return data_4.find(d => d.id === id)
      case BooksEnum.A1_GRAMM_EN_DIALODUES_GR_DEBUT:
        return data_5_a1_grammEnDialGrDeb.find(d => d.id === id)
      default:
        return data_3.find(d => d.id === id)
    }
  }

  // TODO: fix  
  getChapters(): Chapter[] {
    switch(this.currentBook().name) {
      case BooksEnum.A1_CO:
        return data_3.map(d => ({
          id: d.id,
          name: d.name
        }))
      case BooksEnum.A1_COMM:
        return data_1.map(d => ({
          id: d.id,
          name: d.name
        }))
      case BooksEnum.A1_GRAMM_EN_CONTEXT:
        return data_2.map(d => ({
          id: d.id,
          name: d.name
      }))
      case BooksEnum.A1_GRAMM_EN_DIALODUES:
        return data_4.map(d => ({
          id: d.id,
          name: d.name
      }))
      case BooksEnum.A1_GRAMM_EN_DIALODUES_GR_DEBUT:
        return data_5_a1_grammEnDialGrDeb.map(d => ({
          id: d.id,
          name: d.name
      }))
      default:
        return data_3.map(d => ({
          id: d.id,
          name: d.name
        }))
    }
  }

  getBooks(): Book[] {
    return this.books;
  }

  exportNotes(comment?: string): void {
    const dataStr = JSON.stringify(this.notes(), null, 2); // Преобразуем объект в строку JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;

    const date = new Date();
    a.download = `Notes-${comment ? comment + '-' : ''}${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.json`; // Имя файла
    a.click();
  
    window.URL.revokeObjectURL(url); // Освобождаем ресурс
  }
  
  importNotes(event: Event, comment?: string): void {
    const input = event.target as HTMLInputElement;
  
    if (!input.files?.length) {
      return;
    }
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string); // Парсим содержимое файла
        this.exportNotes(comment);
        this.notes.set(importedData); // Обновляем объект
        localStorage.setItem('NOTES_FR', JSON.stringify(importedData));
        console.log('Импортированные данные:', this.notes());
      } catch (error) {
        console.error('Ошибка при импорте файла JSON:', error);
      }
    };
  
    reader.readAsText(file);
  }

  private books: Book[] = [
    {
      name: BooksEnum.A1_COMM,
      level: 'A1',
      storageName: 'A1_ACTIVE_COMM',
      data: data_1
    },
    {
      name: BooksEnum.A1_CO,
      level: 'A1',
      storageName: 'A1_GRAMMAR_COMP',
      data: data_3
    },
    {
      name: BooksEnum.A1_GRAMM_EN_DIALODUES,
      level: 'A1',
      storageName: 'A1_GRAMM_EN_DIALODUES',
      data: data_4
    },
    {
      name: BooksEnum.A1_GRAMM_EN_DIALODUES_GR_DEBUT,
      level: 'A1',
      storageName: 'A1_GRAMM_EN_DIALODUES_GR_DEBUT',
      data: data_5_a1_grammEnDialGrDeb
    },
    {
      name: BooksEnum.A1_GRAMM_EN_CONTEXT,
      level: 'A1',
      data: data_2
    },
    // {
    //   name: '',
    //   level: '',
    //   storageName: ''
    // }
  ]
}
