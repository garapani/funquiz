import UserQuiz from './userQuiz';
import Friend from './friend';
export default class User {
  userId: string;
  userName: string;
  quizzes: UserQuiz[];
  friends: Friend[];
  accessToken: string;
}
