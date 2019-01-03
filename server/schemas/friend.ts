import { Document, Schema, Model, model } from 'mongoose';
import * as tableNames from './tableNames';
import { IFriend } from '../interfaces/friend';

export interface IFriendModel extends IFriend, Document {}

export const FriendSchema: Schema = new Schema({
  _creator: { type: String, ref: tableNames.FRIEND_TABLE_NAME },
  friendId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  score: {
    type: Number
  },
  accessToken: {
    type: String
  }
});

export const FriendModel: Model<IFriendModel> = model<IFriendModel>(
  tableNames.FRIEND_TABLE_NAME,
  FriendSchema
);
