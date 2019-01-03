import Option from './option';

export default class Question {
    questionId: string;
    questionName: string;
    optionsType: string;
    options: Option[];
}
