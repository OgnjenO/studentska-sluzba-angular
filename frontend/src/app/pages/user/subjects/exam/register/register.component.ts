import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../../_services/global.service';
import { TokenStorageService } from '../../../../../_services/token-storage.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../../_services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterSubjectComponent implements OnInit {
  currentUser: any;
  form: any = {};

  plusIcon = faPlusSquare;

  targetSubject;

  constructor( private globalService: GlobalService, private token: TokenStorageService, private userService: UserService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
  }

  openModal(target) {
    console.log(target);
    this.targetSubject = target;
    this.form = {};
    this.form.userid = this.currentUser.id;
    this.form.subjectid = this.currentUser.subjects[this.targetSubject].id;
    console.log('Form : ', this.form);
  }

  registerExam() {
    this.userService.registerExam(this.form).subscribe(
      data => {
        console.log(data);
        console.log('Register exam : ', data);
      },
      err => {
        console.log('Error register exam : ', err);
      }
    );
  }
}
