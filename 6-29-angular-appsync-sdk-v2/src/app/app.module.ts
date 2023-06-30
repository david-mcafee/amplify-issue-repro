import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

// import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppsyncService } from './appsync.service';

@NgModule({
  declarations: [AppComponent, TodoComponent],
  //   imports: [BrowserModule, AppRoutingModule, AmplifyAngularModule],
  imports: [BrowserModule, AppRoutingModule],
  //   providers: [AmplifyService, AppsyncService],
  providers: [AppsyncService],
  bootstrap: [AppComponent],
})
export class AppModule {}
