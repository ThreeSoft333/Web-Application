import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/master/main/main.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';

export const Approutes: Routes = [
  
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'main',component: MainComponent,
  children: [
   //{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
   { path: '',component:DashboardComponent },
   {
      path:'ecomm',
      loadChildren:() => import('./components/ecomm/ecomm.module').then(m => m.EcommModule)
   },
   {
    path:'option',
    loadChildren:() => import('./components/options/options.module').then(m => m.OptionsModule)
 }
  ]
}
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
