import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpEventType } from '@angular/common/http';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from '../services/Product.service';
import { Product } from '../models/Product.model';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';
import { SubCategory } from '../models/subCategory.model';
import { SubcategoryService } from '../services/SubCategory.service';
import { ColorService } from '../../options/services/color.service';
import { SizeService } from '../../options/services/size.service';
import { Color } from '../../options/models/color';
import { Size } from '../../options/models/size';

declare function dropify(): any;
declare function alertSuccess(message): any;
declare function alertError(message): any;
declare function switcher(): any;
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  title: string = "add Product";

  ProductForm: FormGroup;
  CategoriesSearch:Category[]=[];
  Categories:Category[]=[];
  subCategoriesSearch:SubCategory[] = [];
  subCategories:SubCategory[] = [];
  Products: Product[] = []
  colors:Color[] = [];
  sizes:Size[] = [];
  Product: Product = {} as Product;
  Product_id: number;
  updateMode: boolean = false;
  imagPath: string;
  ppr: number = 1;
  filter: string = '';
  change = true;
  selectedCategorySearch:number;
  selectedCategory:number;
  selectedSubCategorySearch:number;

  @ViewChild('file') private file: ElementRef;
  @ViewChild('status') private status: ElementRef;
  @ViewChild('closeModal') private closeModal: ElementRef;
  constructor(private Productservice: ProductService,
    private SubCategoryService:SubcategoryService,
    private CategoryService:CategoryService,
    private colorService:ColorService,
    private sizeService:SizeService,
     private global: Globale,
      private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    // for upload image

    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    this.loaddropify();
    this.getCategory()
    this.getColors();
  }

  connectFormGroup() {

    this.ProductForm = new FormGroup({
      
      'arabicName': new FormControl(this.Product.arabicName, [
        Validators.required
      ]),
      'englishName': new FormControl(this.Product.englishName, [
        Validators.required
      ]),
      'arabicDesc': new FormControl(this.Product.arabicDescription, [
        
      ]),
      'englishDesc': new FormControl(this.Product.englishDescription, [
        
      ]),
      'price': new FormControl(this.Product.price, [
        Validators.required
      ]),
      'salePrice': new FormControl(this.Product.salePrice, [
        
      ]),
      'Condition': new FormControl(this.Product.condition, [
        
      ]),
      'Material': new FormControl(this.Product.material, [
        
      ]),
      'colorId': new FormControl(this.Product.colorId, [
        
      ]),
      'sizeId': new FormControl(this.Product.sizeId, [
        
      ]),
     
      'quantity': new FormControl(this.Product.quantity, [
        Validators.required
      ]),
      'subCategory': new FormControl(this.Product.subCategoryId, [
        Validators.required
      ]),
      'Category': new FormControl(this.selectedCategory, [
        Validators.required
      ]),
      
      'Prodimg': new FormControl(this.Product.imgUrl, [

      ]),

    });
  }

  onChange(value: boolean) {
    
    this.change = value;
  
  }

  getSubCategoryByCategoryIdSearch(){
this.getSubCategorySearch();
  }

  getCategory() {
    this.CategoryService.getAll(1).subscribe(data => {
      this.Categories = data;
      this.CategoriesSearch = data;
      this.ngxLoader.stop();
    })
  }

  getColors() {
    this.colorService.getAll().subscribe(data => {
      this.colors = data
      this.ngxLoader.stop();
    })
  }

  getsizes(){
    
    this.sizeService.getAll(this.selectedCategory).subscribe(data =>{
      this.sizes = data
    })
  }


  CategoryChange(){
    this.getsizes();
    this.getSubCategory();
  }

  getSubCategorySearch() {
    this.SubCategoryService.getAll(this.selectedCategorySearch,1).subscribe(data => {
      this.subCategoriesSearch = data
      
      this.ngxLoader.stop();
    })
  }

  getSubCategory() {
    this.SubCategoryService.getAll(this.selectedCategory,1).subscribe(data => {
      this.subCategories = data
      
      this.ngxLoader.stop();
    })
  }

  getProductBySubCategory(){
    this.getProduct(this.selectedSubCategorySearch,1);
  }
    
  getProduct(CategoryId:number,status:number) {
    this.Productservice.getAll(CategoryId,status).subscribe(data => {
      this.Products = data
      this.ngxLoader.stop();
    })
  }

  loaddropify() {
    // $("#input-file-now").attr("data-default-file", this.image);

    $('.dropify').dropify({});

  }

  onEdit(item) {

    this.Product_id = item.id;
    this.ProductForm.reset();

    this.ProductForm.patchValue({
      'Category':item.subCategory.categoryId,
    });

    this.CategoryChange();

    this.ProductForm.patchValue({
      'subCategory':item.subCategoryId,
      'arabicName': item.srabicName,
      'englishName': item.englishName,
      'arabicDesc': item.srabicDescription,
      'englishDesc': item.englishDescription,
      'price': item.price,
      'salePrice': item.salePrice,
      'Condition': item.condition,
      'Material': item.material,
      'colorId': item.colorId,
      'sizeId': item.sizeId,
      'quantity': item.quantity

    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update Product";
    this.updateMode = true;
  }

  saveChanges(files) {

    this.ngxLoader.start();

    if (files.length != 0) {

      this.uploadFile(files);

    }
    else {

      this.Product.subCategoryId = this.ProductForm.value['subCategory'];
      this.Product.arabicName = this.ProductForm.value['arabicName']
      this.Product.englishName = this.ProductForm.value['englishName']
      this.Product.arabicDescription = this.ProductForm.value['arabicDesc']
      this.Product.englishDescription = this.ProductForm.value['englishDesc']
      this.Product.price = +this.ProductForm.value['price']
      this.Product.salePrice = +this.ProductForm.value['salePrice']
      this.Product.material = this.ProductForm.value['Material']
      this.Product.condition = this.ProductForm.value['Condition']
      this.Product.quantity = +this.ProductForm.value['quantity']

      if(this.ProductForm.value['colorId'] !=undefined){
        this.Product.colorId = this.ProductForm.value['colorId'];
      }
      else{
        this.Product.colorId = null
      }
      if(this.ProductForm.value['sizeId'] !=undefined){
        this.Product.sizeId = this.ProductForm.value['sizeId'];
      }
      else{
        this.Product.sizeId = null
      }
      

      if (this.change == true)
        this.Product.status = 1;
      else
        this.Product.status = 0;

      if (!this.updateMode) {
        this.createProduct();
      }
      else {
        this.Product.id = this.Product_id;
        this.updateProduct();
      }
    }
  }

  createProduct() {

    this.Productservice.CreateProduct(this.Product).subscribe(data => {
      alertSuccess("Product added successfully");
      this.getProduct(this.selectedCategory,1);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateProduct() {

    this.Productservice.UpdateProduct(this.Product).subscribe(data => {
      alertSuccess("Product Update successfully");
      this.getProduct(this.selectedCategory,1);
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteProduct(id) {

    this.ngxLoader.start();
    this.Productservice.DeleteProduct(id).subscribe(data => {
      alertSuccess("Product Deleted successfully");
      this.getProduct(this.selectedCategory,1);
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
    this.ProductForm.reset();
    this.file.nativeElement.value = null;

    $(".dropify-clear").click();

    //this.statusChecked = true;

    
  }

  uploadFile(files) {

    if (files.length == 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.Productservice.upload(formData).subscribe(event => {

      if (event.type == HttpEventType.Response) {
        if (event['body']) {

          this.Product = {} as Product;

      this.Product.subCategoryId = this.ProductForm.value['subCategory'];
      this.Product.arabicName = this.ProductForm.value['arabicName']
      this.Product.englishName = this.ProductForm.value['englishName']
      this.Product.arabicDescription = this.ProductForm.value['arabicDesc']
      this.Product.englishDescription = this.ProductForm.value['englishDesc']
      this.Product.price = +this.ProductForm.value['price']
      this.Product.salePrice = +this.ProductForm.value['salePrice']
      this.Product.material = this.ProductForm.value['Material']
      this.Product.condition = this.ProductForm.value['Condition']
      this.Product.quantity = +this.ProductForm.value['quantity']

      if(this.ProductForm.value['colorId'] !=undefined){
        this.Product.colorId = this.ProductForm.value['colorId'];
      }
      else{
        this.Product.colorId = null
      }
      if(this.ProductForm.value['sizeId'] !=undefined){
        this.Product.sizeId = this.ProductForm.value['sizeId'];
      }
      else{
        this.Product.sizeId = null
      }

          this.Product.imgUrl = this.imagPath + event['body']['dbPath'];


          if (this.change == true)
            this.Product.status = 1;
          else
            this.Product.status = 0;

          if (!this.updateMode) {

            this.createProduct();
          }
          else {
            this.Product.id = this.Product_id;
            this.updateProduct();
          }
        }
      }
    })

  }

  onDelete(id) {
    this.Product_id = id;
  }

  confirmDelete() {
    this.deleteProduct(this.Product_id)
  }

}
