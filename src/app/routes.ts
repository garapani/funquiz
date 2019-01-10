import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { ShareQuizComponent } from './pages/share-quiz/share-quiz.component';
import { InviteComponent } from './pages/invite/invite.component';
import { AnswerQuizComponent } from './pages/answer-quiz/answer-quiz.component';
import { FriendPageComponent } from './pages/friend-page/friend-page.component';
import { ScorePageComponent } from './pages/score-page/score-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import Consts from './consts';

export const routes: Routes = [
  {
    path: 'homePage',
    component: HomeComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'createQuizPage',
    component: CreateQuizComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'shareQuizPage',
    component: ShareQuizComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'answerQuizPage',
    component: AnswerQuizComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'friendPage',
    component: FriendPageComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'scorePage',
    component: ScorePageComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'scoresPage',
    component: ScoresPageComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'invitePage/:QuizId',
    component: InviteComponent,
    pathMatch: 'prefix'
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];
