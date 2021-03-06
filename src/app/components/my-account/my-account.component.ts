import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/Users';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userId: string;
  usersData: any;
  userData: any;
  isEdit: boolean = false;
  editH5: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private user: UsersService,
  ) { }

  ngOnInit() {

    this.userId = this.route.snapshot.params['id']

    this.user.getUser(this.userId).subscribe( res => {
      this.usersData = res;
      this.userData = this.usersData;
      this.loading = false;

    })
  }

  updatePersonalInfo(form: NgForm, id){
    console.log(form)
    id = this.userId 
    this.user.updateUserInfo(form, id);
    this.isEdit = !this.isEdit;
  }

  onEdit(){
    this.isEdit = !this.isEdit;
  }

}
