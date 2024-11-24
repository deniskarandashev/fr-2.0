import { StorageService } from './../../storage/storage.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { Book } from '../../models/notes.model';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  books!: Book[]

  constructor(private storage: StorageService) {
    this.books = storage.getBooks();
  }

  onMenuItemClick(book: Book): void {
    this.storage.currentBook.set(book);
    this.saveCurrentBook(book);
  }

  getCurrentBook(): Book {
    return this.storage.currentBook();
  }

  private saveCurrentBook(book: Book): void {

    if (this.isBrowser()) {
      // set current book
      const currBookStr = JSON.stringify(book);
      localStorage.setItem('BOOK_FR', currBookStr);
    }
    
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
