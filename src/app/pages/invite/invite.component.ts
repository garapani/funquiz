import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Consts from '../../consts';
import { DataService } from '../../dataService/dataService';
import FriendDetails from '../../model/cookies/friendsDetails';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  quizId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
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
