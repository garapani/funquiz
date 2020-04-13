import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './google-adsense.component.html',
  styleUrls: [
    './google-adsense.component.css',
    '../global.css',
    '../global.mobile.css'
  ]
})
export class GoogleAdSenseComponent implements AfterViewInit {
  @Input() data = 8691029887;
  @Input() dataAdFormat = true;
  @Input() dataFullWidthResponsive = true;

  constructor() { }
  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }
}
