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
import { audioScript } from '../../../storage/db/audio-scripts';
import { CommonModule } from '@angular/common';

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
    MatInputModule,
    CommonModule
  ],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss'
})
export class AudioComponent {
  @Input() page!: PageData;
  @Input() data!: FullClass;
  @Input() isMobile = false;

  constructor(private storage: StorageService) {}

  getSrc(audio: string | number): string {
    if (this.storage.currentBook()?.name === this.storage.getBooks()[0].name) {
      return this.data.baseUrl + 'audio/piste' + audio + '.mp3'
    } else {
      return this.data.baseUrl + this.getLink(audio);
    }
    
  }

  getAudioScript(audioName: string | number): string {
    return audioScript[this.data.baseUrl]?.[audioName]
  }

  private getLink(audio: string | number): string {
    return this.isContainType(audio) ? 'audio/' + audio : ('audio/' + audio + '.mp3');
  }

  private isContainType(audio: string | number): boolean {
    if (typeof audio === 'string') {
      return audio.includes('.mp3')
    }
    return false;
  }
}
