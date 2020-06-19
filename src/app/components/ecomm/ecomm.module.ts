import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { ProductsComponent } from './products/products.component';
import { ProductsdetailsComponent } from './productsdetails/productsdetails.component';
import { CoponesComponent } from './copones/copones.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { EcommRoutingModule } from './ecomm-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BrandsComponent, 
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    ProductsdetailsComponent,
    CoponesComponent,
    OrdersComponent,
    OrderdetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EcommRoutingModule
  ]
})
export class EcommModule { }
