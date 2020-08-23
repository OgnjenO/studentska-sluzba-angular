import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../../_services/global.service';
import { TokenStorageService } from '../../../../../_services/token-storage.service';
import { faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../../_services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterSubjectComponent implements OnInit {
  currentUser: any;
  gradesList: any;
  form: any = {};

  plusIcon = faPlusSquare;
  listIcon = faList;

  targetSubject;

  constructor( private globalService: GlobalService, private token: TokenStorageService, private userService: UserService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.updateGradeList();
  }

  updateGradeList() {
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
        this.updateGradeList();
        console.log(data);
        console.log('Register exam : ', data);
      },
      err => {
        console.log('Error register exam : ', err);
      }
    );
  }
}
