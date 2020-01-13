import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  password: string;
  hasRegistered: boolean = false;
  updateNavigation: boolean = true;
  loggedIn: string;
  userLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private flash: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onRegister(){
    this.auth.onRegister(this.email, this.password).then( response => {
      localStorage.setItem('isLoggedIn', 'true');
      console.log('success')
    })
    this.hasRegistered = true;
  }

  addPersonalInfo(form: NgForm){
    console.log(form)
    this.auth.userPersonalInfoRegister(form);
    this.loggedIn = localStorage.getItem('isLoggedIn');

    if(this.loggedIn !== null){
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    
    this.flash.show('Your account has been successfully created, you can now log in.', {
      cssClass: 'alert-success', timeout: 4000
    })
    this.checkAdmin();
    localStorage.removeItem('UID')
  }

  checkAdmin(){
    let logged = localStorage.getItem('isLoggedIn');
     if(logged == 'true'){
      this.auth.updateNavbar(this.updateNavigation);
        return;
     } else {
        alert('user is not an admin')
     }  
  }

}
