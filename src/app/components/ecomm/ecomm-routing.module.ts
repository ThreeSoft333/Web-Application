import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductsComponent } from './products/products.component';
import { ProductsdetailsComponent } from './productsdetails/productsdetails.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { CoponesComponent } from './copones/copones.component';



const ecommroutes: Routes = [
{path:'brands',component:BrandsComponent},
{path:'categories',component:CategoriesComponent},
{path:'subCategory',component:SubcategoriesComponent},
{path:'products',component:ProductsComponent},
{path:'productDetails',component:ProductsdetailsComponent},
{path:'orders',component:OrdersComponent},
{path:'orderDetails',component:OrderdetailsComponent},
{path:'copones',component:CoponesComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ecommroutes)
  ]
})
export class EcommRoutingModule { }
