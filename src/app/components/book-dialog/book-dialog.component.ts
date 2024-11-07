import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class BookDialogComponent implements OnInit {

  bookForm!: FormGroup;
  isEditMode: boolean = false;
  bookId?: string;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book | null }
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data.book;
    this.bookId = this.data.book?.id;

    this.bookForm = this.fb.group({
      title: [this.data.book?.title || '', Validators.required],
      author: [this.data.book?.author || '', Validators.required],
      publicationDate: [this.data.book?.publicationDate || '', Validators.required],
      pages: [this.data.book?.pages || 0, [Validators.required, Validators.min(1)]],
      genre: [this.data.book?.genre || '', Validators.required],
      rating: [this.data.book?.rating || 0, [Validators.required, Validators.min(0), Validators.max(5)]],
      price: [this.data.book?.price || 0, [Validators.required, Validators.min(0)]],
      isbn: [this.data.book?.isbn || '', Validators.required],
      isAvailable: [this.data.book?.isAvailable || true]
    });
  }

  onSave(): void {
    console.log('clicked');
    if (this.bookForm.valid) {
      console.log('Form is valid, saving data...');
      const bookData: Book = this.bookForm.value;
      if (this.isEditMode && this.bookId) {
        this.bookService.updateBook(this.bookId, bookData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.bookService.createBook(bookData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    } else {
      console.log("Formularz jest niepoprawny");
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
