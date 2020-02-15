import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MatDialog, MatDialogConfig  } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mealPlan: number = 0;
  menuItems: [];
  selectedItems: any = [];
  loading: boolean = true;
  isLoggedIn: boolean = true;
  mealCounter: number = 0;
  userId: string;
  itemsRemaining: number = 0;
  mealsLeft: boolean = true;
  cartEdit: boolean = false;

  constructor(
    private menu: MenuService,
    private dialog: MatDialog,
    private auth: AuthService,
    private flash: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('UID');

    this.menu.getUserCart(this.userId).subscribe( res => {
      if(res){
        this.mealPlan = parseInt(localStorage.getItem('mealPlan'));
        this.selectedItems = res.cart;
        this.mealPlan = 0;
        this.mealsLeft = false;
        this.cartEdit = true;
      } else {
        console.log('error')
      }
    })

    // this.menu.backToMenu$.subscribe( res => {
    //   if(res){

    //     this.selectedItems = res
    //   }
    // })

    let loggedIn = localStorage.getItem('isLoggedIn')
    this.userId = localStorage.getItem('UID');
    if(loggedIn === 'true'){
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

    this.getMealPlan()


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
        console.log('err');
      }
    })

  }

  openDialog() {
    new MatDialogConfig();
    this.dialog.open(RegisterComponent, {
    });
  }

  itemSubmit(item, src){
    let newItem = { item, src}
    this.selectedItems.push(newItem)
    this.itemsRemaining-- 
    if(this.itemsRemaining === 0){
      this.mealsLeft = false;
    }
  }

  removeItem(item){

    for ( let i = 0; i < this.selectedItems.length; i++){
      if(item === this.selectedItems[i].item){
        this.selectedItems.splice(i, 1);
        this.itemsRemaining++
        this.mealPlan++
        this.mealsLeft = true;
        this.cartEdit = false;

        this.flash.show(`${item} has been removed from your cart.`, {
          cssClass: 'alert-success', timeout: 2000
        })
        return;
      } else {
        console.log('error')
      }
    }
  }

  getMealPlan(){
    if(localStorage.getItem('mealPlan') !== null){
      this.mealPlan = parseInt(localStorage.getItem('mealPlan'));
      this.itemsRemaining = this.mealPlan
    } else {
      this.mealPlan = 0;
      console.log('nope')
    }
  }

  submitCart(){
    if(this.itemsRemaining !== 0) {
      this.flash.show('It looks like you still have to choose some meals. Please pick your remaning meals before checking out.', {
        cssClass: 'alert-success', timeout: 5000
      })
    } else {
      this.menu.storeCartItems(this.selectedItems, this.userId);
      this.router.navigate(['/order-summary']);
    }
  }

}
