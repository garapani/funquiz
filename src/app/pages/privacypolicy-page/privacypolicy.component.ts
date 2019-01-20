import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'privacy-policy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: [
    './privacypolicy.component.css',
    './privacypolicy.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
