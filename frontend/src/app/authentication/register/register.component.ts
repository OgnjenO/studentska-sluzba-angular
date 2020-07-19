import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../../_models/role';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  roles = [];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    for(let key in Role) {
      this.roles.push(Role[key]);
    }
    this.form.role = 0;
    console.log(this.form);
    console.log(Role);
    console.log(this.roles);
    this.authService.canRegister().subscribe(
      data => {
        if (!data) {
          this.router.navigate(['/home'], { state: { data: { 'message': 'Registration is currently disabled' } } });
        }
      },
      err => {
        this.router.navigate(['/home'], { state: { data: { 'message': 'Registration is currently disabled' } } });
      }
    );
  }

  onSubmit() {
    console.log(this.form);
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
