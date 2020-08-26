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
          beginAtZero: true
        }
      }]
    }
  };

  /* LINE CHART */

  lineChartType: string = 'line';

  lineChartData: Array<any>;
  lineChartDatasets: Array<any> = [
    { data: this.lineChartData, label: 'Grades over time', lineTension: 0 }
  ];

  lineChartLabels: Array<any> = [];

  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 155, 155, 0.2)',
      borderColor: 'rgba(255, 155, 155, 0.7)',
      borderWidth: 2,
    }
  ];

  lineChartOptions: any = {
    responsive: true
  };

  constructor( private token: TokenStorageService, private userService: UserService ) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log('Current user : ', this.token.getUser());
    this.userService.getSelfGrades(this.currentUser.id).subscribe(
      data => {
        this.gradesList = data;
        this.barChartData = [];
        this.lineChartData = [];
        for(let i in this.gradesList) {
          console.log(this.gradesList[i]);
          this.barChartData.push(this.gradesList[i].grade);
          this.lineChartData.push(this.gradesList[i].grade);
          this.lineChartLabels.push(this.gradesList[i].createDateTime.split("T")[0]);
          console.log(this.barChartData);
          
          this.barChartDatasets = [
            { data: this.barChartData, label: 'Grades' }
          ];
          this.lineChartDatasets = [
            { data: this.lineChartData, label: 'Grades over time' }
          ];
        }
        console.log(data);
        console.log('Grade history : ', data);
      },
      err => {
        console.log('Error grade history : ', err);
      }
    );
  }

  generateData() {

  }

}
