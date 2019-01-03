import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IUserQuiz } from '../interfaces/userQuiz';

export interface IUserQuizModel extends IUserQuiz, Document {}

export const UserQuizSchema: Schema = new Schema({
  questionId: {
    type: String,
    required: true,
    unique: true
  },
  optionId: {
    type: String,
    required: true,
    unique: true
  }
});

export const UserQuizModel: Model<IUserQuizModel> = model<IUserQuizModel>(
  tableNames.USER_QUIZ_TABLE_NAME,
  UserQuizSchema
);
