import { Router, Request, Response } from 'express';
import * as routeConsts from '../constants/routeConstants';
import dataService from '../services/dataService';
import { IUser } from '../interfaces/user';
import { IRoute } from '../interfaces/route';
import { LogLevel, AppLogger } from '../logger/appLogger';
import { IQuizResult } from '../interfaces/quizResult';
import { IUserQuestion } from '../interfaces/userQuestion';

class UserRoute implements IRoute {
  private appLoger: AppLogger;

  constructor() {
    this.appLoger = new AppLogger('UserRoute');
  }

  public initializeRoute(router: Router): void {
    this.handlePostRegisterUserRoute(router);
    this.handleGetUserNameRoute(router);
    this.handleGetUserDetailsRoute(router);
    this.handlePostIsUserValidRoute(router);
    this.handleGetUserQuizResultRoute(router);
    this.handleGetUserQuestionsRoute(router);
    this.handlePostUserDeleteFriendRoute(router);
  }

  private handlePostRegisterUserRoute(router: Router): void {
    router.post(
      routeConsts.USER_REGISTER_USER,
      async (req: Request, res: Response) => {
        this.appLoger.writeLog(
          LogLevel.debug,
          'received ',
          routeConsts.USER_REGISTER_USER,
          req != null ? req.body : null
        );
        if (req != null && req.body != null) {
          const registeredUser: IUser = await this.registerUserAsync(
            req.body.name
          );
          if (registeredUser != null) {
            res.send(registeredUser);
          } else {
            res.send(null);
          }
        } else {
          res.sendStatus(204);
        }
      }
    );
  }

  /// api/User/GetUserName?userId=<userid>
  private handleGetUserNameRoute(router: Router): void {
    this.appLoger.writeLog(LogLevel.debug, 'handleGetUserNameRoute');
    router.get(
      routeConsts.USER_GET_USER_NAME,
      async (req: Request, res: Response) => {
        this.appLoger.writeLog(
          LogLevel.debug,
          'received ',
          routeConsts.USER_GET_USER_NAME,
          req != null && req.query != null ? req.query.userId : null
        );

        if (req != null && req.query != null && req.query.userId != null) {
          const userName: string = await this.getUserNameAsync(
            req.query.userId
          );
          res.send(JSON.stringify({ name: userName }));
        } else {
          res.send(null);
        }
      }
    );
  }

  private handleGetUserDetailsRoute(router: Router): void {
    this.appLoger.writeLog(LogLevel.debug, 'handleGetUserDetailsRoute');
    router.get(
      routeConsts.USER_GET_USER_DETAILS,
      async (req: Request, res: Response) => {
        this.appLoger.writeLog(
          LogLevel.debug,
          'received ',
          routeConsts.USER_GET_USER_DETAILS,
          req != null && req.query != null ? req.query.userId : null
        );

        if (req != null && req.query != null && req.query.userId != null) {
          const userDetails: IUser = await this.getUserDetailsAsync(
            req.query.userId
          );
          res.send(userDetails);
        } else {
          res.send(null);
        }
      }
    );
  }

  private handlePostIsUserValidRoute(router: Router): void {
    this.appLoger.writeLog(LogLevel.debug, 'handleIsUserValidRoute');
    router.post(
      routeConsts.USER_IS_USER_VALID,
      async (req: Request, res: Response) => {
        this.appLoger.writeLog(
          LogLevel.debug,
          'received ',
          routeConsts.USER_IS_USER_VALID,
          req != null && req.query != null ? req.query.userId : null
        );

        if (req != null && req.query != null && req.query.userId != null) {
          const isUserValid: boolean = await this.isUserValidAsync(
            req.query.userId,
            req.body.accessToken
          );
          res.send(isUserValid);
        } else {
          res.send(false);
        }
      }
    );
  }

  private handleGetUserQuizResultRoute(router: Router): void {
    router.get(
      routeConsts.USER_QUIZ_RESULT,
      async (req: Request, res: Response) => {
        if (
          dataService.isDataValid(req) &&
          dataService.isDataValid(req.query) &&
          dataService.isDataValid(req.query.userId)
        ) {
          const quizResults: IQuizResult = await this.getUserQuizResultAsync(
            req.query.userId
          );
          res.send(quizResults);
        } else {
          res.send(null);
        }
      }
    );
  }

  private handleGetUserQuestionsRoute(router: Router): void {
    router.get(
      routeConsts.USER_GET_USER_QUESTIONS,
      async (req: Request, res: Response) => {
        if (
          dataService.isDataValid(req) &&
          dataService.isDataValid(req.query) &&
          dataService.isDataValid(req.query.userId)
        ) {
          const userQuestions: IUserQuestion[] = await this.getUserQuestionsAsync(
            req.query.userId
          );
          if (dataService.isDataValid(userQuestions)) {
            res.send(userQuestions);
          } else {
            res.send(null);
          }
        }
      }
    );
  }

  private handlePostUserDeleteFriendRoute(router: Router): void {
    router.post(
      routeConsts.USER_DELETE_FRIEND,
      async (req: Request, res: Response) => {
        if (
          dataService.isDataValid(req) &&
          dataService.isDataValid(req.query) &&
          dataService.isDataValid(req.query.userId)
        ) {
          return new Promise(async (resolve, reject) => {
            const result: boolean = await dataService.deleteFriendAsync(
              req.query.userId,
              dataService.isDataValid(req.body) ? req.body.friendId : null,
              req.headers.accesstoken as string
            );
            if (result === true) {
              res.send(true);
            }
            res.send(false);
          });
        }
      }
    );
  }

  private registerUserAsync(userName: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      let registeredUser: IUser = null;
      registeredUser = await dataService.registerUserAsync(userName);
      this.appLoger.writeLog(LogLevel.debug, 'registeredUser', registeredUser);
      if (dataService.isDataValid(registeredUser)) {
        resolve(registeredUser);
      } else {
        resolve(null);
      }
    });
  }

  private getUserNameAsync(userId: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const userName: string = await dataService.getUserNameAsync(userId);
      this.appLoger.writeLog(
        LogLevel.debug,
        'userName for userId',
        userId,
        userName
      );
      if (dataService.isDataValid(userName)) {
        resolve(userName);
      } else {
        resolve(null);
      }
    });
  }

  private getUserDetailsAsync(userId: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const userDetails: IUser = await dataService.getUserDetailsAsync(userId);
      this.appLoger.writeLog(
        LogLevel.debug,
        'userdetails for userId',
        userId,
        userDetails
      );
      if (dataService.isDataValid(userDetails)) {
        resolve(userDetails);
      } else {
        resolve(null);
      }
    });
  }

  private isUserValidAsync(
    userId: string,
    accessToken: string
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const isUserValid: boolean = await dataService.isUserValidAsync(
        userId,
        accessToken
      );
      resolve(isUserValid);
    });
  }

  private getUserQuizResultAsync(userId: string): Promise<IQuizResult> {
    return new Promise(async (resolve, reject) => {
      const quizResults: IQuizResult = await dataService.getUserQuizResultAsync(
        userId
      );
      if (dataService.isDataValid(quizResults)) {
        resolve(quizResults);
      } else {
        resolve(null);
      }
    });
  }

  private getUserQuestionsAsync(userId: string): Promise<IUserQuestion[]> {
    return new Promise(async (resolve, reject) => {
      const userQuestions: IUserQuestion[] = await dataService.getUserQuestionsAsync(
        userId
      );
      if (dataService.isDataValid(userQuestions)) {
        resolve(userQuestions);
      } else {
        resolve(null);
      }
    });
  }
}

export default new UserRoute();
