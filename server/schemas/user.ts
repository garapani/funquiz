import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IUser } from '../interfaces/user';
import { IUserQuiz } from '../interfaces/userQuiz';

export interface IUserModel extends IUser, Document { }

export let UserSchema: Schema = new Schema({
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  quizzes: {
    type: Array<IUserQuiz>()
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: tableNames.FRIEND_TABLE_NAME
  }],
  accessToken: {
    type: String
  }
});

export const UserModel: Model<IUserModel> = model<IUserModel>(
  tableNames.USER_TABLE_NAME,
  UserSchema
);
