import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';


import { Users } from '../../models/Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Users[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.usersService.getUsers().subscribe( users => console.log(users));
  }

}
