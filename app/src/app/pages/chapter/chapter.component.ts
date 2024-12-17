import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChapterNotes } from '../../models/notes.model';
import { Chapter } from '../../models/chapter.model';
import { FormsModule } from '@angular/forms';
import { AudioRecorderComponent } from './audio-recorder/audio-recorder.component';
import { QuizComponent } from "../quiz/quiz.component";

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    CommonModule,
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
    MyAnswersInputComponent,
    MatCheckboxModule,
    FormsModule,
    AudioRecorderComponent,
    QuizComponent
],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent implements OnInit, OnDestroy {
  isMobile = false;
  chapterId = '';
  chapterNotes!: ChapterNotes;
  checkedChapters = {}

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    protected storage: StorageService
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

  get chapters(): Chapter[] {
    return this.storage.getChapters();
  }


  // screen size
  screenWidth: number = window.innerWidth;
  private resizeListener = () => this.updateScreenWidth();

  ngOnInit() {
    this.updateScreenWidth();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  private updateScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth < 600
    this.storage.isMobile.set(this.isMobile);
  }
}
