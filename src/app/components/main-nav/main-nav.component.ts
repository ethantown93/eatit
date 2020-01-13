import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig  } from '@angular/material';
import { MatDialogRef } from "@angular/material";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  homePage:boolean = true;
  isLoggedIn: string;
  isLoggedin: boolean;
  loggedInUser: string;
  nav: any = []

  logged: boolean = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private flash: FlashMessagesService,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.updateNavBar$.subscribe( res => {
      if(res) {
        this.getNav();
      } else {
        console.log('wang');
      }
    })

    }

    getNav(){
      this.isLoggedIn = localStorage.getItem('isLoggedIn')
      console.log(this.isLoggedIn)
      if(this.isLoggedIn === 'true') {
          this.logged = false;
          console.log(this.logged)
      } else {
        this.logged = true;
        console.log(this.logged)
    }

  }

  openDialog() {
    new MatDialogConfig();
    this.dialog.open(LoginComponent, {
    });
  }

  onLogout(){
    this.auth.logout()
    localStorage.clear();
    this.getNav()
    this.flash.show('You have logged out.', {
      cssClass: 'alert-danger', timeout:3000
    })

  }

}
