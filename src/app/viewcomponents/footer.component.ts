import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funquiz-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.css',
    './footer.component.mobile.css',
    '../global.css',
    '../global.mobile.css'
  ]
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
}
