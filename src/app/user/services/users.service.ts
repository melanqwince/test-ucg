import { Injectable } from '@angular/core';
import * as data from '../../users.json'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 500)
    })
  }
}
