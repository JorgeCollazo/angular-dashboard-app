import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturacionDataService {

  constructor(private http:HttpClient) { }

  getPosts() {
  //  return this.http.get<{userId: number, id: number, title: string, body:string}>('https://jsonplaceholder.typicode.com/todos/');
   return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/todos/');
  }
}
