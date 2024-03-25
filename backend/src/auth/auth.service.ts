/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from '../env';
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import axios from 'axios';

import { dataSource } from "../data/datasource";
import { Login } from '../data/entities/Login';
import { createCipheriv, randomBytes, randomUUID } from 'crypto';

@Injectable()
export class AuthService {
    async getAuth(req: Request, res: Response) {

        let OAuthData = new URLSearchParams({
            client_id: String(env.CLIENT_ID),
            response_type: "code",
            redirect_uri: env.URL + "/api/auth/callback",
            scope: ["identify", "guilds"].join(" ")
        });
        res.redirect(`https://discord.com/oauth2/authorize?${OAuthData}`);
    }

    async getCallback(req: Request, res: Response, code: string) {
        
        let TokenData = new URLSearchParams({
            client_id:  String(env.CLIENT_ID),
            client_secret: String(env.CLIENT_SECRET),
            grant_type: "authorization_code",
            code: code,
            redirect_uri: env.URL + "/api/auth/callback",
        });

        let response = await axios.post(
            `https://discord.com/api/oauth2/token`,
            TokenData
        ).then(response => response.data);

        let expiresIn = response.expires_in;
        let t = new Date();
        t.setSeconds(t.getSeconds() + expiresIn);

        let user = await axios.get(
            'https://discord.com/api/oauth2/@me',
            {
                headers: {
                    'authorization': `${response.token_type} ${response.access_token}`
                }
            }
        ).then((response) => {
            return response.data.user;
        });

        let loginsDb = await dataSource.getRepository(Login);

        let tokenArray = new Array<string>();

        tokenArray.push(Buffer.from(user.id).toString('base64'));
        tokenArray.push(Buffer.from(Math.floor(Date.now() / 10000).toString()).toString('base64'));

        let cipher = createCipheriv('aes-256-cbc', env.KEY, randomBytes(16));
        let encrypted = cipher.update(randomUUID().substring(0, 16), 'utf8', 'hex') +  cipher.final('hex');
        tokenArray.push(encrypted);

        let token: string = tokenArray.join(".");

        const existingLogin = await loginsDb.findOne({ where: { id: user.id }});

        if (existingLogin) {
            // Update the existing login
            await loginsDb.update(existingLogin.id, {
                token,
                tokenType: response.token_type,
                accessToken: response.access_token,
                expires: t,
                refreshToken: response.refresh_token,
            });
            console.log("Login updated");
        } else {
            // Insert a new login
            await loginsDb.insert({
                id: user.id,
                token,
                tokenType: response.token_type,
                accessToken: response.access_token,
                expires: t,
                refreshToken: response.refresh_token,
            });
            console.log("New login inserted");
        }

        res.redirect(`${env.URL}/login/callback?token=${token}`);
    }
}