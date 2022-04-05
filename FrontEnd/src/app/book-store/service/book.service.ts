import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + '/books')
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(API_URL + '/books/' + id)
  }

  createBook(book: Book): Observable<any> {
    return this.http.post(API_URL + '/books/', book)
  }

  updateBook(id: any, book: Book): Observable<Book> {
    // @ts-ignore
    return this.http.put<Book>(API_URL + '/books/' + id,book)
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(API_URL + '/books/' + id)
  }
}
