import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
// import { z } from 'zod' (When we start validation)

import apiRouter from './routes.js';

const PORT = Number(process.env.PORT ?? 3000);

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_: Request, response: Response) => {
  response.redirect('/api/health');
});

app.use('/api', apiRouter);

// Global Error Handler
app.use(
  (
    error: any,
    _request: Request,
    response: Response,
    _next: NextFunction
  ): void => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = { ...defaultErr, ...error };
    console.error(`Server error: ${errorObj.log}`);
    console.log(`Server error stack: ${errorObj.stack}`);
    response.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
