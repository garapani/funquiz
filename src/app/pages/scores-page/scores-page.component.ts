import { Component, OnInit } from '@angular/core';
import { DataService } from '../../dataService/dataService';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import QuizResult from '../../model/quizResult';
import FriendQuizResult from '../../model/friendQuizResult';
import Consts from '../../consts';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-scores-page',
  templateUrl: './scores-page.component.html',
  styleUrls: [
    './scores-page.component.css',
    './scores-page.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class ScoresPageComponent implements OnInit {
  quizId: string;
  quizName: string;
  friendsResults: Array<FriendQuizResult>;

  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.friendsResults = new Array<FriendQuizResult>();
  }

  ngOnInit() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.dataService.getUserQuizResults(this.quizId).subscribe(result => {
      console.log(result);
      const quizResult = result as QuizResult;
      if (quizResult != null && quizResult.results != null) {
        this.quizName = quizResult.name;
        quizResult.results.map(r => this.friendsResults.push(r));
      }
    });
  }

  onCreateQuiz() {
    this.router.navigate([Consts.HomePagePath]);
  }
}
