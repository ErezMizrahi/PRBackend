import { Request, Response, NextFunction} from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = req.statusCode || 500;

    res.status(status);
    res.send({
       status,
       message: err.message,
       stack:  process.env.NODE_ENV !== 'production' ? err.stack : null
    });
}

export default errorHandler;