import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../models/Category.model';
import { HttpEventType } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../services/category.service';

declare function alertSuccess(message): any;
declare function alertError(message): any;
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  title: string = "add Category";

  CategoryForm: FormGroup;
  Categories: Category[] = []
  category: Category = {} as Category;
  Category_id: number;
  updateMode: boolean = false;
  imagPath: string;
  pc: number = 1;
  filter: string = '';
  change = true;

  @ViewChild('file') private file: ElementRef;
  @ViewChild('status') private status: ElementRef;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private Categoryservice: CategoryService, private global: Globale, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    // for upload image

    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    this.getCategory();
    this.loaddropify();
    
  }

  connectFormGroup() {
    

    this.CategoryForm = new FormGroup({
      'arabicName': new FormControl(this.category.arabicName, [
        Validators.required
      ]),
      'englishName': new FormControl(this.category.englishName, [
        Validators.required
      ]),
     
      'Catgimg': new FormControl(this.category.imageUrl, [

      ]),

    });
  }

  onChange(value: boolean) {
    
    this.change = value;
  
  }

  getCategory() {
    this.Categoryservice.getAll(1).subscribe(data => {
      console.log(data);
      this.Categories = data
      this.ngxLoader.stop();
    })
  }

  loaddropify() {
    // $("#input-file-now").attr("data-default-file", this.image);

    $('.dropify').dropify({});

  }

  onEdit(item) {

    this.Category_id = item.id;

    this.CategoryForm.reset();

    this.CategoryForm.patchValue({
      'arabicName': item.arabicName,
      'englishName': item.englishName
    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update Category";
    this.updateMode = true;
  }

  saveChanges(files) {

    this.ngxLoader.start();

    if (files.length != 0) {

      this.uploadFile(files);

    }
    else {
      this.category.arabicName = this.CategoryForm.value['arabicName']
      this.category.englishName = this.CategoryForm.value['englishName']
      if (this.change == true)
        this.category.status = 1;
      else
        this.category.status = 0;

      if (!this.updateMode) {
        this.createCategory();
      }
      else {
        this.category.id = this.Category_id;
        this.updateCategory();
      }
    }
  }

  createCategory() {

    this.Categoryservice.CreateCategory(this.category).subscribe(data => {
      alertSuccess("Category added successfully");
      this.getCategory();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateCategory() {

    this.Categoryservice.UpdateCategory(this.category).subscribe(data => {
      alertSuccess("Category Update successfully");
      this.getCategory();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteCategory(id) {
    this.ngxLoader.start();
    this.Categoryservice.DeleteCategory(id).subscribe(data => {
      alertSuccess("Category Deleted successfully");
      this.getCategory();
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
    this.CategoryForm.reset();
    this.file.nativeElement.value = null;

    $(".dropify-clear").click();

    //this.statusChecked = true;

    console.log(this.CategoryForm)
  }

  uploadFile(files) {

    if (files.length == 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.Categoryservice.upload(formData).subscribe(event => {

      if (event.type == HttpEventType.Response) {
        if (event['body']) {

          this.category = {} as Category;
          this.category.arabicName = this.CategoryForm.value['arabicName']
          this.category.englishName = this.CategoryForm.value['englishName']
          this.category.imageUrl = this.imagPath + event['body']['dbPath']

          if (this.change == true)
            this.category.status = 1;
          else
            this.category.status = 0;

          if (!this.updateMode) {

            this.createCategory();
          }
          else {
            this.category.id = this.Category_id;
            this.updateCategory();
          }
        }
      }
    })

  }

  onDelete(id) {
    this.Category_id = id;
  }

  confirmDelete() {
    this.deleteCategory(this.Category_id)
  }

 
}
