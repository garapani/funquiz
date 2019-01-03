import { IOption } from './option';

export interface IUserQuestion {
  questionId: string;
  questionName: string;
  optionId: string;
  options: IOption[];
  optionType: string;
}
