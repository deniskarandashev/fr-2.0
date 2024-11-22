import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../../storage/storage.service';
import { FullClass } from '../../models/full-class.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  chapterId = '';
  data!: FullClass | undefined;

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private storage: StorageService
  ) {
    this.chapterId = this.route.snapshot.paramMap.get('id') || '';
    this.data = storage.getChapter(parseInt(this.chapterId))
  }

  goBack(): void {
    this.location.back();
  }
}
