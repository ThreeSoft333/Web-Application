import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { Color } from '../models/color';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }


  getAll(){
     
    return this.http.get<Color[]>(this.global.APIURL + "productColors",{ headers: this.headers});
  }

  getColorById(id){
    return this.http.get<Color>(this.global.APIURL + "productColors/" + id,{ headers: this.headers});
  }

  CreateColor(color:Color){
    return this.http.post(this.global.APIURL + "productColors",color,{ headers: this.headers})
  }

  UpdateColor(color:Color){
    return this.http.post(this.global.APIURL + "productColors/" + color.id,color,{ headers: this.headers})
  }

  DeleteColor(id:number){
    return this.http.delete(this.global.APIURL + "productColors/" + id,{ headers: this.headers})
  }
}
