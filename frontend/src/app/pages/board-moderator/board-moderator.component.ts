import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getModeratorBoard().subscribe(
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
