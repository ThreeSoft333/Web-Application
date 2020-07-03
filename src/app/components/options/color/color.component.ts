import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Globale } from 'src/assets/Global';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ColorService } from '../services/color.service';
import { Color } from '../models/color';


declare function alertSuccess(message): any;
declare function alertError(message): any;
declare var $: any;

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  title: string = "add Color";

  ColorForm: FormGroup;
  colors: Color[] = []
  color: Color = {} as Color;
  color_id: number;
  updateMode: boolean = false;
  imagPath: string;
  pcl: number = 1;
  filter: string = '';
  change = true;
  colorpic = "#74efa9";
  @ViewChild('closeModal') private closeModal: ElementRef;

  constructor(private Colorservice: ColorService, private global: Globale, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    // for upload image

    this.ngxLoader.start();
    this.imagPath = this.global.imgPath;

    this.connectFormGroup();
    this.getColor();
    
   this.colorpic = "#74efa9";

  }

  connectFormGroup() {
    

    this.ColorForm = new FormGroup({
      'arabicName': new FormControl(this.color.arabicName, [
        Validators.required
      ]),
      'englishName': new FormControl(this.color.englishName, [
        Validators.required
      ]),
      'colorpic': new FormControl(this.colorpic, [
        
      ]),
     
    });
  }



  getColor() {
    this.Colorservice.getAll().subscribe(data => {
      this.colors = data
      this.ngxLoader.stop();
    })
  }


  onEdit(item) {

    this.color_id = item.id;

    this.ColorForm.reset();

    this.ColorForm.patchValue({
      'arabicName': item.arabicName,
      'englishName': item.englishName,
      'hexCode':item.hexCode
    });

    //alert(this.global.imgPath + item.imgUrl)

    this.title = "update Color";
    this.updateMode = true;
  }

  saveChanges() {

    this.ngxLoader.start();

      this.color.arabicName = this.ColorForm.value['arabicName']
      this.color.englishName = this.ColorForm.value['englishName']
      this.color.hexCode = this.colorpic

      if (!this.updateMode) {
        this.createColor();
      }
      else {
        this.color.id = this.color_id;
        this.updateColor();
      }
    
  }

  createColor() {
console.log(this.color)
    this.Colorservice.CreateColor(this.color).subscribe(data => {
      alertSuccess("Color added successfully");
      this.getColor();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  updateColor() {

    this.Colorservice.UpdateColor(this.color).subscribe(data => {
      alertSuccess("Color Update successfully");
      this.getColor();
      this.closeModal.nativeElement.click();
    },
      error => {
        alertError(error.error.message);
        console.log(error);
        this.ngxLoader.stop();
      })
  }

  deleteColor(id) {
    this.ngxLoader.start();
    this.Colorservice.DeleteColor(id).subscribe(data => {
      alertSuccess("Color Deleted successfully");
      this.getColor();
    },
      error => {
        alertError(error.error.message);
        console.log(error)
        this.ngxLoader.stop();
      })
  }

  CreateNew() {
    this.updateMode = false;
    this.ColorForm.reset();
  }

  onDelete(id) {
    this.color_id = id;
  }

  confirmDelete() {
    this.deleteColor(this.color_id)
  }

  changeColor(value){
this.colorpic = value;
  }

}
