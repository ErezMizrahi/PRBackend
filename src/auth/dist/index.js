import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import userRouter from './routes/user.router.js';
const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRouter);
app.use(errorHandler);
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
//# sourceMappingURL=index.js.map