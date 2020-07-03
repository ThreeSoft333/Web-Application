import { Injectable } from '@angular/core';
import { Size } from '../models/size';
import { HttpClient } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }


  getAll(CatgId){
    return this.http.get<Size[]>(this.global.APIURL + "productSize?categoryId=" + CatgId,{ headers: this.headers});
  }

  getSizeById(id){
    return this.http.get<Size>(this.global.APIURL + "productSize/" + id,{ headers: this.headers});
  }

  CreateSize(size:Size){
    return this.http.post(this.global.APIURL + "productSize",size,{ headers: this.headers})
  }

  UpdateSize(size:Size){
    return this.http.post(this.global.APIURL + "productSize/" + size.id,size,{ headers: this.headers})
  }

  DeleteSize(id:number){
    return this.http.delete(this.global.APIURL + "productSize/" + id,{ headers: this.headers})
  }
}
