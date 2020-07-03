import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color/color.component';
import { SizeComponent } from './size/size.component';
import { OptionsRoutingModule } from './options-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorService } from './services/color.service';
import { SizeService } from './services/size.service';
import { ProductService } from '../ecomm/services/Product.service';

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
    ColorComponent,
    SizeComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ColorPickerModule
  ],
  providers: [ColorService,SizeService],
})
export class OptionsModule { }
