import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    FooterComponent,
    CustomerReviewsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    MatDialogModule,
    BrowserAnimationsModule,

  ],
  entryComponents: [LoginComponent],
  providers: [AuthService, UsersService,     
    {
    provide: MatDialogRef,
    useValue: {}
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
