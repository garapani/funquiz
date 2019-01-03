import { Router, Request, Response } from 'express';
import * as routeConsts from '../constants/routeConstants';
import { IRoute } from '../interfaces/route';
import * as constants from '../constants/constants';
import dataService from '../services/dataService';
import { IUserQuiz } from '../interfaces/userQuiz';

class QuizRoute implements IRoute {
  public initializeRoute(router: Router): void {
    this.handlePostUpdateQuiz(router);
    this.handlePostValidateQuiz(router);
  }

  private handlePostUpdateQuiz(router: Router): void {
    router
      .route(routeConsts.QUIZ_UPDATE_QUIZ)
      .post(async (req: Request, res: Response) => {
        console.log('received ', routeConsts.QUIZ_UPDATE_QUIZ);
        if (req != null && req.query != null) {
          const accessTokenFromUser: string = req.get(
            constants.AccessTokenCookie
          );
          const actualAccessToken: string = await dataService.getAccessTokenAsync(
            req.query.quizId
          );
          if (accessTokenFromUser === actualAccessToken) {
            const userQuizzes: IUserQuiz[] = req.body as IUserQuiz[];
            console.log(userQuizzes);
            const isUpdated: boolean = await dataService.updateQuizAsync(
              req.query.quizId,
              userQuizzes
            );
            res.send(isUpdated);
          } else {
            res.send(false);
          }
        }
      });
  }

  private handlePostValidateQuiz(router: Router): void {
    router
      .route(routeConsts.QUIZ_VALIDATE_QUIZ)
      .post(async (req: Request, res: Response) => {
        console.log('received ', routeConsts.QUIZ_VALIDATE_QUIZ);
        if (req != null && req.query != null) {
          const accessTokenFromUser: string = req.get(
            constants.AccessTokenCookie
          );
          const actualAccessToken: string = await dataService.getAccessTokenOfFriendAsync(
            req.query.friendId
          );
          if (accessTokenFromUser === actualAccessToken) {
            const friendAnswers: IUserQuiz[] = req.body;
            console.log(friendAnswers);
            const isUpdated: boolean = await dataService.validateQuizAsync(
              req.query.quizId,
              req.query.friendId,
              friendAnswers
            );
            res.send(isUpdated);
          } else {
            res.send(false);
          }
        }
      });
  }
}

export default new QuizRoute();
