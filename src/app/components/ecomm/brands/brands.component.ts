import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.model';
import { HttpEventType } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare function dropify(): any;
declare function setdropify(): any;
declare function alertSuccess(message): any;
declare function alertError(message): any;
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})


export class BrandsComponent implements OnInit {


  title: string = "add brand";

  brandForm: FormGroup;
  brandName: string;
  brands: Brand[] = []
  brand: Brand = {} as Brand;
  brand_id:number;
  updateMode: boolean = false;
  imagPath: string;
  pb: number = 1;
  filter: string = '';
  @ViewChild('file') private file: ElementRef;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private brandService: BrandService, private global: Globale, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    // for upload image

    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    this.getBrand();
    this.loaddropify();

    
  }

  connectFormGroup() {
    this.brandForm = new FormGroup({
      'arabicName': new FormControl(this.brand.arabicName, [
        Validators.required
      ]),
      'englishName': new FormControl(this.brand.englishName, [
        Validators.required
      ]),
      'brandimg': new FormControl(this.brand.imgUrl, [
        
      ]),

    });
  }

  getBrand() {
    this.brandService.getAll().subscribe(data => {
      this.brands = data
      this.ngxLoader.stop();
    })
  }

  loaddropify() {
    // $("#input-file-now").attr("data-default-file", this.image);

    $('.dropify').dropify({});

  }

  setdropify() {

    // this.file.nativeElement.dataset.defaultFile = "https://localhost:44304/Resources/Images/download.png";
    //this.file.nativeElement.value = "https://localhost:44304/Resources/Images/download.png";

    // $("#input-file-now").addClass('dropify');
    // $("#input-file-now").attr("data-height", 300);
    $("#input-file-now").attr("data-default-file", "https://localhost:44304/Resources/Images/download.png");
    // $('.dropify').dropify({});

    // console.log(this.file);
    dropify();
    // $("#input-file-now").attr("data-default-file",'https://localhost:44304/Resources/Images/download.png');
    $('.dropify').dropify({});
  }

  onEdit(item) {

this.brand_id = item.id;

    this.brandForm.reset();

    this.brandForm.patchValue({
      'arabicName': item.arabicName,
      'englishName': item.englishName
    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update brand";
    this.updateMode = true;
  }

  saveChanges(files) {

    this.ngxLoader.start();

    if (files.length != 0) {
      console.log(this.file);
      this.uploadFile(files);

    }
    else {
      this.brand.arabicName = this.brandForm.value['arabicName']
      this.brand.englishName = this.brandForm.value['englishName']
      if (!this.updateMode) {
        this.createBrand();
      }
      else {
        this.brand.id = this.brand_id;
        this.updateBrand();
      }
    }
  }

  createBrand() {

    this.brandService.CreateBrand(this.brand).subscribe(data => {
      alertSuccess("brand added successfully");
      this.getBrand();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateBrand() {

    this.brandService.UpdateBrand(this.brand).subscribe(data => {
      alertSuccess("brand Update successfully");
      this.getBrand();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteBrand(id) {
    this.ngxLoader.start();
    this.brandService.DeleteBrand(id).subscribe(data => {
      alertSuccess("brand Deleted successfully");
      this.getBrand();
    },
      error => {
        alertError(error.error.message);
        console.log(error)
        this.ngxLoader.stop();
      })
  }

  CreateNew() {
    this.loaddropify();
    this.updateMode = false;
    this.brandForm.reset();
this.file.nativeElement.value=null;

$(".dropify-clear").click(); 




  }

  uploadFile(files) {

    if (files.length == 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.brandService.upload(formData).subscribe(event => {

      if (event.type == HttpEventType.Response) {
        if (event['body']) {

          this.brand = {} as Brand;
          this.brand.arabicName = this.brandForm.value['arabicName']
          this.brand.englishName = this.brandForm.value['englishName']
          this.brand.imgUrl = this.imagPath + event['body']['dbPath']
          if (!this.updateMode) {

            this.createBrand();
          }
          else {
            this.brand.id = this.brand_id;
            this.updateBrand();
          }
        }
      }
    })

  }
     
  onDelete(id){
   this.brand_id=id;
  }

  confirmDelete(){
    this.deleteBrand(this.brand_id)
  }
}
