import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpEventType } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SubcategoryService } from '../services/SubCategory.service';
import { SubCategory } from '../models/subCategory.model';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';

declare function dropify(): any;
declare function alertSuccess(message): any;
declare function alertError(message): any;

declare var $: any;

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {

  title: string = "add SubCategory";

  SubCategoryForm: FormGroup;
  Categories:Category[] = [];
  SubCategories: SubCategory[] = []
  SubCategory: SubCategory = {} as SubCategory;
  SubCategory_id: number;
  updateMode: boolean = false;
  imagPath: string;
  psc: number = 1;
  filter: string = '';
  change = true;
  selectedCategory:number;

  @ViewChild('file') private file: ElementRef;
  @ViewChild('status') private status: ElementRef;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private SubCategoryservice: SubcategoryService,
    private CategoryService:CategoryService,
     private global: Globale,
      private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    // for upload image

    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    this.loaddropify();
    this.getCategory()
    
  }

  connectFormGroup() {

    this.SubCategoryForm = new FormGroup({
      
      'Category': new FormControl(this.SubCategory.categoryId, [
        Validators.required
      ]),
      'arabicName': new FormControl(this.SubCategory.arabicName, [
        Validators.required
      ]),
      'englishName': new FormControl(this.SubCategory.englishName, [
        Validators.required
      ]),
     
      'Catgimg': new FormControl(this.SubCategory.imgUrl, [

      ]),

    });
  }

  onChange(value: boolean) {
    
    this.change = value;
  
  }

  getCategory() {
    this.CategoryService.getAll(1).subscribe(data => {
      this.Categories = data
      
      this.ngxLoader.stop();
    })
  }

  getSubCategoryByCategory(){
    this.getSubCategory(this.selectedCategory,1);
  }
    
  getSubCategory(CategoryId:number,status:number) {
    this.SubCategoryservice.getAll(CategoryId,status).subscribe(data => {
      this.SubCategories = data
     
      console.log( this.SubCategories)
      this.ngxLoader.stop();
    })
  }

  loaddropify() {
    // $("#input-file-now").attr("data-default-file", this.image);

    $('.dropify').dropify({});

  }

  onEdit(item) {

    console.log(item)
    this.SubCategory_id = item.id;

    this.SubCategoryForm.reset();

    this.SubCategoryForm.patchValue({
      'Category':item.categoryId,
      'arabicName': item.arabicName,
      'englishName': item.englishName
    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update SubCategory";
    this.updateMode = true;
  }

  saveChanges(files) {

    this.ngxLoader.start();

    if (files.length != 0) {

      this.uploadFile(files);

    }
    else {

      this.SubCategory.categoryId = this.SubCategoryForm.value['Category'];
      this.SubCategory.arabicName = this.SubCategoryForm.value['arabicName']
      this.SubCategory.englishName = this.SubCategoryForm.value['englishName']

      

      if (this.change == true)
        this.SubCategory.status = 1;
      else
        this.SubCategory.status = 0;

        

      if (!this.updateMode) {
        this.createSubCategory();
      }
      else {
        this.SubCategory.id = this.SubCategory_id;
        this.updateSubCategory();
      }
    }
  }

  createSubCategory() {

    this.SubCategoryservice.CreateSubcategory(this.SubCategory).subscribe(data => {
      alertSuccess("SubCategory added successfully");
      this.getSubCategory(this.selectedCategory,1);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateSubCategory() {

    this.SubCategoryservice.UpdateSubcategory(this.SubCategory).subscribe(data => {
      alertSuccess("SubCategory Update successfully");
      this.getSubCategory(this.selectedCategory,1);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteSubCategory(id) {

    this.ngxLoader.start();
    this.SubCategoryservice.DeleteSubcategory(id).subscribe(data => {
      alertSuccess("SubCategory Deleted successfully");
      this.getSubCategory(this.selectedCategory,1);
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
    this.SubCategoryForm.reset();
    this.file.nativeElement.value = null;

    $(".dropify-clear").click();

    //this.statusChecked = true;

    console.log(this.SubCategoryForm)
  }

  uploadFile(files) {

    if (files.length == 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.SubCategoryservice.upload(formData).subscribe(event => {

      if (event.type == HttpEventType.Response) {
        if (event['body']) {

          this.SubCategory = {} as SubCategory;

          this.SubCategory.categoryId = this.SubCategoryForm.value['Category'];
          this.SubCategory.arabicName = this.SubCategoryForm.value['arabicName']
          this.SubCategory.englishName = this.SubCategoryForm.value['englishName']
          this.SubCategory.imgUrl = this.imagPath + event['body']['dbPath']

          if (this.change == true)
            this.SubCategory.status = 1;
          else
            this.SubCategory.status = 0;

          if (!this.updateMode) {

            this.createSubCategory();
          }
          else {
            this.SubCategory.id = this.SubCategory_id;
            this.updateSubCategory();
          }
        }
      }
    })

  }

  onDelete(id) {
    this.SubCategory_id = id;
  }

  confirmDelete() {
    this.deleteSubCategory(this.SubCategory_id)
  }

}
