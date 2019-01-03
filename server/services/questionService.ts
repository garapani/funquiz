import * as fs from 'fs';
import * as path from 'path';

class QuestionService {
  // get Allquestions returns a promise.
  public getAllQuestions(): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const questionsPath: string = path.join(__dirname, '../../public/json/allquestions.json');
      console.log(questionsPath);
      fs.readFile(questionsPath, (err, data) => {
        if (err != null) {
          reject('failed to read' + err);
        } else {
          resolve(data.toString());
        }
      });
    });
  }
}

export default new QuestionService();
