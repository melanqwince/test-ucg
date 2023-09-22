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
  public serverErrors: any;
  constructor(private cdr: ChangeDetectorRef, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.users;
    });
  }

  addUser(user: User) {
    this.users.push(user);
    this.serverSaveUsers();
  }

  saveUser(user: User) {
    const findUser = this.users.find((u: User) => (u.username === user.old_username || u.old_username === user.old_username))!;
    const index = this.users.indexOf(findUser);
    this.users[index] = { ...user };
    this.serverSaveUsers();
  }

  deleteUser(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    this.serverSaveUsers();
  }

  serverSaveUsers() {
    this.userService.saveUsers(this.users).subscribe((res) => {
      console.log('Server saved users')
      this.isUserViewOpened = false;
      this.serverErrors = null;
      this.activeUser = null;
    }, (err) => {
      this.serverErrors = err.errors;

      console.error('Error on saving')
    })
  }
}
