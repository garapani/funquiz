import { IOption } from './option';

export interface IQuestion {
    questionId: string;
    questionName: string;
    optionsType: string;
    options: IOption[];
}
