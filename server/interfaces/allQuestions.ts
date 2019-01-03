import {IQuestion} from './question';

export interface IAllQuestions {
    id: string;
    name: string;
    maxQuestions: number;
    questions: IQuestion[];
}
