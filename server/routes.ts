import { Router, Request, Response } from 'express';

import { dbGetJokes, dbSaveJoke } from './controllers/jokes.js';

const apiRouter = Router();

// /api/health for production Health Checks
apiRouter.get('/health', (_: Request, response: Response) => {
  response.json({ ok: true });
});

// Get a list of jokes up to a reasonable limit
apiRouter.get('/jokes', dbGetJokes, (_: Request, response: Response) => {
  response.json(response.locals.jokes);
});

// Add new joke
apiRouter.post('/joke', dbSaveJoke, (_: Request, response: Response) => {
  response.status(201).json(response.locals.dbResponse);
});

export default apiRouter;
