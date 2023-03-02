import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/login', async (req, res) => {
    console.log('send email');

    res.cookie(
        'auth',
        generateToken('erez'),
        {httpOnly: true}
    );

    res.status(200);
    res.send({
        message: "done"
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { 
        expiresIn: '30d'
    });
}
app.use(errorHandler)
app.listen(PORT, () => console.log(`server started at port ${PORT}`));