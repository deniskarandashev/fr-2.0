import { StorageService } from './../../storage/storage.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { Chapter } from '../../models/chapter.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule,MatChipsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  chapters: Chapter[] | undefined;
  
  constructor(private storage: StorageService) {
    this.chapters = storage.getChapters()
  }
}
