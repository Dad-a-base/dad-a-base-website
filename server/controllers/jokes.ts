import type { Request, Response, NextFunction } from 'express';

import { jokes } from '../db/index.js';

export async function dbGetJokes(
  _: Request,
  response: Response,
  next: NextFunction
) {
  response.locals.jokes = jokes;
  next();
}

export async function dbSaveJoke(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(`joke: ${JSON.stringify(request.body)}`);
  // Save to database
  response.locals.dbResponse = 'Joke (not really) saved to database.';
  next();
}
