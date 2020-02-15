import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  password: string;
  hasRegistered: boolean = false;
  loggedIn: string;
  userData: any;
  userId: string;

  constructor(
    private auth: AuthService,
    private flash: FlashMessagesService,
    private router: Router,
    private menu: MenuService
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

  checkAdmin(){
    let logged = localStorage.getItem('isLoggedIn');
     if(logged == 'true'){
      this.auth.updateNavbar('user registered');
        return;
     } else {
        alert('user is not an admin')
     }  
  }

  plan(mealPlan){
      this.userId = localStorage.getItem('UID');
      this.menu.deleteUserCart(this.userId);
        localStorage.removeItem('mealPlan');
        localStorage.setItem('mealPlan', `${mealPlan}`)
        this.router.navigate(['/menu'])
  }
}
