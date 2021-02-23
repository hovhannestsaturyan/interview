import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }),
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {
  }
  getAllData(url: string): Observable<any>{
    // @ts-ignore
    return this.http.get( url, httpOptionsPlain );
  }
}
