import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BrandService } from './brand.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private ngxLoader: NgxUiLoaderService) { }


}
