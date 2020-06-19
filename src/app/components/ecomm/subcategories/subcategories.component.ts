import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function dropify(): any;
declare var $: any;

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  title: string = "add Sub Category";
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
    this.title = "update Sub Category";
  }

}
