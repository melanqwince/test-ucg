import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./user/components/user-list/user-list.component";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import {NotAuthorizedComponent} from "./errors/not-authorized/not-authorized.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: '403',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
