import { Router, Request, Response } from 'express';
import * as routeConsts from '../constants/routeConstants';
import questionService from '../services/questionService';
import { IRoute } from '../interfaces/route';

class QuestionsRoute implements IRoute {
    public initializeRoute(router: Router): void {
        this.handleGetQuestionsRoute(router);
    }

    private handleGetQuestionsRoute(router: Router): void {
        router.get(
            routeConsts.QUESTIONS_GET_QUESTIONS,
            (req: Request, res: Response) => {
                console.log('received ', routeConsts.QUESTIONS_GET_QUESTIONS);

                const getAllQuestionsPromise: Promise<string> = questionService.getAllQuestions();
                getAllQuestionsPromise
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.send(null);
                    });
            }
        );
    }
}

export default new QuestionsRoute();
