import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../../../_services/token-storage.service';
import { UserService } from '../../../../../_services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class GradeListComponent implements OnInit {
  currentUser: any;
  gradesList: any;

  /* BAR CHART */
  
  barChartType: string = 'bar';

  barChartData: Array<any>;
  barChartDatasets: Array<any> = [
    { data: this.barChartData, label: 'Grades' }
  ];

  barChartLabels: Array<any> = ['10', '9', '8', '7', '6', 'Failed', 'Ungraded'];

  barChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 205, 50, 0.2)',
        'rgba(0, 155, 100, 0.2)',
        'rgba(0, 105, 150, 0.2)',
        'rgba(0, 55, 200, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(255, 255, 0, 0.2)',
      ],
      borderColor: [
        'rgba(0, 255, 0, 1)',
        'rgba(0, 205, 50, 1)',
        'rgba(0, 155, 100, 1)',
        'rgba(0, 105, 150, 1)',
        'rgba(0, 55, 200, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 255, 0, 1)',
      ],
      borderWidth: 2,
    }
  ];

  barChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };

  /* LINE CHART */

  lineChartType: string = 'line';

  lineChartData;
  lineChartDatasets: Array<any> = [
    { data: this.lineChartData, label: 'Grades over time', lineTension: 0 },
    { data: this.lineChartData, label: 'Grades over time', lineTension: 0 }
  ];

  lineChartLabels: Array<any> = [];

  lineChartColors: Array<any> = [
    {
      borderColor: 'rgba(255, 255, 0, .7)',
      backgroundColor: 'rgba(255, 255, 0, 0)',
      borderWidth: 2,
    },
    {
      borderColor: 'rgba(0, 255, 255, .7)',
      backgroundColor: 'rgba(255, 255, 0, 0)',
      borderWidth: 2,
    }
  ];

  lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 4
        }
      }]
    }
  };

  constructor( private token: TokenStorageService, private userService: UserService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.userService.getSelfGrades(this.currentUser.id).subscribe(
      data => {
        this.gradesList = data;
        console.log(this.gradesList);
        this.barChartData = [];

        for(let i=10; i>=5; i--) {
          this.barChartData.push(this.gradesList.filter(x => x.grade==i).length);
        }

        this.barChartData.push(this.gradesList.filter(x => x.grade<5).length);

        this.barChartDatasets = [
          { data: this.barChartData, label: 'Grades' }
        ];

        this.lineChartData = {grade: [], average: []};
        let gradeSum = 0;
        let gradeNum = 0;
        for(let i in this.gradesList) {
          if(this.gradesList[i].grade >= 5) {
            gradeSum += this.gradesList[i].grade;
            gradeNum++;
            this.lineChartData.grade.push(this.gradesList[i].grade);
            this.lineChartData.average.push(gradeSum/gradeNum);
            this.lineChartLabels.push(this.gradesList[i].createDateTime.split("T")[0]);
          }
        }

        this.lineChartDatasets = [
          { data: this.lineChartData.grade, label: 'Grades over time' },
          { data: this.lineChartData.average, label: 'Average over time' }
        ];

        console.log(this.lineChartData);
      },
      err => {
        console.log('Error grade history : ', err);
      }
    );
  }

  generateData() {

  }

}
