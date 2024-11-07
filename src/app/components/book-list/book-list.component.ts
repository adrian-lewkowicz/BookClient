import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;
  page = 1;
  pageSize = 5;

  constructor(private dialog: MatDialog,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }


  loadBooks(): void {
    this.bookService.getBooks(this.page, this.pageSize).subscribe(
      (data) => {
        this.books = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Błąd ładowania książek:', error);
        this.isLoading = false;
      }
    );
  }

  openEditDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '500px',
      data: { book: book, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '500px',
      data: { book: null }
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  deleteBook(id: string): void {
    if (confirm('Czy na pewno chcesz usunąć tę książkę?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => book.id !== id);
      });
    }
  }

  downloadBooks(): void {
    this.bookService.downloadBooks().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'books.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Błąd podczas pobierania pliku:', error);
    });
  }

  nextPage(): void {
    this.page++;
    this.loadBooks();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBooks();
    }
  }
}