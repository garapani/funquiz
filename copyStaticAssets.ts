import * as shell from 'shelljs';
shell.rm('-rf', 'dist/public/json');
shell.mkdir('-p', 'dist/public/json');
shell.rm('-rf', 'dist/public/certificates');
shell.mkdir('-p', 'dist/public/certificates');
shell.cp('-R', 'server/public/json', 'dist/public/');
shell.cp('-R', 'server/certificates', 'dist/public/');
// shell.cp("-R", "src/public/fonts", "dist/public/");
// shell.cp("-R", "src/public/images", "dist/public/");
