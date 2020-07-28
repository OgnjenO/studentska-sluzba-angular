import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { faEdit, faWindowClose, faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../../../_models/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;
  plusIcon = faPlusSquare;

  errorMessage;
  successMessage;

  userList;
  
  targetUser = null;

  closeResult: string;
  form: any = {};
  roles = [];

  newlyOpen = true;

  ngOnInit() {
    for(let key in Role) {
      this.roles.push(Role[key]);
    }
    
    this.adminService.getUsers().subscribe(
      data => {
        this.userList = data;
        this.targetUser = this.userList[0];
        console.log('User list : ', this.userList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('User list error : ', err);
      }
    );
  }

  openModal(target) {
    this.newlyOpen = true;
    console.log(target);
    this.targetUser = this.userList[target];
    this.form = {};
    this.form.id = this.targetUser.id;
    console.log('TargetUser : ', this.targetUser);
    console.log('Form : ', this.form);
  }

  openModalNewUser() {
    this.newlyOpen = true;
    this.targetUser = {
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
    this.form.id = this.targetUser.id;
    console.log('TargetUser : ', this.targetUser);
    console.log('Form : ', this.form);
  }

  tryToSave() {
    this.newlyOpen = false;
    return true;
  }

  onSaveModal() {
    if(!this.targetUser.id) {
      this.createUser();
    }
    else {
      this.updateUser();
    }
  }

  updateUser() {
    console.log(this.form);
    this.form.id = this.targetUser.id;
    this.adminService.updateUser(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.adminService.getUsers().subscribe(
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

  createUser() {
    console.log(this.form);
    this.form.id = this.targetUser.id;
    this.adminService.createUser(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.adminService.getUsers().subscribe(
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

  reloadPage() {
    window.location.reload();
  }
}
