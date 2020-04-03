import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import Consts from '../../consts';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.css', './score-page.component.mobile.css', '../../global.css', '../../global.mobile.css']
})
export class ScorePageComponent implements OnInit {
  friendId: string;
  score: string;
  quizId: string;
  percentage: string;
  gaugeType = 'semi';
  gaugeLabel = '';
  gaugeAppendText = '%';
  thick = 20;
  gaugeValue = 0;
  thresholdConfig = {
    '0': { color: 'red' },
    '50': { color: 'orange' },
    '75.5': { color: 'green' }
  };
  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }
    
    this.friendId = this.activatedRoute.snapshot.params['friendId'];
    this.quizId = this.activatedRoute.snapshot.params['quizId'];
    this.score = this.activatedRoute.snapshot.params['score'];
    // this.dataService.getUserQuizResults(this.quizId).subscribe(result => {
    //   console.log(result);
    // });
    console.log(this.friendId);
    console.log(this.quizId);
    console.log(this.score);
    this.gaugeValue = (+this.score / 10) * 100;
  }

  onShowOtherScores() {
    this.router.navigate([Consts.ScoresPagePath, { quizId: this.quizId }]);
  }

  onCreateQuiz() {
    this.router.navigate([Consts.HomePagePath]);
  }
}
