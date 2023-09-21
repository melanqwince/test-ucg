import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users!: User[];
  public activeUser: User | null = null;
  public isUserViewOpened: boolean = false;
  constructor(private cdr: ChangeDetectorRef, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().then((res: any) => {
      this.users = res.users;
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }

  saveUser(user: User) {
    const findUser = this.users.find((u: User) => (u.username === user.old_username || u.old_username === user.old_username))!;
    const index = this.users.indexOf(findUser);
    this.users[index] = { ...user };
    this.isUserViewOpened = false;
    this.activeUser = null;
  }

  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    this.isUserViewOpened = false;
    this.activeUser = null;
  }
}