import { Router, Request, Response } from 'express';
import * as routeConsts from '../constants/routeConstants';
import { IRoute } from '../interfaces/route';
import dataService from '../services/dataService';
import { IFriend } from '../interfaces/friend';

class FriendRoute implements IRoute {

  public initializeRoute(router: Router): void {
    this.handlePostRegisterFriend(router);
  }

  private handlePostRegisterFriend(router: Router): void {
    router.route(routeConsts.FRIEND_REGISTER_FRIEND).post(async (req: Request, res: Response) => {
      console.log('received', routeConsts.FRIEND_REGISTER_FRIEND);
      if (req != null && req.query != null) {
        const friend: IFriend = await dataService.registerFriendAsync(req.query.userId, req.body.name);
        if (dataService.isDataValid(friend)) {
          res.send(friend);
        } else {
          res.send(null);
        }
      }
    });
  }
}

export default new FriendRoute();
