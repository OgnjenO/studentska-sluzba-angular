import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        console.log(data);
        console.log(data[0])
      },
      err => {
        console.log(err);
        this.content = err.error.message;
        this.router.navigate(['/home'], {state: {data: {'message':err.error.message}}});
      }
    );
  }
}
