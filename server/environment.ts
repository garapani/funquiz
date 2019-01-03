import * as process from 'process';

console.log('running enviroment:' + process.env.NODE_ENV);

class Enviroment {
  public getHostUrl(): string {
    if (this.isProdEnvironment()) {
      return 'http://funquiz.in';
    } else {
      return 'http://localhost:1978';
    }
  }

  public isProdEnvironment(): boolean {
    if (process.env.NODE_DEV === 'production') { return true; } else { return false; }
  }

}
export default new Enviroment();
