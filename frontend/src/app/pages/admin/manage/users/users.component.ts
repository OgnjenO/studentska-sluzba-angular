import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../_services/admin/user.service';
import { faEdit, faWindowClose, faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../../../_models/role';
import { SubjectService } from 'src/app/_services/admin/subject.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService: UserService, private subjectService: SubjectService) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;
  plusIcon = faPlusSquare;
  listIcon = faList;

  errorMessage;
  successMessage;

  userList;
  subjectList;
  
  targetUser = -1;
  newUser = null;

  closeResult: string;
  form: any = {};
  roles = [];

  newlyOpen = true;

  shouldConfirmDelete = -1;

  ngOnInit() {
    for(let key in Role) {
      this.roles.push(Role[key]);
    }
    
    this.userService.getUsers().subscribe(
      data => {
        console.log('Data : ', data);
        this.userList = data;
        this.targetUser = this.userList[0];
        console.log('User list : ', this.userList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('User list error : ', err);
      }
    );

    this.subjectService.getSubjects().subscribe(
      data => {
        console.log('Data : ', data);
        this.subjectList = data;
        console.log('Subject list : ', this.subjectList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('Subject list error : ', err);
      }
    );
  }

  openModal(target) {
    this.newUser = null;
    this.newlyOpen = true;
    console.log(target);
    this.targetUser = target;
    this.form = {};
    this.form.id = this.userList[target].id;
    console.log('TargetUser : ', this.userList[target]);
    console.log('Form : ', this.form);
  }

  openModalNewUser() {
    this.newlyOpen = true;
    this.newUser = {
      id: null,
      username: 'username',
      email: 'email@domain.com',
      firstname: 'John',
      lastname: 'Doe',
      grade: 1,
      year: 2020,
      password: '*****',
      role: 'ROLE_ADMIN'
    };
    this.form = {};
    this.form.id = this.newUser.id;
    console.log('Newuser : ', this.newUser);
    console.log('Form : ', this.form);
  }

  tryToSave() {
    this.newlyOpen = false;
    return true;
  }

  onSaveModal() {
    console.log('Save modal : ', this.form);
    if(this.newUser) {
      this.createUser();
    }
    else {
      this.form.id = this.userList[this.targetUser].id;
      this.updateUser();
    }
  }

  updateUser() {
    this.userService.updateUser(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.userService.getUser(this.form.id).subscribe(
          data => {
            this.userList[this.targetUser] = data;
            console.log('User list : ', this.userList);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  createUser() {
    this.userService.createUser(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.userService.getUsers().subscribe(
          data => {
            this.userList = data;
            console.log('User list : ', this.userList);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  deleteUser() {
    console.log('Deleting : ', this.userList[this.targetUser].id);
    this.userService.deleteUser(this.userList[this.targetUser].id).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.userService.getUsers().subscribe(
          data => {
            this.userList = data;
            console.log('User list : ', this.userList);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  deleteSubject(subjectid) {
    if(this.shouldConfirmDelete === subjectid) {
      this.form.subject = -subjectid;
      console.log('Should delete : ', subjectid, this.form);
      this.userService.updateUser(this.form).subscribe(
        data => {
          console.log(data);
          this.successMessage = data.message;
          this.userService.getUser(this.form.id).subscribe(
            data => {
              this.shouldConfirmDelete = -1;
              this.userList[this.targetUser] = data;
              console.log('User list : ', this.userList);
            },
            err => {
              this.errorMessage = err.error.message;
            }
          );
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
    else {
      this.shouldConfirmDelete = subjectid;
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
