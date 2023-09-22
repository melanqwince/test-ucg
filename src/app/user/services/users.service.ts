import { Injectable } from '@angular/core';
import * as data from '../../users.json'
import { User } from "../models/user.interface";
import {delay, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Observable<any> {
    // emulate get users
    return of(data).pipe(delay(500))
  }

  saveUsers(users: User[]): Observable<any> {
    // emulate save users
    return of({ status: 1 }).pipe(delay(500))

    // *** emulate server side error ***
    // return throwError({ status: 0, errors: {
    //   email: 'Email already exist.'
    //   } }).pipe(delay(500))
  }
}
