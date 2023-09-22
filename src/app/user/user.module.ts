import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UsersService } from "./services/users.service";
import { ReactiveFormsModule } from "@angular/forms";
import { EmailValidatorDirective } from "./directives/email-validator-reactive.directive";
import { PasswordValidatorReactiveDirective } from "./directives/password-validator-reactive.directive";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    UserListComponent,
    UserViewComponent,
    EmailValidatorDirective,
    PasswordValidatorReactiveDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UsersService]
})
export class UserModule { }
