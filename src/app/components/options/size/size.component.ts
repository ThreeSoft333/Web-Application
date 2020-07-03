import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Size } from '../models/size';
import { SizeService } from '../services/size.service';
import { CategoryService } from '../../ecomm/services/category.service';
import { Category } from '../../ecomm/models/Category.model';


declare function alertSuccess(message): any;
declare function alertError(message): any;

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  title: string = "add Size";

  SizeForm: FormGroup;
  Categories:Category[] =[];
  Sizes: Size[] = []
  Size: Size = {} as Size;
  Size_id: number;
  updateMode: boolean = false;
  imagPath: string;
  psz: number = 1;
  filter: string = '';
  change = true;
  Sizepic = "#74efa9";
  selectedCategory:number;
  @ViewChild('closeModal') private closeModal: ElementRef;

  constructor(
    private Sizeservice: SizeService,
    private CategoryService:CategoryService, 
    private global: Globale, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    
    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    
   this.Sizepic = "#74efa9";
this.getCategory();
  }

  connectFormGroup() {
    

    this.SizeForm = new FormGroup({
      'size': new FormControl(this.Size.size, [
        Validators.required
      ]),
      'unit': new FormControl(this.Size.unit, [
        Validators.required
      ]),
      'Category': new FormControl(this.Size.categoryId, [
        Validators.required
      ]),
     
    });
  }


  getCategory() {
    this.CategoryService.getAll(1).subscribe(data => {
      this.Categories = data
      
      this.ngxLoader.stop();
    })
  }

  getSize(selectCatg) {
    this.Sizeservice.getAll(selectCatg).subscribe(data => {
      this.Sizes = data
      this.ngxLoader.stop();
    })
  }

  getSizeByCategory(){
    this.ngxLoader.start();
    this.getSize(this.selectedCategory)
  }


  onEdit(item) {

    this.Size_id = item.id;

    this.SizeForm.reset();

    this.SizeForm.patchValue({
      'size': item.size,
      'unit': item.unit,
      'Category':item.categoryId
    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update Size";
    this.updateMode = true;
  }

  saveChanges() {

    this.ngxLoader.start();

      this.Size.size = this.SizeForm.value['size']
      this.Size.unit = this.SizeForm.value['unit']
      this.Size.categoryId = this.SizeForm.value['Category']

      if (!this.updateMode) {
        this.createSize();
      }
      else {
        this.Size.id = this.Size_id;
        this.updateSize();
      }
    
  }

  createSize() {
console.log(this.Size)
    this.Sizeservice.CreateSize(this.Size).subscribe(data => {
      alertSuccess("Size added successfully");
      this.getSize(this.selectedCategory);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateSize() {

    this.Sizeservice.UpdateSize(this.Size).subscribe(data => {
      alertSuccess("Size Update successfully");
      this.getSize(this.selectedCategory);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteSize(id) {
    this.ngxLoader.start();
    this.Sizeservice.DeleteSize(id).subscribe(data => {
      alertSuccess("Size Deleted successfully");
      this.getSize(this.selectedCategory);
    },
      error => {
        alertError(error.error.message);
        console.log(error)
        this.ngxLoader.stop();
      })
  }

  CreateNew() {
    this.updateMode = false;
    this.SizeForm.reset();
  }

  onDelete(id) {
    this.Size_id = id;
  }

  confirmDelete() {
    this.deleteSize(this.Size_id)
  }

}
