import { Router } from 'express';
import friendRoute from './friendRoute';
import userRoute from './userRoute';
import quizRoute from './quizRoute';
import questionsRoute from './questionsRoute';

class RoutesIntializer {
  public initializeRoutes(router: Router): void {
    userRoute.initializeRoute(router);
    quizRoute.initializeRoute(router);
    friendRoute.initializeRoute(router);
    questionsRoute.initializeRoute(router);
  }
}

export default new RoutesIntializer();
