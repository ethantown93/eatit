import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MatDialog, MatDialogConfig  } from '@angular/material';
import { AuthService } from '../../services/auth.service';

import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mealPlan: number;
  menuItems: [];
  loading: boolean = true;
  isLoggedIn: boolean = true;

  constructor(
    private menu: MenuService,
    private dialog: MatDialog,
    private auth: AuthService
    ) { }

  ngOnInit() {

    let loggedIn = localStorage.getItem('isLoggedIn')
    if(loggedIn === 'true'){
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

    this.mealPlan = parseInt(localStorage.getItem('mealPlan'));
    console.log(this.mealPlan)

    this.menu.getMenuItems().subscribe( res => {
      if(res) {
        this.menuItems = res;
        this.loading = false;
      } else {
        console.log('error')
      }
    })

    this.auth.userRegister$.subscribe( res => {
      if(res) {
        this.isLoggedIn = !this.isLoggedIn
      } else {
        console.log('wang');
      }
    })

  }

  openDialog() {
    new MatDialogConfig();
    this.dialog.open(RegisterComponent, {
    });
  }

}
