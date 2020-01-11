import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';


import { Users } from '../../models/Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onRegister(){
    console.log(this.firstName, this.lastName, this.email, this.password)
  }

}
