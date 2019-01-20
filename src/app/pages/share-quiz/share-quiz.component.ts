import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  FacebookService,
  UIParams,
  InitParams,
  UIResponse
} from 'ngx-facebook';
import Consts from '../../consts';
import { DataService } from '../../dataService/dataService';
import QuizResult from '../../model/quizResult';
import FriendQuizResult from '../../model/friendQuizResult';

@Component({
  selector: 'app-share-quiz',
  templateUrl: './share-quiz.component.html',
  styleUrls: [
    './share-quiz.component.css',
    './share-quiz.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class ShareQuizComponent implements OnInit {
  userId: string;
  quizUrl: string;
  noOneAnswered: boolean;
  friendsResults: Array<FriendQuizResult>;
  userIdCookie: string;
  canHideDelete: boolean;
  accessTokenCookie: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private fb: FacebookService,
    private san: DomSanitizer
  ) {
    this.noOneAnswered = true;
    this.friendsResults = new Array<FriendQuizResult>();
    this.canHideDelete = true;
  }

  ngOnInit() {
    const initParams: InitParams = {
      appId: Consts.FacebookAppId,
      xfbml: true,
      version: 'v2.8'
    };
    this.fb.init(initParams);

    this.userId = this.activatedRoute.snapshot.params[Consts.QuizIdRouteParam];
    this.quizUrl = Consts.InviteUrl + this.userId;
    this.accessTokenCookie = this.dataService.getCurrentUSerAccessTokenFromCookie();
    this.dataService
      .isUserValid(this.userId, this.accessTokenCookie)
      .subscribe(response => {
        const responseFromServer: boolean = response as boolean;
        if (responseFromServer === true) {
          this.canHideDelete = false;
        }
      });

    this.dataService
      .getUserQuizResults(this.userId)
      .subscribe(quizResultsResponse => {
        console.log(quizResultsResponse);
        const quizResults = quizResultsResponse as QuizResult;
        if (quizResults != null) {
          if (quizResults.results != null && quizResults.results.length > 0) {
            this.noOneAnswered = false;
            quizResults.results.map(r => this.friendsResults.push(r));
          }
        }
      });
  }

  onCopyLink() {
    try {
      const element = document.getElementById(
        'quiz__url__input'
      ) as HTMLInputElement;
      const range = document.createRange();
      range.selectNodeContents(element);

      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(range);

      element.setSelectionRange(0, 999999);
      document.execCommand('copy');

      const copyText = document.getElementById(
        'quiz__url__input'
      ) as HTMLInputElement;
      copyText.select();
      document.execCommand('copy');

      const tooltip = document.getElementById('tooltipId');
      if (tooltip != null) {
        tooltip.innerHTML = 'Copied';
      }
    } catch (error) {
      console.log(error);
    }
  }

  onDelete(result: FriendQuizResult) {
    if (confirm('Are you sure you want to delete?')) {
      this.dataService
        .deleteResult(this.userId, result.friendId, this.accessTokenCookie)
        .subscribe(deleteResult => {
          console.log(deleteResult);
        });
      this.friendsResults.splice(
        this.friendsResults.findIndex(o => o.friendId === result.friendId),
        1
      );

      if (this.friendsResults.length === 0) {
        this.noOneAnswered = true;
      }
    }
  }

  onShareOnWhatsapp() {
    let whatsappUrl: string =
      'https://api.whatsapp.com/send?text=How much do you know about me? Answer my FunQuiz ' +
      this.quizUrl;
    if (this.dataService.isAndroid()) {
      whatsappUrl =
        'whatsapp://send?text=' +
        'How much do you know about me? Answer my FunQuiz ' +
        this.quizUrl;
    } else if (this.dataService.isIOS()) {
      whatsappUrl =
        'https://api.whatsapp.com/send?text=How much do you know about me? Answer my FunQuiz ' +
        this.quizUrl;
    }

    this.san.bypassSecurityTrustUrl(whatsappUrl);
    window.open(whatsappUrl);
  }

  onShareOnFacebook() {
    const params: UIParams = {
      href: this.quizUrl,
      method: 'share',
      quote: 'How much do you know about me? Answer my FunQuiz '
    };

    this.fb
      .ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

  onShareOnMessenger() {
    const shareUrl =
      'fb-messenger://share/?link=' +
      this.quizUrl +
      '&app_id=' +
      Consts.FacebookAppId +
      '&title=How much do you know about me? Answer my FunQuiz ';
    this.san.bypassSecurityTrustUrl(shareUrl);
    window.open(shareUrl);
  }
}
