import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';



const optionroutes: Routes = [
  {path:'colors',component:ColorComponent},
  {path:'sizes',component:SizeComponent},
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(optionroutes)
  ]
})

export class OptionsRoutingModule { }
