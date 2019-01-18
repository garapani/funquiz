import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "about-us",
  templateUrl: "./aboutus.component.html",
  styleUrls: [
    "./aboutus.component.css",
    "./aboutus.component.mobile.css",
    "../../global.css",
    "../../global.mobile.css"
  ]
})
export class AboutUsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
}
