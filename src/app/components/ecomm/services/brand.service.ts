import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Brand } from '../models/brand.model';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { 

    this.token = this.storage.retrieve('token');
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  }

  getAll(){
    return this.http.get<Brand[]>(this.global.APIURL + "brands",{ headers: this.headers});
  }

  getBrandById(id){
    return this.http.get<Brand>(this.global.APIURL + "brands/" + id,{ headers: this.headers});
  }

  CreateBrand(brand:Brand){
    return this.http.post(this.global.APIURL + "brands",brand,{ headers: this.headers})
  }

  UpdateBrand(brand:Brand){
    return this.http.post(this.global.APIURL + "brands/" + brand.id,brand,{ headers: this.headers})
  }

  upload(formdata){
    return this.http.post(this.global.APIURL + "brand/upload" ,formdata,{reportProgress:true , observe:'events', headers: this.headers})
  }

  DeleteBrand(id:number){
    return this.http.delete(this.global.APIURL + "brands/" + id,{ headers: this.headers})
  }

}
