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
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // TODO: fix
  getChapter(id: number): FullClass | undefined {
    switch(this.currentBook().name) {
      case 'Compréhension Orale':
        return this.data1.find(d => d.id === id)
      case 'Communication':
        return this.data.find(d => d.id === id)
      default:
        return this.data.find(d => d.id === id)
    }
  }

  // TODO: fix  
  getChapters(): Chapter[] {
    switch(this.currentBook().name) {
      case 'Compréhension Orale':
        return this.data1.map(d => ({
          id: d.id,
          name: d.name
        }))
      case 'Communication':
        return this.data.map(d => ({
          id: d.id,
          name: d.name
        }))
      default:
        return this.data.map(d => ({
          id: d.id,
          name: d.name
        }))
    }
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


  /**
   * Communication A1
   */
  private data: FullClass[] = [
    {
      id: 4,
      name: 'Chez moi',
      baseUrl: 'assets/sam_a1/',
      answersUrl: [
        'Communication_essentielle_A1_page-0144.jpg',
        'Communication_essentielle_A1_page-0145.jpg'
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
    {
      id: 5,
      name: 'Un problème domestique ?',
      baseUrl: 'assets/sam_a1/',
      answersUrl: [
        'Communication_essentielle_A1_page-0145.jpg',
        'Communication_essentielle_A1_page-0146.jpg'
      ],
      page: [
        {
          id: 1,
          imageUrl: 'Communication_essentielle_A1_page-0036.jpg',
          audioUrl: [49],
          notes: ''
        },
        {
          id: 2,
          imageUrl: 'Communication_essentielle_A1_page-0037.jpg',
          audioUrl: [50],
          notes: ''
        },
        {
          id: 3,
          imageUrl: 'Communication_essentielle_A1_page-0038.jpg',
          audioUrl: [51,52,53],
          notes: ''
        },
        {
          id: 4,
          imageUrl: 'Communication_essentielle_A1_page-0039.jpg',
          audioUrl: [54,55],
          notes: ''
        },
        {
          id: 5,
          imageUrl: 'Communication_essentielle_A1_page-0040.jpg',
          audioUrl: [56,57,58,59,60],
          notes: ''
        },
        {
          id: 6,
          imageUrl: 'Communication_essentielle_A1_page-0040.jpg',
          audioUrl: [],
          notes: ''
        },
      ]
    },
  ]

  /**
   * CO A1
   */

  private data1: FullClass[] = [
    {
      id: 4243,
      name: '42-45: Garder la forme',
      baseUrl: 'assets/gram_a1/',
      answersUrl: [
        'Compréhension Orale_page-0112.jpg',
        'Compréhension Orale_page-0125.jpg'
      ],
      page: [
        {
          id: 1,
          imageUrl: 'Compréhension Orale_page-0042.jpg',
          audioUrl: [28],
          notes: ''
        },
        {
          id: 2,
          imageUrl: 'Compréhension Orale_page-0043.jpg',
          audioUrl: [28],
          notes: ''
        },
        {
          id: 3,
          imageUrl: 'Compréhension Orale_page-0044.jpg',
          audioUrl: [28],
          notes: ''
        },
        {
          id: 4,
          imageUrl: 'Compréhension Orale_page-0045.jpg',
          audioUrl: [28],
          notes: ''
        },
      ]
    },
    {
      id: 4647,
      name: '46-47: Louer un appartament',
      baseUrl: 'assets/gram_a1/',
      answersUrl: [
        'Compréhension Orale_page-0112.jpg',
        'Compréhension Orale_page-0125.jpg'
      ],
      page: [
        {
          id: 1,
          imageUrl: 'Compréhension Orale_page-0046.jpg',
          audioUrl: [29],
          notes: ''
        },
        {
          id: 2,
          imageUrl: 'Compréhension Orale_page-0047.jpg',
          audioUrl: [29],
          notes: ''
        },
        
      ]
    },
    // {
    //   id: 4243,
    //   name: '42-43: Garder la forme',
    //   baseUrl: 'assets/gram_a1/',
    //   answersUrl: [
    //     'Compréhension Orale_page-0112.jpg',
    //     'Compréhension Orale_page-0125.jpg'
    //   ],
    //   page: [
    //     {
    //       id: 1,
    //       imageUrl: 'Compréhension Orale_page-0042.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //     {
    //       id: 2,
    //       imageUrl: 'Compréhension Orale_page-0043.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //   ]
    // },
    // {
    //   id: 4243,
    //   name: '42-43: Garder la forme',
    //   baseUrl: 'assets/gram_a1/',
    //   answersUrl: [
    //     'Compréhension Orale_page-0112.jpg',
    //     'Compréhension Orale_page-0125.jpg'
    //   ],
    //   page: [
    //     {
    //       id: 1,
    //       imageUrl: 'Compréhension Orale_page-0042.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //     {
    //       id: 2,
    //       imageUrl: 'Compréhension Orale_page-0043.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //   ]
    // },
    // {
    //   id: 4243,
    //   name: '42-43: Garder la forme',
    //   baseUrl: 'assets/gram_a1/',
    //   answersUrl: [
    //     'Compréhension Orale_page-0112.jpg',
    //     'Compréhension Orale_page-0125.jpg'
    //   ],
    //   page: [
    //     {
    //       id: 1,
    //       imageUrl: 'Compréhension Orale_page-0042.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //     {
    //       id: 2,
    //       imageUrl: 'Compréhension Orale_page-0043.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //   ]
    // },
    // {
    //   id: 4243,
    //   name: '42-43: Garder la forme',
    //   baseUrl: 'assets/gram_a1/',
    //   answersUrl: [
    //     'Compréhension Orale_page-0112.jpg',
    //     'Compréhension Orale_page-0125.jpg'
    //   ],
    //   page: [
    //     {
    //       id: 1,
    //       imageUrl: 'Compréhension Orale_page-0042.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //     {
    //       id: 2,
    //       imageUrl: 'Compréhension Orale_page-0043.jpg',
    //       audioUrl: [28],
    //       notes: ''
    //     },
    //   ]
    // },
  ]

  private books: Book[] = [
    {
      name: 'Communication',
      level: 'A1',
      storageName: 'A1_ACTIVE_COMM',
      data: this.data
    },
    {
      name: 'Compréhension Orale',
      level: 'A1',
      storageName: 'A1_GRAMMAR_COMP',
      data: this.data1
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
