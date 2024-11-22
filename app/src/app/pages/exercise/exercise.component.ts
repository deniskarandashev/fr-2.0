import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
