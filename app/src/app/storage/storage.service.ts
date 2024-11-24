import { AllNotes, Book } from './../models/notes.model';
import { Injectable, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FullClass } from '../models/full-class.model';
import { Chapter } from '../models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  currentBook: WritableSignal<Book> = signal<Book>({});
  notes: WritableSignal<AllNotes> = signal<AllNotes>({});

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
      console.log('==== currBook', currBook)
      if (currBook) {
        const book = JSON.parse(currBook);
        this.currentBook.set(book)
      }
    }  
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }


  getChapter(id: number): FullClass | undefined {
    return this.data.find(d => d.id === id)
  }

  getChapters(): Chapter[] {
    return this.data.map(d => ({
      id: d.id,
      name: d.name
    }))
  }

  getBooks(): Book[] {
    return this.books;
  }

  exportNotes(): void {
    const dataStr = JSON.stringify(this.notes(), null, 2); // Преобразуем объект в строку JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json'; // Имя файла
    a.click();
  
    window.URL.revokeObjectURL(url); // Освобождаем ресурс
  }
  
  importNotes(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (!input.files?.length) {
      return;
    }
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string); // Парсим содержимое файла
        this.notes.set(importedData); // Обновляем объект
        console.log('Импортированные данные:', this.notes());
      } catch (error) {
        console.error('Ошибка при импорте файла JSON:', error);
      }
    };
  
    reader.readAsText(file);
  }
  

  private data: FullClass[] = [
    {
      id: 4,
      name: 'Chez moi',
      baseUrl: 'assets/sam_a1/',
      answersUrl: [
        'Communication_essentielle_A1_page-0143.jpg',
        'Communication_essentielle_A1_page-0144.jpg'
      ],
      page: [
        {
          id: 1,
          imageUrl: 'Communication_essentielle_A1_page-0030.jpg',
          audioUrl: [38],
          notes: ''
        },
        {
          id: 2,
          imageUrl: 'Communication_essentielle_A1_page-0031.jpg',
          audioUrl: [39],
          notes: ''
        },
        {
          id: 3,
          imageUrl: 'Communication_essentielle_A1_page-0032.jpg',
          audioUrl: [40,41,42],
          notes: ''
        },
        {
          id: 4,
          imageUrl: 'Communication_essentielle_A1_page-0033.jpg',
          audioUrl: [43],
          notes: ''
        },
        {
          id: 5,
          imageUrl: 'Communication_essentielle_A1_page-0034.jpg',
          audioUrl: [44,45,46,47,48],
          notes: ''
        },
        {
          id: 6,
          imageUrl: 'Communication_essentielle_A1_page-0035.jpg',
          audioUrl: [],
          notes: ''
        },
      ]
    },
  ]


  private books: Book[] = [
    {
      name: 'Communication',
      level: 'A1',
      storageName: 'A1_ACTIVE_COMM'
    },
    {
      name: 'Compréhension Orale',
      level: 'A1',
      storageName: 'A1_GRAMMAR_COMP'
    },
    // {
    //   name: '',
    //   level: '',
    //   storageName: ''
    // },
    // {
    //   name: '',
    //   level: '',
    //   storageName: ''
    // }
  ]
}
