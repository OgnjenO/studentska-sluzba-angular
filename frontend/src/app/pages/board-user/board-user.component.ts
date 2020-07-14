import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
        console.log(data);
      },
      err => {
        console.log(err);
        this.content = err.error.message;
        this.router.navigate(['/home'], {state: {data: {'message':err.error.message}}});
      }
    );
  }
}
