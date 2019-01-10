import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { DataService } from './dataService/dataService';
import { FacebookModule } from 'ngx-facebook';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { ShareQuizComponent } from './pages/share-quiz/share-quiz.component';
import { InviteComponent } from './pages/invite/invite.component';
import { AnswerQuizComponent } from './pages/answer-quiz/answer-quiz.component';
import { FriendPageComponent } from './pages/friend-page/friend-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import { routes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxGaugeModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateQuizComponent,
    ShareQuizComponent,
    InviteComponent,
    AnswerQuizComponent,
    FriendPageComponent,
    ScorePageComponent,
    ScoresPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
