import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../_services/admin/class.service';
import { faEdit, faWindowClose, faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../../../_models/role';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ManageClassesComponent implements OnInit {

  constructor(private classService: ClassService) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;
  plusIcon = faPlusSquare;

  errorMessage;
  successMessage;

  classList;
  
  targetClass = null;

  closeResult: string;
  form: any = {};

  newlyOpen = true;

  ngOnInit() {
    this.classService.getClasses().subscribe(
      data => {
        console.log('getClasses data : ', data);
        this.classList = data;
        this.targetClass = this.classList ? this.classList[0] : null;
        console.log('Class list : ', this.classList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('Class list error : ', err);
      }
    );
  }

  openModal(target) {
    this.newlyOpen = true;
    console.log(target);
    this.targetClass = this.classList[target];
    this.form = {};
    this.form.id = this.targetClass.id;
    console.log('targetClass : ', this.targetClass);
    console.log('Form : ', this.form);
  }

  openModalNewClass() {
    this.newlyOpen = true;
    this.targetClass = {
      id: null,
      Classname: 'Classname',
      email: 'email@domain.com',
      firstname: 'John',
      lastname: 'Doe',
      grade: 1,
      year: 2020,
      password: '*****',
      role: 'ROLE_ADMIN'
    };
    this.form = {};
    this.form.id = this.targetClass.id;
    console.log('targetClass : ', this.targetClass);
    console.log('Form : ', this.form);
  }

  tryToSave() {
    this.newlyOpen = false;
    return true;
  }

  onSaveModal() {
    console.log(this.form);
    this.form.id = this.targetClass.id;
    if(!this.targetClass.id) {
      this.createClass();
    }
    else {
      this.updateClass();
    }
  }

  updateClass() {
    this.classService.updateClass(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.classService.getClasses().subscribe(
          data => {
            this.classList = data;
            console.log('Class list : ', this.classList);
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

  createClass() {
    console.log(this.form);
    console.log(this.classService);
    this.classService.createClass(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.classService.getClasses().subscribe(
          data => {
            this.classList = data;
            console.log('Class list : ', this.classList);
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
    console.log('Deleting : ', this.targetClass);
    this.classService.deleteClass(this.targetClass).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.classService.getClasses().subscribe(
          data => {
            this.classList = data;
            console.log('Class list : ', this.classList);
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

  reloadPage() {
    window.location.reload();
  }
}
