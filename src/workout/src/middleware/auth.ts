import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export interface UserRequest extends Request {
    user : any
} 

export const authGuard = async ( req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const verifyRequest = await axios.post('http://auth:3003/auth', {}, {
            headers: {
                cookie: `Authorization=${req.cookies['Authorization']}`,
            } 
            });
        
        if(verifyRequest.status >= 200 && verifyRequest.status <= 299) {
            req.user = verifyRequest.data;
            next();
            return;
        }

        throw new Error('cant verify this user');
        

    } catch (err) {
        console.log('auth middleware ', err.message);
        next();

    }
}