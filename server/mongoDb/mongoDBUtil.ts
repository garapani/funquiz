import { Mongoose, connect } from 'mongoose';
import * as constants from '../constants/constants';
import * as environment from '../environment';
class MongoDBUtil {
  public async connect(): Promise<void> {
    console.log('starting mongo connection');
    let connectionString: string = '';
    if (environment.default.isProdEnvironment()) {
      connectionString = constants.MONGO_DB_PROD_CONNECTION_STRING;
    } else {
      connectionString = constants.MONGO_DB_DEV_CONNECTION_STRING;
    }
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
