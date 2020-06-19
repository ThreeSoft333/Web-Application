import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {

    var body  = document.getElementsByTagName('body')[0];
    var head  = document.getElementsByTagName('head')[0];

    var script1  = document.createElement('script');
    script1.id   = "sidebarmenu";
    script1.type = 'text/javascript';
    script1.src = "sidebarmenu.js";
    
    head.appendChild(script1);

    var script  = document.createElement('script');
    script.id   = "customjs";
    script.type = 'text/javascript';
    script.src = "customjs.js";
    head.appendChild(script);

  }

}
