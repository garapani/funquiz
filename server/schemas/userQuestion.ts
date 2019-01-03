import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IUserQuestion } from '../interfaces/userQuestion';

export interface IUserQuestionModel extends IUserQuestion, Document {}

export const UserQuestionSchema: Schema = new Schema({
  questionId: {
    type: String,
    required: true,
    unique: true
  },
  questionName: {
    type: String
  },
  optionId: {
    type: String
  },
  options: {
    type: Schema.Types.ObjectId,
    ref: tableNames.OPTION_TABLE_NAME
  },
  optionType: {
    type: String
  }
});

export const UserQuestionModel: Model<IUserQuestionModel> = model<
  IUserQuestionModel
>(tableNames.USER_QUESTION_TABLE_NAME, UserQuestionSchema);
