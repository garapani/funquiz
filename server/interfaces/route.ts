import { Router } from 'express';

export interface IRoute {
    initializeRoute(router: Router): void;
}
