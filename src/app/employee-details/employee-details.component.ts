import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../share/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeData } from '../share/interfaces/employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public id: string = "";
  public employee: EmployeeData = {};
  public loading: boolean = true;
  public employeeQuotes: string[] = [];
  public paginationNo: number[] = [];
  
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the id parameter
      const id = params.get('id');
      this.getData(id);
    });
  }

  getData(id: any) {
    this.employeeService.getEmployeeById(id).subscribe(x=> {
      console.log(x)
      if (x.length > 0) {
        this.assignData(x[0]);
        this.loading = false;
      }
      else {
        this.router.navigate(['employees'])
      }
    });
  }

  assignData(data: any) {
    console.log("CHARCTER", data)
    this.employee = {
      id: data.id,
      first: data.name.first,
      middle: data.name.middle,
      last: data.name.last,
      pfp: data.images.main,
      gender: data.gender,
      species: data.species,
      homePlanet: data.homePlanet,
      occupation: data.occupation,
      age: data.age,
      quotes: data.sayings
    }
    this.employeeQuotes = data.sayings;
    console.log("now", this.employeeQuotes)
  }

  paginationInit() {
    const no = Math.ceil(this.employeeQuotes.length / 3)
    for (let i = 1; i <= no; i++) {
      this.paginationNo.push(i);
    }
  }

}
