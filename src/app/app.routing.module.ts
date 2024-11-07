import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';


const routes: Routes = [
    { path: '', component: BookListComponent },
    { path: 'edit/:id', component: BookDialogComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
