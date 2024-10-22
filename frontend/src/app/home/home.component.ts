import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        if(history.state.data) this.content = history.state.data.message;
        else this.content = '';
        console.log(history.state.data);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
