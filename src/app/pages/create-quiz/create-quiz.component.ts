import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../dataService/dataService';
import Consts from '../../consts';
import Question from '../../model/question';
import AllQuestions from '../../model/allQuestions';
import UserQuiz from '../../model/userQuiz';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-createquiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: [
    './create-quiz.component.css',
    './create-quiz.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ],
  providers: [DataService]
})
export class CreateQuizComponent implements OnInit {
  userId: string;
  allQuestions: Array<Question>;
  userSelectedQuestions: Array<UserQuiz>;
  selectedQuestion: Question;
  indexIterator: number;
  isImageContent: boolean;
  maxNoofQuestions: number;
  noOfSelectedQuestions: number;
  questionsList: Array<boolean>;
  accessToken: string;

  adSlotId: string;
  dataFullWidthResponsive: boolean;
  dataAdFormat: boolean;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private deviceService: DeviceDetectorService
  ) {
    console.log('constructor of createQuiz');
    this.allQuestions = new Array<Question>();
    this.selectedQuestion = new Question();
    this.userSelectedQuestions = new Array<UserQuiz>();
    this.indexIterator = 0;
    this.isImageContent = false;
    this.noOfSelectedQuestions = 0;
    this.maxNoofQuestions = 10;
    this.questionsList = new Array<boolean>(10);
  }

  ngOnInit() {
    console.log('ngOnInit of createQuizComponent');
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }

    const cookieUserId = this.dataService.getCurrentUserIdFromCookie();
    console.log(cookieUserId);
    if (cookieUserId !== null && cookieUserId !== '' && cookieUserId !== undefined) {
      this.router.navigate([Consts.ShareQuizPagePath, { QuizId: cookieUserId }]);
    }

    this.allQuestions.length = 0;
    this.userSelectedQuestions.length = 0;
    this.userId = this.activatedRoute.snapshot.params[Consts.QuizIdRouteParam];
    this.accessToken = this.activatedRoute.snapshot.params[Consts.AccessTokenRouteParam];
    console.log(this.accessToken);
    this.dataService.getAllQuestions().subscribe(temp => {
      const allQuestions: AllQuestions = temp as AllQuestions;
      if (allQuestions != null && allQuestions.questions != null) {
        const tempAllQuestions = allQuestions.questions as Array<Question>;
        if (tempAllQuestions != null && tempAllQuestions.length > 0) {
          tempAllQuestions.map(q => this.allQuestions.push(q));
          this.selectedQuestion = tempAllQuestions[this.indexIterator];
          this.indexIterator++;
          this.isImageContent = this.selectedQuestion.optionsType === 'i_s';
          console.log(this.selectedQuestion);
        }
        console.log(this.allQuestions);
      }
    });
  }

  getNextQuestion() {
    if (this.indexIterator === this.allQuestions.length) {
      this.indexIterator = 0;
    }

    this.selectedQuestion = null;
    // tslint:disable-next-line:forin
    for (const index in this.allQuestions) {
      const indexNum = +index;
      if (
        indexNum >= this.indexIterator &&
        this.userSelectedQuestions.find(q => {
          return q.questionId === this.allQuestions[indexNum].questionId;
        }) == null) {
        this.selectedQuestion = this.allQuestions[indexNum];
        this.isImageContent = this.selectedQuestion.optionsType === 'i_s';
        this.indexIterator = indexNum + 1;
        this.changeDetectorRef.detectChanges();
        return true;
      }
    }
  }

  onChangeQuestion() {
    this.getNextQuestion();
  }

  onOptionSelected(questionOptionId: string) {
    console.log(questionOptionId);

    const userQuiz: UserQuiz = new UserQuiz();
    userQuiz.optionId = questionOptionId;
    userQuiz.questionId = this.selectedQuestion.questionId;
    this.userSelectedQuestions.push(userQuiz);
    this.noOfSelectedQuestions++;
    if (this.userSelectedQuestions.length >= this.maxNoofQuestions) {
      this.onQuizCreationCompleted();
      return;
    }
    setTimeout(function () {
      this.getNextQuestion();
    }.bind(this), 100);
  }

  onQuizCreationCompleted() {
    this.selectedQuestion = null;
    this.dataService.postQuizDetails(this.userId, this.accessToken, this.userSelectedQuestions).subscribe(postResponse => {
      if (postResponse === true) {
        this.dataService.setUserDetailsInCookie(this.userId, this.accessToken);
        this.router.navigate([Consts.ShareQuizPagePath, { QuizId: this.userId }]);
      }
    });
  }

  applyStyle() {
    $('.content__div').each((i) => {
      this.applyCSS($(this), 'white');
    });
  }

  applyCSS(element, color: string) {
    element.css('background-color', color);
    element.css('margin', '10px');
    element.css('display', 'flex');
    element.css('justify-content', 'center');
    element.css('align-items', 'center');
    element.css('flex-flow', 'wrap');
    element.css('border-color', 'white');
    element.css('border-width', '0.5px');
    element.css('border-radius', '5px');
    element.css('box-shadow', 'rgba(0, 0, 255, 0.1) 0px 0px 32px 0px');

    element.hover(
      function () {
        $(this).css('background-color', 'lightblue');
        $(this).css('cursor', 'pointer');
      },
      function () {
        $(this).css('background-color', 'white');
      }
    );
  }
}
