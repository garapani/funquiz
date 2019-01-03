import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { DataService } from './dataService/dataService';
import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { NgxGaugeModule } from 'ngx-gauge';
import { AdsenseModule } from 'ng2-adsense';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { ShareQuizComponent } from './pages/share-quiz/share-quiz.component';
import { InviteComponent } from './pages/invite/invite.component';
import { AnswerQuizComponent } from './pages/answer-quiz/answer-quiz.component';
import { FriendPageComponent } from './pages/friend-page/friend-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import Consts from './consts';

@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    CreateQuizComponent,
    ShareQuizComponent,
    InviteComponent,
    AnswerQuizComponent,
    FriendPageComponent,
    ScorePageComponent,
    ScoresPageComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxGaugeModule,
    AdsenseModule.forRoot(),
    FacebookModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: Consts.HomePagePath,
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'createQuizPage',
        component: CreateQuizComponent
      },
      {
        path: 'shareQuizPage',
        component: ShareQuizComponent
      },
      {
        path: 'answerQuizPage',
        component: AnswerQuizComponent
      },
      {
        path: 'friendPage',
        component: FriendPageComponent
      },
      {
        path: 'scorePage',
        component: ScorePageComponent
      },
      {
        path: 'scoresPage',
        component: ScoresPageComponent
      },
      {
        path: 'invitePage/:QuizId',
        component: InviteComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
