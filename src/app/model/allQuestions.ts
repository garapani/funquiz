import Question from './question';

export default class AllQuestions {
  id: string;
  name: string;
  maxQuestions: number;
  questions: Question[];
}
