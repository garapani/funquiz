import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'faqs',
  templateUrl: './faqs.component.html',
  styleUrls: [
    './faqs.component.css',
    './faqs.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class FaqsComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
