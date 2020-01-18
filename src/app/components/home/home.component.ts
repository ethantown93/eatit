import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  password: string;
  hasRegistered: boolean = false;
  updateNavigation: any;
  loggedIn: string;
  userData: any;

  constructor(
    private auth: AuthService,
    private flash: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegister(){
    this.auth.onRegister(this.email, this.password).then( response => {
      this.userData = response;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('UID', this.userData.user.uid);
      this.updateNavigation = this.userData.user.uid;
      console.log(this.updateNavigation);
    })
    this.hasRegistered = true;
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

  checkAdmin(){
    let logged = localStorage.getItem('isLoggedIn');
    console.log(logged)
     if(logged == 'true'){
      this.auth.updateNavbar(this.updateNavigation);
        return;
     } else {
        alert('user is not an admin')
     }  
  }

  plan4(){
    localStorage.setItem('mealPlan', '4');
    this.router.navigate(['/menu'])
  }

  plan8(){
    localStorage.setItem('mealPlan', '8');
    this.router.navigate(['/menu'])
  }

  plan12(){
    localStorage.setItem('mealPlan', '12');
    this.router.navigate(['/menu'])
  }

  plan16(){
    localStorage.setItem('mealPlan', '16');
    this.router.navigate(['/menu'])
  }

}
