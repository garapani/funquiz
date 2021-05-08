import app from './app';
import { AppLogger, LogLevel } from './logger/appLogger';
const PORT: number = 4010;
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

console.log(`app is listening on port:${PORT}`);
app.listen(PORT);

/*
const options = {
  key: fs.readFileSync(
    path.join(__dirname, './public/certificates/funquiz_in_new.key'),
    'utf8'
  ),
  cert: fs.readFileSync(
    path.join(__dirname, './public/certificates/funquiz_in_new.crt'),
    'utf8'
  ),
  ca: fs.readFileSync(
    path.join(__dirname, './public/certificates/funquiz_in_new.ca-bundle')
  )
};*/
/*
const hostname = 'funquiz.in';
const httpServer = http.createServer((req, res) => {
  res.statusCode = 301;
  res.setHeader('Location', `https://${hostname}${req.url}`);
  res.end(); // make sure to call send() or end() to send the response
});
httpServer.listen(PORT);
*/

/*
const serverSSL = https.createServer(options, app);

serverSSL.listen(PORT);
serverSSL.on('error', (error) => console.error(error));
serverSSL.on('listening', () => console.log('listening'));
*/

