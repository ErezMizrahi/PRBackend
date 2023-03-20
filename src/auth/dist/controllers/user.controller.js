import UserSchema from "../database/schemas/user.schema.js";
export const createUser = async (req, res) => {
    const session = await UserSchema.startSession();
    session.startTransaction();
    console.log('here!');
    try {
        // const user = await UserSchema.create({
        //     email: 'erezm@webtech-inv.co.il',
        //     password: '1234124',
        //     username: 'erez',
        //     phoneNumber: '0522889229'
        // });
        // session.commitTransaction();
        res.status(200).send();
        // res.send({ user });
    }
    catch (err) {
        console.error(err);
        session.abortTransaction();
        res.status(500).send();
    }
};
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { 
//         expiresIn: '30d'
//     });
// }
//# sourceMappingURL=user.controller.js.map