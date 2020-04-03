import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(private deviceService: DeviceDetectorService) { }
  ngOnInit() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }
  }
}
