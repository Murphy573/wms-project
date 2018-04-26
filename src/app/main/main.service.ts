import { Injectable } from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import {Observable}   from 'rxjs/Observable';

@Injectable()
export class MainService {

  constructor(private http: HttpClient) { }

  public logout(): Observable<boolean> {
    return this.http.get<boolean>('usmart/account/logout');
  }
}
