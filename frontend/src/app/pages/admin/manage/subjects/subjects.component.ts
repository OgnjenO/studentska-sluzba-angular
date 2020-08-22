import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../../_services/admin/subject.service';
import { faEdit, faWindowClose, faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../../../../_models/role';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class ManageSubjectsComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  editIcon = faEdit;
  closeIcon = faWindowClose;
  plusIcon = faPlusSquare;

  errorMessage;
  successMessage;

  subjectList;
  
  targetSubject = null;

  closeResult: string;
  form: any = {};

  newlyOpen = true;

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(
      data => {
        console.log('getSubjects data : ', data);
        this.subjectList = data;
        this.targetSubject = this.subjectList ? this.subjectList[0] : null;
        console.log('Subject list : ', this.subjectList);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log('Subject list error : ', err);
      }
    );
  }

  openModal(target) {
    this.newlyOpen = true;
    console.log(target);
    this.targetSubject = this.subjectList[target];
    this.form = {};
    this.form.id = this.targetSubject.id;
    console.log('targetSubject : ', this.targetSubject);
    console.log('Form : ', this.form);
  }

  openModalNewSubject() {
    this.newlyOpen = true;
    this.targetSubject = {
      id: null,
      Subjectname: 'Subjectname',
      email: 'email@domain.com',
      firstname: 'John',
      lastname: 'Doe',
      grade: 1,
      year: 2020,
      password: '*****',
      role: 'ROLE_ADMIN'
    };
    this.form = {};
    this.form.id = this.targetSubject.id;
    console.log('targetSubject : ', this.targetSubject);
    console.log('Form : ', this.form);
  }

  tryToSave() {
    this.newlyOpen = false;
    return true;
  }

  onSaveModal() {
    console.log(this.form);
    this.form.id = this.targetSubject.id;
    if(!this.targetSubject.id) {
      this.createSubject();
    }
    else {
      this.updateSubject();
    }
  }

  updateSubject() {
    this.subjectService.updateSubject(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.subjectService.getSubjects().subscribe(
          data => {
            this.subjectList = data;
            console.log('Subject list : ', this.subjectList);
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

  createSubject() {
    console.log(this.form);
    console.log(this.subjectService);
    this.subjectService.createSubject(this.form).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.subjectService.getSubjects().subscribe(
          data => {
            this.subjectList = data;
            console.log('Subject list : ', this.subjectList);
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
    console.log('Deleting : ', this.targetSubject);
    this.subjectService.deleteSubject(this.targetSubject).subscribe(
      data => {
        console.log(data);
        this.successMessage = data.message;
        this.subjectService.getSubjects().subscribe(
          data => {
            this.subjectList = data;
            console.log('Subject list : ', this.subjectList);
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
