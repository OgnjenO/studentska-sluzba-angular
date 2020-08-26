import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../../_services/token-storage.service';
import { UserService } from '../../../../../_services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GradeListComponent implements OnInit {
  currentUser: any;
  gradesList: any;

  constructor( private token: TokenStorageService, private userService: UserService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.userService.getSelfGrades(this.currentUser.id).subscribe(
      data => {
        this.gradesList = data;
        console.log(data);
        console.log('Grade history : ', data);
      },
      err => {
        console.log('Error grade history : ', err);
      }
    );
  }

}
