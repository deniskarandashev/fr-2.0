import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  chapterId = '';

  constructor(private route: ActivatedRoute, private location: Location) {
    this.chapterId = this.route.snapshot.paramMap.get('id') || '';
  }

  goBack(): void {
    this.location.back();
  }
}
