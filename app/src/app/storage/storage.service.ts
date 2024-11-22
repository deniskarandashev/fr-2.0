import { Injectable } from '@angular/core';
import { FullClass } from '../models/full-class.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // {
  //   id: ,
  //   imageUrl: '',
  //   audioUrl: [],
  //   notes: ''
  // }

  getChapter(id: number): FullClass | undefined {
    return this.data.find(d => d.id === id)
  }

  private data: FullClass[] = [
    {
      id: 4,
      name: 'Chez moi',
      baseUrl: 'assets/sam_a1/',
      answersUrl: [
        'Communication_essentielle_A1_page-0143.jpg',
        'Communication_essentielle_A1_page-0144.jpg'
      ],
      page: [
        {
          id: 1,
          imageUrl: 'Communication_essentielle_A1_page-0030.jpg',
          audioUrl: [38],
          notes: ''
        },
        {
          id: 2,
          imageUrl: 'Communication_essentielle_A1_page-0031.jpg',
          audioUrl: [39],
          notes: ''
        },
        {
          id: 3,
          imageUrl: 'Communication_essentielle_A1_page-0032.jpg',
          audioUrl: [40,41,42],
          notes: ''
        },
        {
          id: 4,
          imageUrl: 'Communication_essentielle_A1_page-0033.jpg',
          audioUrl: [43],
          notes: ''
        },
        {
          id: 5,
          imageUrl: 'Communication_essentielle_A1_page-0034.jpg',
          audioUrl: [44,45,46,47,48],
          notes: ''
        },
        {
          id: 6,
          imageUrl: 'Communication_essentielle_A1_page-0035.jpg',
          audioUrl: [],
          notes: ''
        },
      ]
    },
  ]
}
