import type { Request, Response, NextFunction } from 'express';

import { Joke } from '../models/jokeModel.js';
import { z } from 'zod';

const jokeSchema = z.object({
  text: z.string().min(1, 'Joke text is required'),
  source: z.string().min(1, 'Source is required'),
});

export function dbGetJokes(_: Request, response: Response, next: NextFunction) {
  Joke.find({})
    .exec()
    .then((data) => {
      response.locals.jokes = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dbGetJokes: error querying database: ${err.message}`,
        message: { err: 'Failed to retrieve jokes from database' },
      });
    });
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
  // TODO: This could also be done with Zod
  if (!request.body.hasOwnProperty('joke')) {
    return next({
      log: `"joke" key not found in: request.body`,
      message: { err: 'body does not have "joke" key' },
    });
  }

  try {
    const validated = jokeSchema.parse(request.body.joke);
    // Extra caution: Extract joke contents
    const { text, source } = validated;

    // Save to database
    const savedJoke = await Joke.create({ text, source });
    response.locals.dbResponse = savedJoke;

    return next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next({
        log: `Validation failed: ${err.issues.map((issue) => issue.message).join(', ')}`,
        message: { err: 'Invalid joke input' },
      });
    }

    return next({
      log: `dbSaveJoke: error creating joke: ${String(err)}`,
      message: { err: 'Failed to save joke' },
    });
  }
}
