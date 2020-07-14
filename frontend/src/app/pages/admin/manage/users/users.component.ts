import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../_services/admin.service';
import { faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private adminService: AdminService,) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;

  errorMessage;

  userList;

  ngOnInit() {
    console.log('Is this shit working ?');
    this.adminService.getUsers().subscribe(
      data => {
        this.userList = data;
        console.log('User list : ', this.userList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('User list error : ', err);
      }
    );
  }

}
