export class Coupon{
    id:number;
    arabicName:string;
    englishName:string;
    type:number; // 1 - fixed 2 - percent
    status:number; // 1 - Active 0 - Inactive
    quantity:number;
    amount:number;
    percentage:number;
    createBy:string;
    updateBy:string;
  
}