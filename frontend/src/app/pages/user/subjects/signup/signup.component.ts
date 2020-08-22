import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../_services/global.service';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { faPlusSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../_services/user.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SubjectSignupComponent implements OnInit {
  currentUser: any;
  subjectList: any;
  form: any = {};

  plusIcon = faPlusSquare;
  closeIcon = faWindowClose;

  shouldConfirmDelete = -1;

  constructor( private globalService: GlobalService, private token: TokenStorageService, private userService: UserService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.globalService.getSubjects().subscribe(
      data => {
        this.subjectList = data;
        console.log('getSubjects data : ', this.subjectList);
      },
      err => {
        console.log('Subject list error : ', err);
      }
    );
  }

  updateSubject() {
    this.form.id = this.currentUser.id;
    console.log('Adding subject : ', this.form); 
    this.userService.updateSelf(this.form).subscribe(
      data => {
        console.log(data);
        console.log('Updated self : ', data);
        this.shouldConfirmDelete = -1;
        this.userService.getCurrentUser().subscribe(
          data => {
            console.log('Data : ', data);
            console.log('Current : ', this.currentUser);
            this.currentUser.subjects = data.subjects;
            this.tokenStorage.saveUser(this.currentUser);
          },
          err => {
            console.log('Error fetching self : ', err);
          }
        );
      },
      err => {
        console.log('Error updating self : ', err);
      }
    );
    
    this.clearForm();
  }

  deleteSubject(subjectid) {
    if(this.shouldConfirmDelete === subjectid) {
      this.form.subject = -subjectid;
      console.log('Deleting subject : ', this.form);
      this.updateSubject();
    }
    else {
      this.shouldConfirmDelete = subjectid;
    }
  }

  clearForm() {
    this.form = {};
  }
}
