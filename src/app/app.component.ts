import { Component } from '@angular/core';
import { EmployeeService } from './share/services/employee.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FullComponent } from './full/full.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'employee';
}
