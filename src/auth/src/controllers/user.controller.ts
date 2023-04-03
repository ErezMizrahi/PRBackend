import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from "../database/schemas/user.schema.js";
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import Amqp from '../amqp/connection.js';

type UserType = {
    email: string;
    password: string;
    username: string;
    phoneNumber:string;
}

type JWTPayload = {
    id: string;
    iat: number;
    exp: number;
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const session = await UserSchema.startSession();
    session.startTransaction();

    const { email, password, username, phoneNumber }: UserType = req.body;

    try {
        const userFromDatabase = await UserSchema.findOne({ phoneNumber });

        if(userFromDatabase !== null) {
            res.status(401);
            throw new Error('User already exists');
        }

       await UserSchema.create({
                email,
                password: await passwordHash(password),
                username,
                phoneNumber
        });

        session.commitTransaction();
        Amqp.publishMessage('auth-user-signup', {
            email,
            username,
            phoneNumber
        });

        res.status(200).json({
            email,
            username,
            phoneNumber
        });

    } catch (err) {
        console.error(err);
        session.abortTransaction();
        next(err);
    }
    
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await UserSchema.findOne({ phoneNumber });

        if(user && (await bcrypt.compare(password, user.password))) {
            res.cookie('Authorization' , generateToken(user._id),  { httpOnly: true, sameSite: 'none' });
            res.status(200).send();
            return;
        }

        res.status(400);
        throw new Error('Invalid Credentials');

    } catch (err) {
        console.log(err);
        next(err)
    }

}


export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies)
        const { headers: { cookie } } = req;
        const tokenFromCookies = req.cookies['Authorization'];
        
        if(!tokenFromCookies) throw new Error('User Not Authoriazed')

        const payload = verifyToken(tokenFromCookies);
        const user = await UserSchema.findById(payload.id).select('-password')
    
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        next(err)
    }

}

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '30d'
    });
}

const verifyToken = (token: string) => {
    return jwt.verify(token , process.env.JWT_SECRET) as JWTPayload;
}

const passwordHash = async (plainText: string): Promise<string> => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainText, salt);
    } catch (err) {
        console.error(err);
    }


}