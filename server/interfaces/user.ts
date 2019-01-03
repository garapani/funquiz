import { IFriend } from './friend';
import { IUserQuiz } from './userQuiz';

export interface IUser {
  userId: string;
  userName: string;
  quizzes: IUserQuiz[];
  friends: IFriend[];
  accessToken: string;
}
