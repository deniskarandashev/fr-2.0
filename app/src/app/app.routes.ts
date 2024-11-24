import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ChapterComponent } from './pages/chapter/chapter.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'chapter/:id', component: ChapterComponent }
];
