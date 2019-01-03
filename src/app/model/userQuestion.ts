import Option from './option';

export default class UserQuestion {
  questionId: string;
  questionName: string;
  optionId: string;
  options: Option[];
  optionType: string;
}
