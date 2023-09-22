import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from "./user/user.module";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
