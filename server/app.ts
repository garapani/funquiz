import { AppLogger, LogLevel } from './logger/appLogger';
import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import * as cors from 'cors';
import routesInitializer from './routes/routesInitializer';
import mongoDbUtil from './mongoDb/mongoDBUtil';
import * as path from 'path';

class App {
  private app: express.Application;
  private router: Router;
  private appLoger: AppLogger;

  constructor() {
    this.appLoger = new AppLogger('App');
    this.app = express();
    this.config();
    this.appLoger.writeLog(LogLevel.debug, 'starting the app');
    const distDir = '../';
    this.app.use(express.static(path.join(__dirname, distDir)));
    this.app.use(/^((?!(api)).)*/, (req, res) => {
      res.sendFile(path.join(__dirname, distDir + '/index.html'));
    });

    this.router = Router();
    // to know timing of each request.
    this.router.use(function timeLog(
      req: Request,
      res: Response,
      next: NextFunction,
    ): any {
      console.log('Time: ', Date.now());
      next();
    });

    this.app.use('/api', this.router); // servers all the routes which starts with api

    // mongo db connection once later mongoose will take care.
    mongoDbUtil.connect();

    routesInitializer.initializeRoutes(this.router);
  }

  public getApplication(): express.Application {
    return this.app;
  }

  private config(): void {
    this.app.use(cors());
    // support application/json type post data
    this.app.use(json());
    // support application/x-www-form-urlencoded post data
    this.app.use(urlencoded({ extended: true }));
  }
}

export default new App().getApplication();
