import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig  } from '@angular/material';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  homePage:boolean = true;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    const invoiceModal = this.dialog.open(LoginComponent, {
      panelClass: 'custom-dialog-container'
    });
  }

  close() {
    this.dialogRef.close();
  }

}
