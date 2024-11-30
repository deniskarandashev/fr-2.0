import { Component, effect, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms'
import { MatTabsModule } from '@angular/material/tabs';
import { NotesService } from '../../../services/notes-service.service';
import { StorageService } from '../../../storage/storage.service';
import { AllNotes } from '../../../models/notes.model';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-my-answers-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatTabsModule],
  templateUrl: './my-answers-input.component.html',
  styleUrl: './my-answers-input.component.scss'
})
export class MyAnswersInputComponent implements OnInit {
  @Input() chapterName: string = '';
  @Input() chapterPageName: string = '';
  @Input() chapter: string = '';

  allNotes: AllNotes = {};
  inputNotes: string = ''
  currentBookName: string = '';

  constructor(private storage: StorageService) {
    effect(() => {
      this.currentBookName = this.storage.currentBook().name ?? this.storage.getBooks()[1].name ?? '';
      this.chapterName = this.storage.currentChapter().name ?? '';

      this.allNotes = this.storage.notes() ?? {};
      this.inputNotes = this.allNotes[this.currentBookName]?.[this.chapterName]?.[this.chapterPageName] ?? '';
    })
  }

  ngOnInit(): void {
      this.currentBookName = this.storage.currentBook().name ?? this.storage.getBooks()[1].name ?? '';
      this.allNotes = this.storage.notes() ?? {};
      this.inputNotes = this.allNotes[this.currentBookName]?.[this.chapterName]?.[this.chapterPageName] ?? '';
  }

  onInputChange(e: Event): void {
    const note = (e.target as HTMLInputElement).value;
  
    if (!this.allNotes[this.currentBookName]) {
      this.allNotes[this.currentBookName] = {};
    }
  
    if (!this.allNotes[this.currentBookName][this.chapterName]) {
      this.allNotes[this.currentBookName][this.chapterName] = {};
    }
  
    // Устанавливаем значение
    this.allNotes[this.currentBookName][this.chapterName][this.chapterPageName] = note;

    this.storage.notes.set(this.allNotes)
    if (this.isBrowser()) {
      const allNotesStr = JSON.stringify(this.allNotes);
      localStorage.setItem('NOTES_FR', allNotesStr);
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  
  onKeyDown(event: KeyboardEvent): void {
    // Проверяем нажатие клавиши Enter
    if (event.key === 'Enter') {
      const textarea = event.target as HTMLTextAreaElement;

      // Получаем текст до каретки
      const textBeforeCaret = textarea.value.substring(0, textarea.selectionStart);
      const lines = textBeforeCaret.split('\n'); // Разделяем текст на строки
      const lastLine = lines[lines.length - 1].trim(); // Последняя строка
      
      // Проверяем, оканчивается ли последняя строка на число с точкой
      const match = lastLine.match(/^(\d+)\. /);
      if (match) {
        event.preventDefault(); // Предотвращаем стандартное поведение Enter
        
        const nextNumber = parseInt(match[1], 10) + 1; // Следующее число
        const textAfterCaret = textarea.value.substring(textarea.selectionStart); // Текст после каретки
        
        // Вставляем новую строку с числом
        this.inputNotes =
          textBeforeCaret + '\n' + nextNumber + '. ' + textAfterCaret;

        // Устанавливаем каретку в нужное место
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = textBeforeCaret.length + nextNumber.toString().length + 3; // '\n2. '.length
        });
      }
    } else if (event.key === '²') {
      const textarea = event.target as HTMLTextAreaElement;

      // Вставляем новую строку с числом
      for(let i = 1; i <= 10; i++) {
        this.inputNotes +=  i + '. \n';
      }

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = this.inputNotes.indexOf('1. ') + '1. '.length;
        textarea.focus(); // Фокусируем на textarea
      }, 0);
    }
  }
}
