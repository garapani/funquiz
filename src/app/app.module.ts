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
import { AdsenseModule } from 'ng2-adsense';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { ShareQuizComponent } from './pages/share-quiz/share-quiz.component';
import { InviteComponent } from './pages/invite/invite.component';
import { AnswerQuizComponent } from './pages/answer-quiz/answer-quiz.component';
import { FriendPageComponent } from './pages/friend-page/friend-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import {AboutUsComponent} from './pages/aboutus-page/aboutus.component';
import { FooterComponent } from './viewcomponents/footer.component';
import { PrivacyPolicyComponent } from './pages/privacypolicy-page/privacypolicy.component';
import { FaqsComponent } from './pages/faqs-page/faqs.component';
import {GoogleAdSenseComponent} from './google-adsense/google-adsense.component';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { routes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxGaugeModule,
    AdsenseModule.forRoot(),
    FacebookModule.forRoot(),
    RouterModule.forRoot(routes),
    DeviceDetectorModule.forRoot()
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
    ScoresPageComponent,
    AboutUsComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    FaqsComponent,
    GoogleAdSenseComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
