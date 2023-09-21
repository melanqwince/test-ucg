import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import {UsersService} from "./services/users.service";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserListComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [UsersService]
})
export class UserModule { }
