import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Consts from '../../consts';
import { DataService } from '../../dataService/dataService';
import FriendDetails from '../../model/cookies/friendsDetails';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  quizId: string;

  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
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

    this.quizId = this.activatedRoute.snapshot.params[Consts.QuizIdRouteParam];
    const localQuizId: string = this.dataService.getCurrentUserIdFromCookie();
    console.log(localQuizId);
    console.log(this.quizId);
    if (this.dataService.isDataValid(localQuizId) && localQuizId === this.quizId) {
      this.router.navigate([
        Consts.ShareQuizPagePath,
        { QuizId: this.quizId }
      ]);
    } else if (this.dataService.isQuizCompleted(this.quizId)) {
      const friendDetails: FriendDetails = this.dataService.getFriendDetailsFromCookie(this.quizId);
      if (this.dataService.isDataValid(friendDetails)) {
        this.router.navigate([
          Consts.ScorePagePath,
          {
            quizId: friendDetails.quizId,
            friendId: friendDetails.friendId,
            score: friendDetails.score
          }
        ]);
      }
    } else {
      if (this.dataService.isDataValid(this.quizId)) {
        this.router.navigate([
          Consts.FriendPagePath,
          { QuizId: this.quizId }
        ]);
      } else {
        this.router.navigate([Consts.HomePagePath]);
      }
    }
  }
}
