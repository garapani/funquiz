import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IOption } from '../interfaces/option';

export interface IOptionModel extends IOption, Document { }

export const OptionSchema: Schema = new Schema({
  questionOptionId: {
    type: String,
    unique: true,
    required: true
  },
  optionType: {
    type: String
  },
  content: {
    type: String
  }
});

export const OptionModel: Model<IOptionModel> = model<IOptionModel>(tableNames.OPTION_TABLE_NAME, OptionSchema);
