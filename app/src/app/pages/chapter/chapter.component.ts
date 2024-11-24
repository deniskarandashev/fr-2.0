import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../../storage/storage.service';
import { FullClass } from '../../models/full-class.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AudioComponent } from './audio/audio.component';
import { AnswersComponent } from "./answers/answers.component";
import { MyAnswersInputComponent } from './my-answers-input/my-answers-input.component';
import { NotesService } from '../../services/notes-service.service';
import { ChapterNotes } from '../../models/notes.model';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AudioComponent,
    AnswersComponent,
    MyAnswersInputComponent
],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  chapterId = '';
  // data!: FullClass | undefined;
  chapterNotes!: ChapterNotes;

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private storage: StorageService
  ) {
    // this.chapterId = this.route.snapshot.paramMap.get('id') || '';
    this.chapterId = this.currentChapter?.id?.toString() ?? '0';
    // this.data = storage.getChapter(parseInt(this.chapterId))
  }

  // goBack(): void {
  //   this.location.back();
  // }

  get currentChapter(): FullClass {
    return this.storage.currentChapter();
  }

  get data(): FullClass | undefined {
    return this.storage.getChapter(this.currentChapter.id)
  }
}
