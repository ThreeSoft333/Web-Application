import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }


  getAll(status){
     
    return this.http.get<Category[]>(this.global.APIURL + "categories?status="+ status,{ headers: this.headers});
  }

  getCategoryById(id){
    return this.http.get<Category>(this.global.APIURL + "category/" + id,{ headers: this.headers});
  }

  CreateCategory(category:Category){
    return this.http.post(this.global.APIURL + "category",category,{ headers: this.headers})
  }

  UpdateCategory(category:Category){
    return this.http.post(this.global.APIURL + "category/" + category.id,category,{ headers: this.headers})
  }

  upload(formdata){
    return this.http.post(this.global.APIURL + "category/upload" ,formdata,{reportProgress:true , observe:'events', headers: this.headers})
  }

  DeleteCategory(id:number){
    return this.http.delete(this.global.APIURL + "category/" + id,{ headers: this.headers})
  }

}
