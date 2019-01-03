import util from '../utils/util';
import { UserModel, IUserModel } from '../schemas/user';
import { FriendModel, IFriendModel } from '../schemas/friend';
import { IUser } from '../interfaces/user';
import { IUserQuiz } from '../interfaces/userQuiz';
import { IFriend } from '../interfaces/friend';
import { IQuizResult } from '../interfaces/quizResult';
import { IQuestion } from '../interfaces/question';
import { IUserQuestion } from '../interfaces/userQuestion';
import questionService from './questionService';
import { IAllQuestions } from '../interfaces/allQuestions';
import * as tableNames from '../schemas/tableNames';

class UserService {
  public async registerUserAsync(username: string): Promise<IUser> {
    let registeredUser: IUser = null;
    const generatedUserID: string = util.GenerateUniqueString(10);
    console.log('generated user id', generatedUserID);
    const user: IUserModel = new UserModel({
      userId: generatedUserID,
      userName: username,
      accessToken: util.Encrypt(generatedUserID)
    });

    const savedUser: IUserModel = await user.save();
    console.log(savedUser);

    if (this.isDataValid(savedUser) && savedUser.userName === username) {
      registeredUser = {
        userId: savedUser.userId,
        userName: savedUser.userName,
        quizzes: savedUser.quizzes,
        friends: savedUser.friends,
        accessToken: savedUser.accessToken
      };
    }
    console.log(registeredUser);
    return registeredUser;
  }

  public async registerFriendAsync(
    userid: string,
    friendName: string
  ): Promise<IFriend> {
    let savedFriend: IFriendModel = null;
    const generatedFriendId: string = util.GenerateUniqueString(10);
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userid
    });

    if (this.isDataValid(userDetails)) {
      const registeredFriend: IFriendModel = new FriendModel({
        _creator: userDetails._id,
        friendId: generatedFriendId,
        name: friendName,
        score: -1,
        accessToken: util.Encrypt(generatedFriendId)
      });

      savedFriend = await registeredFriend.save();
      if (this.isDataValid(savedFriend)) {
        if (this.isDataValid(userDetails.friends)) {
          userDetails.friends.push(savedFriend);
        } else {
          userDetails.friends = new Array<IFriend>(savedFriend);
        }
        await userDetails.save();
      }
    }
    return savedFriend;
  }

  public async getUserNameAsync(userIdToQuery: string): Promise<string> {
    console.log('quering useid', userIdToQuery);
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userIdToQuery
    });
    console.log(userDetails.userName);
    if (this.isDataValid(userDetails)) {
      return userDetails.userName;
    }
    return null;
  }

  public async getUserDetailsAsync(userIdToQuery: string): Promise<IUser> {
    console.log('quering useid', userIdToQuery);
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userIdToQuery
    });
    console.log(userDetails);
    if (this.isDataValid(userDetails)) {
      return userDetails;
    } else {
      return null;
    }
  }

  public async isUserValidAsync(
    userIdToQuery: string,
    accessToken: string
  ): Promise<boolean> {
    console.log('quering useid', userIdToQuery);
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userIdToQuery
    });
    if (
      this.isDataValid(userDetails) &&
      userDetails.accessToken === accessToken
    ) {
      return true;
    } else {
      return false;
    }
  }

  public async getUserQuizResultAsync(
    userIdToQuery: string
  ): Promise<IQuizResult> {
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userIdToQuery
    }).populate(tableNames.FRIEND_TABLE_NAME + 's');
    const quizResults: IQuizResult = {
      name: userDetails.userName,
      results: userDetails.friends
    };
    return quizResults;
  }

  public async getUserQuestionsAsync(
    userIdToQuery: string
  ): Promise<IUserQuestion[]> {
    const allQuestionsString: string = await questionService.getAllQuestions();
    const allQuestions: IAllQuestions = JSON.parse(allQuestionsString);
    if (this.isDataValid(allQuestions)) {
      const userQuestions: IUserQuestion[] = new Array<IUserQuestion>();
      const questions: IQuestion[] = allQuestions.questions;
      if (this.isDataValid(questions)) {
        const userDetails: IUserModel = await UserModel.findOne({
          userId: userIdToQuery
        });
        if (
          this.isDataValid(userDetails) &&
          this.isDataValid(userDetails.quizzes)
        ) {
          userDetails.quizzes.forEach(quiz => {
            const question: IQuestion = questions.find(
              q => q.questionId === quiz.questionId
            );

            if (this.isDataValid(question)) {
              const userQuestion: IUserQuestion = {
                optionId: quiz.optionId,
                questionId: quiz.questionId,
                options: question.options,
                optionType: question.optionsType,
                questionName: question.questionName
              };
              userQuestions.push(userQuestion);
            }
          });
          return userQuestions;
        }
      }
    }
    return null;
  }

  public async getAccessTokenAsync(userIdToQuery: string): Promise<string> {
    const userDetails: IUserModel = await UserModel.findOne({
      userId: userIdToQuery
    });
    if (this.isDataValid(userDetails)) {
      return userDetails.accessToken;
    } else {
      return null;
    }
  }

  public async getAccessTokenOfFriendAsync(
    friendIdToQuery: string
  ): Promise<string> {
    const friendDetails: IFriendModel = await FriendModel.findOne({
      friendId: friendIdToQuery
    });
    if (this.isDataValid(friendDetails)) {
      return friendDetails.accessToken;
    } else {
      return null;
    }
  }

  public async updateQuizAsync(
    userIdToQuery: string,
    userQuizzes: IUserQuiz[]
  ): Promise<boolean> {
    if (this.isDataValid(userQuizzes) && userQuizzes.length > 0) {
      const userDetails: IUserModel = await UserModel.findOne({
        userId: userIdToQuery
      });

      if (this.isDataValid(userDetails)) {
        userDetails.quizzes = userQuizzes;
        const savedUserDetails: IUserModel = await userDetails.save();
        if (this.isDataValid(savedUserDetails)) {
          return true;
        }
      }
    }
    return false;
  }

  public async deleteFriendAsync(
    userIdToQuery: string,
    friendId: string,
    accessTokenToQuery: string
  ): Promise<boolean> {
    if (
      this.isDataValid(userIdToQuery) &&
      this.isDataValid(friendId) &&
      this.isDataValid(accessTokenToQuery)
    ) {
      const userDetails: IUserModel = await UserModel.findOne({
        userId: userIdToQuery,
        accessToken: accessTokenToQuery
      }).populate(tableNames.FRIEND_TABLE_NAME + 's');

      if (this.isDataValid(userDetails)) {
        userDetails.friends = userDetails.friends.filter(
          o => o.friendId !== friendId
        );
        const savedUserDetails: IUserModel = await userDetails.save();
        if (this.isDataValid(savedUserDetails)) {
          return true;
        }
      }
    }
    return false;
  }

  public async validateQuizAsync(
    userIdToQuery: string,
    friendIdToQuery: string,
    friendAnswers: IUserQuiz[]
  ): Promise<boolean> {
    if (this.isDataValid(friendAnswers) && friendAnswers.length > 0) {
      const userDetails: IUserModel = await UserModel.findOne({
        userId: userIdToQuery
      });

      let score: number = 0;
      if (this.isDataValid(userDetails) && userDetails.quizzes !== null) {
        userDetails.quizzes.forEach(q => {
          console.log(q);
          const foundAnswer: IUserQuiz = friendAnswers.find(o => {
            return o.questionId === q.questionId && o.optionId === q.optionId;
          });
          console.log(foundAnswer);
          if (this.isDataValid(foundAnswer)) {
            score++;
          }
        });

        const friendModel: IFriendModel = await FriendModel.findOne({
          friendId: friendIdToQuery
        });
        if (this.isDataValid(friendModel)) {
          friendModel.score = score;
          const savedFriend: IFriend = await friendModel.save();
          if (this.isDataValid(savedFriend)) {
            return true;
          }
        }
      }
      return false;
    }
  }

  public isDataValid(data: any): boolean {
    if (data !== undefined && data !== null && data !== '') {
      return true;
    }
    return false;
  }
}

export default new UserService();
