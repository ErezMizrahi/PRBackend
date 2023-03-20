import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from "../database/schemas/user.schema.js";
import bcrypt from 'bcryptjs';

type UserType = {
    email: string;
    password: string;
    username: string;
    phoneNumber:string;
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

        const user = await UserSchema.create({
                email,
                password: await passwordHash(password),
                username,
                phoneNumber
        });

        session.commitTransaction();

        const accessToken = `Bearer ${generateToken(user._id)}`;

        res.setHeader('Authorization', accessToken);
        res.status(200).send();

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
            const accessToken = generateToken(user._id);
            res.status(200);
            res.json({
                accessToken
            });
            return;
        }

        res.status(400);
        throw new Error('Invalid Credentials');

    } catch (err) {
        console.log(err);
        next(err)
    }

}

const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '30d'
    });
}

const verifyToken = (token: string) => {
    return jwt.verify(token , process.env.JWT_SECRET);
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