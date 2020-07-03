import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { SubCategory } from '../models/subCategory.model';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }

  getAll(categoryId:number,status:number){

    return this.http.get<SubCategory[]>(this.global.APIURL + "subCategories/" + categoryId+"?status="+status,{ headers: this.headers});
  }

  getSubcategoryById(id){
    return this.http.get<SubCategory>(this.global.APIURL + "subcategory/" + id,{ headers: this.headers});
  }

  CreateSubcategory(subCategory:SubCategory){
    
    return this.http.post(this.global.APIURL + "subcategory",subCategory,{ headers: this.headers})
  }

  UpdateSubcategory(subCategory:SubCategory){
    console.log(subCategory);
    return this.http.post(this.global.APIURL + "subcategory/" + subCategory.id,subCategory,{ headers: this.headers})
  }

  upload(formdata){
    return this.http.post(this.global.APIURL + "subcategory/upload" ,formdata,{reportProgress:true , observe:'events', headers: this.headers})
  }

  DeleteSubcategory(subCategoryId:number){
    return this.http.delete(this.global.APIURL + "subcategory/" + subCategoryId,{ headers: this.headers})
  }
}
