import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  hasAccess = false;

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        this.router.navigate(['/home'], {state: {data: {'message':err.error.message}}});
      }
    );
  }

}
