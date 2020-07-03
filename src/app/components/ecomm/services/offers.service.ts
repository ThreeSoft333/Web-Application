import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { SessionStorageService } from 'ngx-webstorage';
import { Offers } from '../models/offers.model';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  headers:any;
  token:string='';
  constructor(private http:HttpClient,private global:Globale,private storage:SessionStorageService) { }

  getAll(status:number){

    return this.http.get<Offers[]>(this.global.APIURL + "offers?status="+status,{ headers: this.headers});
  }

  getOfferById(id){
    return this.http.get<Offers>(this.global.APIURL + "offers/" + id,{ headers: this.headers});
  }

  CreateOffer(offer:Offers){
    
    return this.http.post(this.global.APIURL + "offers",offer,{ headers: this.headers})
  }

  UpdateOffer(offer:Offers){
    return this.http.post(this.global.APIURL + "offers/" + offer.id,offer,{ headers: this.headers})
  }


  DeleteOffer(offer:number){
    return this.http.delete(this.global.APIURL + "offers/" + offer,{ headers: this.headers})
  }
}
