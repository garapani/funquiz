import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import Consts from '../../consts';
import Option from '../../model/option';
import UserQuestion from '../../model/userQuestion';
import { DataService } from '../../dataService/dataService';
import UserQuiz from '../../model/userQuiz';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: [
    './answer-quiz.component.css',
    './answer-quiz.component.mobile.css',
    '../../global.css',
    '../../global.mobile.css'
  ]
})
export class AnswerQuizComponent implements OnInit {
  userId: string;
  quizId: string;
  friendId: string;
  friendAccessToken: string;
  quizQuestions: Array<UserQuestion>;
  selectedQuestion: UserQuestion;
  indexIterator: number;
  maxNoofQuestions: number;
  noOfSelectedQuestions: number;
  questionsList: Array<boolean>;
  correctOption: string;
  isUserProvidedAnswer: boolean;
  userSelectedOptions: Array<UserQuiz>;
  score: number;
  isImageContent: boolean;
  isAlreadyAnswered: boolean;

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
    this.quizQuestions = new Array<UserQuestion>();
    this.selectedQuestion = new UserQuestion();
    this.indexIterator = -1;
    this.noOfSelectedQuestions = 0;
    this.maxNoofQuestions = 10;
    this.questionsList = new Array<boolean>(10);
    this.isUserProvidedAnswer = false;
    this.userSelectedOptions = new Array<UserQuiz>();
    this.score = 0;
  }

  ngOnInit() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isMobile || isTablet) {
      this.adSlotId = '3528633975';
      this.dataAdFormat = false;
      this.dataFullWidthResponsive = false;
    }
    
    this.quizId = this.activatedRoute.snapshot.params[Consts.QuizIdRouteParam];
    this.friendId = this.activatedRoute.snapshot.params[Consts.FriendIdRouteParam];
    this.friendAccessToken = this.activatedRoute.snapshot.params[
      Consts.FriendAccessTokenRouteParam
    ];
    this.dataService.getUserQuestions(this.quizId).subscribe(questions => {
      if (questions != null) {
        const tempAllQuestions = questions as Array<UserQuestion>;
        this.indexIterator = -1;
        tempAllQuestions.map(q => this.quizQuestions.push(q));
        this.getNextQuestion();
      }
    });
  }

  getNextQuestion() {
    this.isAlreadyAnswered = false;
    this.changeDetectorRef.detectChanges();
    if (this.noOfSelectedQuestions === this.maxNoofQuestions) {
      this.onQuizCompleted();
      return;
    }
    // should go to top of the page to see the next question.
    try {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    } catch (error) {
      console.log(error);
    }
    this.indexIterator++;
    this.selectedQuestion = this.quizQuestions[this.indexIterator];
    this.isImageContent =
      this.selectedQuestion.optionType === 'i_s' ? true : false;
    this.applyStyle();

    const completedQuizzes: UserQuiz[] = this.dataService.getDetailsOfCompletedQuiz(this.quizId);
    if (this.dataService.isDataValid(completedQuizzes) && completedQuizzes.length > 0) {
      const userSelectedOptions: UserQuiz[] = completedQuizzes.filter(q => q.questionId === this.selectedQuestion.questionId);
      if (this.dataService.isDataValid(userSelectedOptions) && userSelectedOptions.length > 0) {
        this.isAlreadyAnswered = true;
        this.onOptionSelected(userSelectedOptions[0].optionId, 1000);
      }
    }
  }

  onOptionSelected(userSelectedOptionId: string, timeForAnimtion: number = 1000) {
    this.changeDetectorRef.detectChanges();
    this.isUserProvidedAnswer = true;
    const userQuiz = new UserQuiz();
    userQuiz.questionId = this.selectedQuestion.questionId;
    userQuiz.optionId = userSelectedOptionId;
    this.userSelectedOptions.push(userQuiz);
    this.correctOption = this.selectedQuestion.optionId;
    this.dataService
      .validateQuiz(
        this.quizId,
        this.friendId,
        this.friendAccessToken,
        this.userSelectedOptions
      );
    if (
      this.selectedQuestion.optionId === userSelectedOptionId
    ) {
      this.questionsList[this.noOfSelectedQuestions] = true;
      this.score++;
    } else {
      this.questionsList[this.noOfSelectedQuestions] = false;
    }
    this.dataService.setAttemptedQuizzesInCookie(this.quizId, this.score, userQuiz);
    const usedSelectedIndex = this.selectedQuestion.options.findIndex(
      o => o.questionOptionId === userSelectedOptionId
    );
    const correctOptionIndex = this.selectedQuestion.options.findIndex(
      o => o.questionOptionId === this.selectedQuestion.optionId
    );

    // if user already selected, we should disable user selection of all options
    // if (isManualSelection === false && this.dataService.isDataValid(this.selectedQuestion.options)) {
    //   const noOfOptions: number = this.selectedQuestion.options.length;
    //   for (let i = 0; i <= noOfOptions; i++) {
    //     const selectedElement = $('#content__div__' + i);
    //   }
    // }

    if (usedSelectedIndex === correctOptionIndex) {
      const correctAnswerElement = $('#content__div__' + usedSelectedIndex);
      this.applyCSS(correctAnswerElement, 'green');
    } else {
      const wrongAnswerElement = $('#content__div__' + usedSelectedIndex);
      this.applyCSS(wrongAnswerElement, 'red');
      const correctAnswerElement = $('#content__div__' + correctOptionIndex);
      this.applyCSS(correctAnswerElement, 'green');
    }
    // try {
    //   $('html, body').animate(
    //     {
    //       scrollTop: $('#content__div__' + correctOptionIndex).offset().top
    //     },
    //     'fast'
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    setTimeout(() => {
      this.noOfSelectedQuestions++;
      this.getNextQuestion();
    }, timeForAnimtion);
  }

  onOptionSelectedByUser(userSelectedOption: Option) {
    const userProvidedAnswer: UserQuiz =
      this.dataService.getUserAlreadyProvidedAnswer(this.quizId, this.selectedQuestion.questionId);
    if (this.dataService.isDataValid(userProvidedAnswer)) {
      this.onOptionSelected(userProvidedAnswer.optionId);
    } else {
      this.onOptionSelected(userSelectedOption.questionOptionId);
    }
  }

  onQuizCompleted() {
    this.selectedQuestion = null;
    this.dataService
      .validateQuiz(
        this.quizId,
        this.friendId,
        this.friendAccessToken,
        this.userSelectedOptions
      )
      .subscribe(result => {
        if (result === true) {
          this.dataService.setFriendDetailsInCookie(this.quizId, this.friendId, this.friendAccessToken, true, this.score);
          this.router.navigate([
            Consts.ScorePagePath,
            {
              quizId: this.quizId,
              friendId: this.friendId,
              score: this.score
            }
          ]);
        }
      });
  }

  applyStyle() {
    if (this.noOfSelectedQuestions !== this.maxNoofQuestions) {
      this.changeDetectorRef.detectChanges();
    }
    if (this.dataService.isDataValid(this.selectedQuestion)
      && this.dataService.isDataValid(this.selectedQuestion.options)) {
      for (
        let index = 0;
        index < this.selectedQuestion.options.length;
        index++
      ) {
        const temp = $('#content__div__' + index);
        if (temp != null) {
          this.applyCSS(temp, 'white');
        }
      }
    }
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

  disableElement(element, color: string) {
    this.applyCSS(element, color);
  }
}
