import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { Coupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CoponesService {

  headers:any;
  token:string='';

  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }

  getAll(){
    return this.http.get<Coupon[]>(this.global.APIURL + "coupon",{ headers: this.headers});
  }

  getBrandById(id){
    return this.http.get<Coupon>(this.global.APIURL + "coupon/" + id,{ headers: this.headers});
  }

  CreateBrand(coupon:Coupon){
    return this.http.post(this.global.APIURL + "coupon",coupon,{ headers: this.headers})
  }

  UpdateBrand(coupon:Coupon){
    return this.http.post(this.global.APIURL + "coupon/" + coupon.id,coupon,{ headers: this.headers})
  }

  DeleteBrand(id:number){
    return this.http.delete(this.global.APIURL + "coupon/" + id,{ headers: this.headers})
  }
}
