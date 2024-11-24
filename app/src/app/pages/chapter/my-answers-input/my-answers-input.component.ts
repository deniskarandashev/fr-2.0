import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
      this.currentBookName = this.storage.currentBook().name ?? this.storage.getBooks()[1].name ?? '';
      this.allNotes = this.storage.notes() ?? {};
      this.inputNotes = this.allNotes[this.currentBookName]?.[this.chapterName]?.[this.chapterPageName] ?? '';
      console.log('=======', this.inputNotes)
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
  
    console.log('============ this.chapterPageName', this.chapterPageName);

    this.storage.notes.set(this.allNotes)
    if (this.isBrowser()) {
      const allNotesStr = JSON.stringify(this.allNotes);
      localStorage.setItem('NOTES_FR', allNotesStr);
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  
}
