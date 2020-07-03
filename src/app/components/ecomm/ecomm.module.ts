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
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { CoponesService } from './services/copones.service';
import { ProductService } from './services/product.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorService } from '../options/services/color.service';
import { SizeService } from '../options/services/size.service';
import { OffersComponent } from './offers/offers.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
   
  fgsColor: '#00c292',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.ballSpinClockwiseFadeRotating,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    BrandsComponent, 
    CategoriesComponent,
    SubcategoriesComponent,
    ProductsComponent,
    ProductsdetailsComponent,
    CoponesComponent,
    OrdersComponent,
    OrderdetailsComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    EcommRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    UiSwitchModule
    
  ],
  providers: [BrandService,CategoryService,CoponesService,ColorService,SizeService],
})
export class EcommModule { }
