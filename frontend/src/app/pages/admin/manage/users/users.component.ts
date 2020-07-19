import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';
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

  errorMessage;
  successMessage;

  userList;
  
  targetUser = null;

  closeResult: string;
  form: any = {
    /* id: null,
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    grade: null,
    year: null,
    password: null,
    role: null */
  };
  roles = [];

  ngOnInit() {
    for(let key in Role) {
      this.roles.push(Role[key]);
    }
    console.log('Is this shit working ?');
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
    console.log(target);
    this.targetUser = this.userList[target];
    this.form.id = this.targetUser.id;
    console.log('TargetUser : ', this.targetUser);
    console.log('Form : ', this.form);
  }

  onSaveUser() {
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

  reloadPage() {
    window.location.reload();
  }
}
