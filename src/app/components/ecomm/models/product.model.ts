import { SubCategory } from './subCategory.model';

export class Product {

    id:number;
    arabicName:string;
    englishName:string;
    arabicDescription:string;
    englishDescription:string;
    price:number;
    salePrice:number;
    imgUrl:string;
    condition:string;
    material:string;
    quantity:number;
    status:number;
    CreatedBy:string;
    UpdatedBy:string;
    subCategoryId:number;
    colorId:number;
    sizeId:number;
    subCategory:SubCategory;
}