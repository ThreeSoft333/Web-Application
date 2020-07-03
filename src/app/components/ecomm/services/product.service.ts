import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers:any;
  token:string='';
  
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }

  getAll(subCatgId:number,status:number){
    return this.http.get<Product[]>(this.global.APIURL + "productsbycategory/" + subCatgId +"?status="+status,{ headers: this.headers});
  }
  

  getProductById(id){
    return this.http.get<Product>(this.global.APIURL + "product/" + id,{ headers: this.headers});
  }

  CreateProduct(product:Product){
    console.log(product);
    return this.http.post(this.global.APIURL + "product",product,{ headers: this.headers})
  }

  UpdateProduct(product:Product){
    return this.http.post(this.global.APIURL + "product/" + product.id,product,{ headers: this.headers})
  }

  DeleteProduct(id:number){
    return this.http.delete(this.global.APIURL + "product/" + id,{ headers: this.headers})
  }

  upload(formdata){
    return this.http.post(this.global.APIURL + "product/upload" ,formdata,{reportProgress:true , observe:'events', headers: this.headers})
  }


}
