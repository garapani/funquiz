import app from './app';
import { AppLogger, LogLevel } from './logger/appLogger';
const PORT: number = 4000;
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const options = {
  key: fs.readFileSync(
    path.join(__dirname, './public/certificates/funquiz_in_privatekey.key'),
    'utf8'
  ),
  cert: fs.readFileSync(
    path.join(__dirname, './public/certificates/funquiz_in_certificate.crt'),
    'utf8'
  )
};

// const server = http.createServer(app);
const serverSSL = https.createServer(options, app);

// server.listen(80);
// server.on('error', (error) => console.error(error));
// server.on('listening', () => console.log('listening'));
app.listen(8000);

serverSSL.listen(8080);
serverSSL.on('error', (error) => console.error(error));
serverSSL.on('listening', () => console.log('listening'));

// app.listen(PORT, err => {
//   const appLogger: AppLogger = new AppLogger('Server');
//   if (err) { appLogger.writeLog(LogLevel.debug, err); }
//   appLogger.writeLog(
//     LogLevel.debug,
//     'Express server listening on port ' + PORT
//   );
// });
