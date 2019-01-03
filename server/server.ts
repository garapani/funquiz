import app from './app';
import { AppLogger, LogLevel } from './logger/appLogger';
const PORT: number = 4000;

app.listen(PORT, err => {
  const appLogger: AppLogger = new AppLogger('Server');
  if (err) { appLogger.writeLog(LogLevel.debug, err); }
  appLogger.writeLog(
    LogLevel.debug,
    'Express server listening on port ' + PORT
  );
});
