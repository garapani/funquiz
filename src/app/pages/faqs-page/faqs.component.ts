import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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
  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(private deviceService: DeviceDetectorService) { }
  ngOnInit() {
    console.log('ngOnInit of createQuizComponent');
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }
  }
}
