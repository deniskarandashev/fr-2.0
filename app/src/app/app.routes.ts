import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';

export const routes: Routes = [
  { path: '', component: MainComponent }, // Главная страница
  { path: 'chapter/:id', component: ChapterComponent }, // Страница главы
  { path: 'exercise/:id', component: ExerciseComponent }, // Страница упражнения
];
