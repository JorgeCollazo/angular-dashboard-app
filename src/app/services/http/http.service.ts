import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url)
      .pipe(
        retry(1), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  post(url: string, data: any) {
    return this.http.post(url, data)
      .pipe(
        retry(1), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  update(url: string, data: any) {
    return this.http.put(url, data)
      .pipe(
        retry(1), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  delete(url: string) {
    return this.http.delete(url)
      .pipe(
        retry(1), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
