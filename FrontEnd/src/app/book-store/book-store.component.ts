import {Component, OnInit} from '@angular/core';
import {BookService} from "./service/book.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Book} from "./model/book";

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit {
  formBook!: FormGroup;
  book?: Book;
  books?: Book[];

  constructor(private bookService: BookService,
              private formGroup: FormBuilder) {
  }

  ngOnInit(): void {
    this.formBook = this.formGroup.group({
      id: [''],
      title: [''],
      author: [''],
      description: [''],
    });
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(books => this.books = books);
  }

  createBook() {
    const book = {
      id: this.formBook.value.id,
      title: this.formBook.value.title,
      author: this.formBook.value.author,
      description: this.formBook.value.description,

    }
    this.bookService.createBook(book).subscribe(() => {

      if (book.id == '') {
        alert("Create successful")
      } else {
        alert("Update Successful")
      }
      this.formBook.reset();
      // @ts-ignore
      document.getElementById(`formEditBook`).hidden = true;
      this.getAllBooks()
    })
  }

  editBook(id: any) {
    // @ts-ignore
    document.getElementById(`formEditBook`).hidden = false;
    this.bookService.getBookById(id).subscribe(book => {
      this.formBook.patchValue(book);
      // @ts-ignore
      document.getElementById("form-button").hidden = false
    })
  }

  deleteBook(id: any) {
    if (confirm("Do you want to delete?")) {
      this.bookService.deleteBook(id).subscribe(() => {
        alert("Delete Successful");
        this.getAllBooks();
      })
    } else {
      alert("Không xóa thì đừng có nghịch")
    }
  }

  viewDetailBook(id: any) {
    // @ts-ignore
    document.getElementById(`formEditBook`).hidden = false;
    this.bookService.getBookById(id).subscribe(book => {
      this.formBook.patchValue(book);
      // @ts-ignore
      document.getElementById("form-button").hidden = true
    })
  }

  openCreate() {
    // @ts-ignore
    document.getElementById(`formEditBook`).hidden = false;
    // @ts-ignore
    document.getElementById("form-button").hidden = false
  }
}
