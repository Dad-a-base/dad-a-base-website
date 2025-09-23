import type { Request, Response, NextFunction } from 'express';

import { jokes } from '../db/index.js';

export async function dbGetJokes(
  _: Request,
  response: Response,
  next: NextFunction
) {
  response.locals.jokes = jokes;
  return next();
}

export async function dbSaveJoke(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.body) {
    return next({
      log: `request.body is empty (no joke)`,
      message: { err: 'Joke not included in body' },
    });
  }

  if (!request.body.hasOwnProperty('joke')) {
    return next({
      log: `"joke" key not found in: request.body`,
      message: { err: 'body does not have "joke" key' },
    });
  }

  const joke = request.body.joke;

  if (!joke.text || !joke.source) {
    return next({
      log: `"joke" object does not have "text" and "source": ${JSON.stringify(joke)}`,
      message: {
        err: 'Invalid joke contents: "text" and "source" are required.',
      },
    });
  }
  // Save to database
  response.locals.dbResponse = 'Joke (not really) saved to database.';
  return next();
}
