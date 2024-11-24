import { StorageService } from './../../../storage/storage.service';
import { FullClass, PageData } from './../../../models/full-class.model';
import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-audio',
  imports: [
    MatCardModule,
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss'
})
export class AudioComponent {
  @Input() page!: PageData;
  @Input() data!: FullClass;

  constructor(private storage: StorageService) {}

  getSrc(audio: string | number): string {
    if (this.storage.currentBook()?.name === this.storage.getBooks()[0].name) {
      return this.data.baseUrl + 'audio/piste' + audio + '.mp3'
    } else {
      return this.data.baseUrl + 'audio/' + audio + '.mp3'
    }
    
  }
}
