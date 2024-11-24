import { Component, Input } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-answers',
  imports: [
    MatTabsModule
  ],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss'
})
export class AnswersComponent {
  @Input() answersUrl!: string[];
  @Input() baseUrl!: string;
}
