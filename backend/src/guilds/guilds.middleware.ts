/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { dataSource } from '../data/datasource';
import { Login } from '../data/entities/Login';
import { User } from '../data/entities/Users';

@Injectable()
export class GuildsMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: Function) {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = bearerToken.split(' ')[1];

        let loginsDb = await dataSource.getRepository(Login);
        let loginUser = await loginsDb.findOne({ where: { token: token } });
        console.log(loginUser);

        if (!loginUser || !loginUser.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let userDb = await dataSource.getRepository(User);
        let userData = await userDb.findOne({ where: { id: loginUser.id } });

        if (userData.developer === 1) {
            return next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
