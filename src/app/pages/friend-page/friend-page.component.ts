import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../dataService/dataService';
import Consts from '../../consts';
import QuizResult from '../../model/quizResult';
import Friend from '../../model/friend';
import FriendDetails from '../../model/cookies/friendsDetails';

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: [
    './friend-page.component.css',
    './friend-page.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class FriendPageComponent implements OnInit {
  quizId: string;
  quizUserName: string;
  friendName: string;
  quizResults: Array<QuizResult>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    this.quizResults = new Array<QuizResult>();
  }

  ngOnInit() {
    this.quizId = this.activatedRoute.snapshot.params[Consts.QuizIdRouteParam];
    const isQuizInProgress: boolean = this.dataService.isQuizInProgress(this.quizId);
    const friendDetails: FriendDetails = this.dataService.getFriendDetailsFromCookie(this.quizId);
    if (isQuizInProgress && this.dataService.isDataValid(friendDetails)) {
      this.router.navigate([
        Consts.AnswerQuizPagePath,
        {
          QuizId: this.quizId,
          FriendId: friendDetails.friendId,
          FriendAccessToken: friendDetails.accessToken
        }
      ]);
    } else {
      this.dataService.getUserName(this.quizId).subscribe(data => {
        console.log(data);
        if (this.dataService.isDataValid(data)) {
          const temp: any = data as any;
          this.quizUserName = temp.name;
        }
      });
    }
  }

  onStartQuiz() {
    this.dataService
      .registerFriend(this.quizId, this.friendName)
      .subscribe(result => {
        if (result != null) {
          console.log(result);
          const friend = result as Friend;
          if (friend != null) {
            this.dataService.setFriendDetailsInCookie(this.quizId, friend.friendId, friend.accessToken);
            this.router.navigate([
              Consts.AnswerQuizPagePath,
              {
                QuizId: this.quizId,
                FriendId: friend.friendId,
                FriendAccessToken: friend.accessToken
              }
            ]);
          }
        }
      });
  }
}
