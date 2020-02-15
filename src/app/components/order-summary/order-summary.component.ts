import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderSummary;
  userId: string;
  cart: string;
  cartTotal: number;
  userData;
  userDataTrue: boolean = false;

  constructor(private router: Router, private menu: MenuService, private user: UsersService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('UID');

    this.user.getUser(this.userId).subscribe( res => {
      if(res){
        this.userData = res;
        this.userDataTrue = true;
      } else {
        console.log('error')
      }
    })

    this.menu.getUserCart(this.userId).subscribe( res => {
      if(res){
        this.orderSummary = res.cart;

        if(this.orderSummary.length === 4){
          this.cartTotal = 56;
        } else if(this.orderSummary.length === 8){
          this.cartTotal = 96;
        } else if(this.orderSummary.length === 12){
          this.cartTotal = 120;
        } else if(this.orderSummary.length === 16){
          this.cartTotal = 128;
        } else {
          console.log('error')
        }
      } 
    })
  }

  editMyCart(){
    localStorage.removeItem('mealPlan')
    localStorage.setItem('mealPlan', '0')
    this.menu.editCart(this.orderSummary);
  }

}
