import jwt from 'jsonwebtoken';
import UserSchema from "../database/schemas/user.schema.js";
import bcrypt from 'bcryptjs';
export const registerUser = async (req, res, next) => {
    const session = await UserSchema.startSession();
    session.startTransaction();
    const { email, password, username, phoneNumber } = req.body;
    try {
        const userFromDatabase = await UserSchema.findOne({ phoneNumber });
        if (userFromDatabase !== null) {
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
        res.status(200).json({ accessToken: `Bearer ${generateToken(user._id)}` });
    }
    catch (err) {
        console.error(err);
        session.abortTransaction();
        next(err);
    }
};
export const loginUser = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await UserSchema.findOne({ phoneNumber });
        if (user && (await bcrypt.compare(password, user.password))) {
            // const accessToken = generateToken(user._id);
            res.status(200).send();
            // res.json({
            // accessToken
            // });
            return;
        }
        res.status(400);
        throw new Error('Invalid Credentials');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
export const verify = (req, res, next) => {
    const tokenFromCookies = req.cookies['Authorization'];
    const tokenFromHeader = req.headers['Authorization'];
    console.log(`tokenFromHeader ${tokenFromHeader} tokenFromCookies ${tokenFromCookies}`);
    res.status(200).send();
};
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
const passwordHash = async (plainText) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainText, salt);
    }
    catch (err) {
        console.error(err);
    }
};
//# sourceMappingURL=user.controller.js.map