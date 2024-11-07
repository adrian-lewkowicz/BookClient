import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [
    provideNativeDateAdapter(),
    provideAnimations(),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      MatDialogModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      RouterModule.forRoot(routes),
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatButtonModule,
      BrowserAnimationsModule
    ),
  ],
  declarations: [AppComponent, BookListComponent, BookDialogComponent],
};
