import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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
