import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare function dropify(): any;
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  title: string = "add brand";
  image = "../../../assets/images/lg.png";
  brandForm: FormGroup;
  brandName: string;
  constructor() { }

  ngOnInit(): void {
    // for upload image
    this.loaddropify();
    this.connectFormGroup();
  }

  connectFormGroup() {
    this.brandForm = new FormGroup({
      'brandName': new FormControl(this.brandName, [
        Validators.required
      ])
    });
  }

  loaddropify() {
    // $("#input-file-now").attr("data-default-file", this.image);
    $('.dropify').dropify({});

  }

  onEdit() {
    this.title = "update brand";
  }
}
