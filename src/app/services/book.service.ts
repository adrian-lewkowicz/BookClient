import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';



@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl = 'https://localhost:7009/api/books';

  constructor(private http: HttpClient) { }

  getBooks(page: number, pageSize: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  downloadBooks(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }
}