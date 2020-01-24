import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material";

import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  hasRegistered: boolean = false;
  updateNavigation: any;
  loggedIn: string;
  userData: any;
  // userLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
    private dialogRef: MatDialogRef<MainNavComponent>,

    ) { }

  ngOnInit() {
  }

  onRegister(){
    this.auth.onRegister(this.email, this.password).then( response => {
      this.userData = response;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('UID', this.userData.user.uid);
      this.hasRegistered = true;
    }).catch( err => {
      console.log(err.message)
      this.flash.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      })
    })

  }

  addPersonalInfo(form: NgForm){

    this.auth.userPersonalInfoRegister(form);
    this.loggedIn = localStorage.getItem('isLoggedIn');

    if(this.loggedIn !== null){
      this.hasRegistered = false;
      this.email = '';
      this.password = '';
    } else {
      return;
    }
    
    this.flash.show('Your account has been successfully created, you are now logged in.', {
      cssClass: 'alert-success', timeout: 4000
    })
    this.checkAdmin();

  }

  close(){
    this.dialogRef.close();
  }


  checkAdmin(){
    let logged = localStorage.getItem('isLoggedIn');
     if(logged == 'true'){
      this.auth.updateNavbar(this.userData.user.uid);
      this.auth.userHasRegistered('user registered');
        return;
     } else {
        alert('user is not an admin')
     }  
  }

}
