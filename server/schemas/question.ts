import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IQuestion } from '../interfaces/question';

export interface IQuestionModel extends IQuestion, Document {}

export const QuestionSchema: Schema = new Schema({
  questionId: {
    type: String
  },
  questionName: {
    type: String
  },
  optionsType: {
    type: String
  },
  options: {
    type: Schema.Types.ObjectId,
    ref: tableNames.OPTION_TABLE_NAME
  }
});

export const QuestionModel: Model<IQuestionModel> = model<IQuestionModel>(
  tableNames.QUESTION_TABLE_NAME,
  QuestionSchema
);
