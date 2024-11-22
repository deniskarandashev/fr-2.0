import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Chapter {
  id: number
  name: string
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  chapters: Chapter[] = [
    {
      id: 4,
      name: 'Chez moi'
    },
    {
      id: 5,
      name: 'Une problème domestique ?'
    },{
      id: 6,
      name: 'Le règlement'
    },
    {
      id: 7,
      name: ''
    },{
      id: 8,
      name: ''
    },{
      id: 9,
      name: ''
    },{
      id: 10,
      name: ''
    },
  ]
}
