import { Mongoose, connect } from 'mongoose';
import * as constants from '../constants/constants';

class MongoDBUtil {
  public async connect(): Promise<void> {
    console.log('starting mongo connection');
    let connectionString: string = '';
    connectionString = constants.MONGO_DB_PROD_CONNECTION_STRING;
    const result: Mongoose = await connect(
      connectionString,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    );
    console.log(result);
  }
}
export default new MongoDBUtil();
