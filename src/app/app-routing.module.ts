import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './full/full.component';
import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const routes: Routes = [
  { path: '', component: DrawerComponent},
  { path: 'employees', component: FullComponent, children: [
    {
       path: 'details/:id',
       component: EmployeeDetailsComponent,
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
