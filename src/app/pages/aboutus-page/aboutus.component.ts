import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'about-us',
  templateUrl: './aboutus.component.html',
  styleUrls: [
    './aboutus.component.css',
    './aboutus.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class AboutUsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
