import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private elementRef: ElementRef,@Inject(DOCUMENT) private doc) {
    
   }

  ngOnInit(): void {
    
    // "src/assets/dist/css/pages/login-register-lock.css",
    //           "src/assets/dist/css/pages/ecommerce.css",
    //           "src/assets/assets/node_modules/morrisjs/morris.css",
    //           "src/assets/dist/css/style.min.css",

    // let link1: HTMLLinkElement = this.doc.createElement('link');
    // link1.setAttribute('rel', 'amphtml');
    // link1.setAttribute('href', 'assets/dist/css/pages/login-register-lock.css');
    // this.doc.head.appendChild(link1);

    // let link2: HTMLLinkElement = this.doc.createElement('link');
    // link2.setAttribute('rel', 'amphtml');
    // link2.setAttribute('href', 'assets/dist/css/pages/ecommerce.css');
    // this.doc.head.appendChild(link2);

    // let link3: HTMLLinkElement = this.doc.createElement('link');
    // link3.setAttribute('rel', 'amphtml');
    // link3.setAttribute('href', 'assets/dist/css/style.min.css');
    // this.doc.head.appendChild(link3);

    // var s1 = document.createElement("script");
    // s1.type = "text/javascript";
    // s1.src = "assets/dist/js/custom.min.js";
    // this.elementRef.nativeElement.appendChild(s1);

    // var s2 = document.createElement("script");
    // s2.type = "text/javascript";
    // s2.src = "assets/customscript.js";
    // this.elementRef.nativeElement.appendChild(s2);

    var body  = document.getElementsByTagName('body')[0];
    var head  = document.getElementsByTagName('head')[0];

    var script  = document.createElement('script');
    script.id   = "customjs";
    script.type = 'text/javascript';
    script.src = "customjs.js";
    // body.className="rtls"
    head.appendChild(script);
        

    
    var script1  = document.createElement('script');
    script1.id   = "sidebarmenu";
    script1.type = 'text/javascript';
    script1.src = "sidebarmenu.js";
    // body.className="rtls"
    head.appendChild(script1);


    

    // var s2 = document.createElement("script");
    // s2.type = "text/javascript";
    // s2.src = "assets/assets/node_modules/popper/popper.min.js";
    // this.elementRef.nativeElement.appendChild(s2);

    // var s3 = document.createElement("script");
    // s3.type = "text/javascript";
    // s3.src = "assets/assets/node_modules/bootstrap/dist/js/bootstrap.min.js";
    // this.elementRef.nativeElement.appendChild(s3);

  }

}
