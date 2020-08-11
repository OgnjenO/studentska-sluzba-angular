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
export class ClassSignupComponent implements OnInit {
  currentUser: any;
  classList: any;
  form: any = {};

  plusIcon = faPlusSquare;
  closeIcon = faWindowClose;

  shouldConfirmDelete = -1;

  constructor( private globalService: GlobalService, private token: TokenStorageService, private userService: UserService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.globalService.getClasses().subscribe(
      data => {
        this.classList = data;
        console.log('getClasses data : ', this.classList);
      },
      err => {
        console.log('Class list error : ', err);
      }
    );
  }

  updateClass() {
    this.form.id = this.currentUser.id;
    console.log('Adding class : ', this.form); 
    this.userService.updateSelf(this.form).subscribe(
      data => {
        console.log(data);
        console.log('Updated self : ', data);
        this.userService.getCurrentUser().subscribe(
          data => {
            console.log('Data : ', data);
            console.log('Current : ', this.currentUser);
            this.currentUser.classes = data.classes;
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

  deleteClass(classid) {
    if(this.shouldConfirmDelete === classid) {
      this.form.class = -classid;
      this.updateClass();
    }
    else {
      this.shouldConfirmDelete = classid;
    }
  }

  clearForm() {
    this.form = {};
  }
}
