import { Component, OnInit,EventEmitter, AfterViewInit, ViewChild } from '@angular/core';

declare function navbarminimalize(): any;

@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent implements OnInit,AfterViewInit {


  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    
  }

  toggleSidebar(){
    
     let body = document.getElementsByTagName('body')[0];
     //body.classList.toggle('mini-sidebar');
// console.log(body);

//      if(body.className.includes('mini-sidebar')){
       
//       body.classList.remove("mini-sidebar");
//      }
//      else{
       
//          body.classList.add("mini-sidebar");   
//      }
    // switch(body.className){
    //   case 'fixed-layout skin-megna':
    //     body.classList.remove("fixed-layout");
    //     body.classList.remove("skin-megna");
    //     body.classList.add("fixed-layout");
    //     body.classList.add("skin-megna");
    //     body.classList.add("mini-sidebar");
    //     break;
    //     case 'fixed-layout skin-megna mini-sidebar':
    //       body.classList.remove("fixed-layout");
    //       body.classList.remove("skin-megna");
    //       body.classList.remove("mini-sidebar");
    //       body.classList.add("fixed-layout");
    //       body.classList.add("skin-megna");
          
    //     break;
    // }

     navbarminimalize();
  }
}
