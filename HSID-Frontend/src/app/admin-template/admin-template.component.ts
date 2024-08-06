import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  subMenus: { [key: string]: boolean } = {
    hsid: false,
    msid: false
  };

  constructor(public authService: AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }

  showUser() {
    this.snackBar.open('Check your profile section!', '✓', {
      duration: 10000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  toggleSubMenu(menu: 'hsid' | 'msid') {
    this.subMenus[menu] = !this.subMenus[menu];
  }
}
