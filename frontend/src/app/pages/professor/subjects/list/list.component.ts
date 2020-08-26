import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../_services/global.service';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { faPlusSquare, faList, faCheckSquare, faHistory } from '@fortawesome/free-solid-svg-icons';
import { SubjectService } from '../../../../_services/professor/subject.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class SubjectListComponent implements OnInit {
  currentUser: any;
  gradesList: any;
  form: any = {};
  gradeForm: any = {};

  plusIcon = faPlusSquare;
  listIcon = faList;
  checkIcon = faCheckSquare;
  historyIcon = faHistory;

  targetExam = -1;
  targetSubject;

  isGrading = false;

  constructor( private globalService: GlobalService, private token: TokenStorageService, private subjectService: SubjectService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.currentUser);
    this.updateGradeList();
  }

  updateGradeList() {
    this.subjectService.getAllUngradedExams(this.currentUser.id).subscribe(
      data => {
        this.gradesList = data;
        for(let i=0; i<this.gradesList.length; i++) {
          this.gradesList[i].newGrade = null;
          this.gradesList[i].success = false;
          this.gradesList[i].failure = false;
          this.gradesList[i].waiting = false;
        }
        console.log(data);
        console.log('Grade list : ', this.gradesList);
      },
      err => {
        console.log('Error list history : ', err);
      }
    );
  }

  openModalHistory(target) {
    this.isGrading = false;
    this.openModal(target);
  }

  openModalGrade(target) {
    this.isGrading = true;
    this.openModal(target);
  }

  openModal(target) {
    console.log(target);
    this.targetSubject = target;
    this.form = {};
    this.form.userid = this.currentUser.id;
    this.form.subjectid = this.currentUser.subjects[this.targetSubject].id;
    console.log('Form : ', this.form);
  }

  isGradeButtonDisabled(i) {
    return this.gradesList[i].success || this.gradesList[i].newGrade === null
  }

  tryToGrade(i) {
    if(this.gradesList[i].failure) {
      this.gradesList[i].failure = false;
      this.gradesList[i].newGrade = null;
      this.targetExam = -1;
      return;
    }

    if(this.targetExam === -1 || this.targetExam !== i) {
      this.targetExam = i;
      return;
    }

    console.log('Submitting new grade : ', this.gradesList[i]);

    this.gradesList[i].waiting = true;
    this.targetExam = -1;
    this.subjectService.gradeExam({id: this.gradesList[i].id, grade: this.gradesList[i].newGrade}).subscribe(
      data => {
        console.log('Response data : ', data);
        this.gradesList[i].success = true;
        this.gradesList[i].waiting = false;
        this.gradesList[i].grade = this.gradesList[i].newGrade;
        console.log('gradesList : ', this.gradesList);
      },
      err => {
        console.log('Error : ', err);
        this.gradesList[i].failure = true;
        this.gradesList[i].waiting = false;
        console.log('gradesList : ', this.gradesList);
      }
    );
  }
}
