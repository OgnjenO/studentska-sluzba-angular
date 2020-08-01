import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../_services/admin/user.service';
import { faEdit, faWindowClose, faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../../../_models/role';
import { ClassService } from 'src/app/_services/admin/class.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService: UserService, private classService: ClassService) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;
  plusIcon = faPlusSquare;
  listIcon = faList;

  errorMessage;
  successMessage;

  userList;
  classList;
  
  targetUser = -1;
  newUser = null;

  closeResult: string;
  form: any = {};
  roles = [];

  newlyOpen = true;

  shouldConfirmDelete = false;

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

    this.classService.getClasses().subscribe(
      data => {
        console.log('Data : ', data);
        this.classList = data;
        console.log('Class list : ', this.userList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('Class list error : ', err);
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
    console.log('Deleting : ', this.targetUser);
    this.userService.deleteUser(this.targetUser).subscribe(
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

  deleteClass(classid) {
    if(this.shouldConfirmDelete) {
      this.form.class = -classid;
      console.log('Should delete : ', classid, this.form);
      this.userService.updateUser(this.form).subscribe(
        data => {
          console.log(data);
          this.successMessage = data.message;
          this.userService.getUser(this.form.id).subscribe(
            data => {
              this.shouldConfirmDelete = false;
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
      this.shouldConfirmDelete = true;
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
