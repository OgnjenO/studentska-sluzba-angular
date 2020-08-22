import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  grades: any;

  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.token.getUser());
    
    this.userService.getSelfGrades(this.currentUser.id).subscribe(
      data => {
        this.grades = data;
        console.log('getSelfGrades : ', data);
      },
      err => {
        console.log('getSelfGrades Error : ', err);
      }
    );
  }
}
