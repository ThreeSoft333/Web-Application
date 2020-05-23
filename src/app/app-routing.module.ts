import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/master/main/main.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';


const routes: Routes = [
  
  {path:'',component:LoginComponent,pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'main',component: MainComponent,
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard',component:DashboardComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
