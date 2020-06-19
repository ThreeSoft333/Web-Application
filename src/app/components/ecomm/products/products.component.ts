import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function dropify(): any;
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title: string = "add Product";
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
    this.title = "update Product";
  }

}
