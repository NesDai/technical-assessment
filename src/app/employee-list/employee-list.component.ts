import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../share/services/employee.service';
import { EmployeeData, EmployeeDisplay } from '../share/interfaces/employee';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HostListener } from "@angular/core";
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router, private location: Location, private route: ActivatedRoute) {
  }

  public employees: EmployeeDisplay[] = [];
  public queryKeys: any = {firstname: "", gender: "", species: ""};
  public loading: boolean = true;
  public genders: string[] = ['Male', 'Female'];
  public species: string[] = ['Human', 'Martian', 'Robot', 'Mutant', 'Decapodian', 'Omnicronian', 'Amphibiosans'];
  public selectedName: string = ""

  ngOnInit() {
    this.getData()
  }

  private getData() {
    this.employeeService.getEmployees(this.convertQueryURL(false)).subscribe(data => {
      this.employees = [];
      this.assignData(data);
      this.loading = false;
      this.filterByName();
      console.log(this.loading)
    });
  }

  private assignData(data: any) {
    let x: EmployeeDisplay;
    for (let i = 0; i < data.length; i++) {
      x = {
        id: data[i].id,
        name: this.getName(data[i]),
        pfp: data[i].images.main,
        gender: data[i].gender,
        species: data[i].species,
        occupation: data[i].occupation,
      }
      this.employees.push(x);
    }
    console.log("assign data",this.employees)
  }

  private getName(data: any) {
    if (data.name.middle === "") {
      return data.name.first + " " + data.name.last;
    }
    return data.name.first + " " + data.name.middle + " " + data.name.last;
  }

  setQueryParam(param: string, value: string) {
    this.queryKeys[param] = value;
    this.getData();
  }

  convertQueryURL(withName = true) {
    let query = "";
    for (let key in this.queryKeys) {
        if (this.queryKeys[key] !== "" && (withName || key !== "name")) {
            query += `${key}=${this.queryKeys[key]}&`;
        }
    }
    return query;
  }

  filterByName() {
    if (this.queryKeys['name'] !== undefined) {
      this.employees = this.employees.filter(item => item.name.toLowerCase().includes(this.queryKeys['name']?.toLowerCase()));
    }
    console.log("filter byname", this.employees)
  }

  resetQuery() {
    this.selectedName = " ";
    this.queryKeys['name'] = "";
    this.queryKeys['gender'] = "";
    this.queryKeys['species'] = "";
    this.getData();
  }
}
