// Aman and Yuan, this is where we would setup our database connections

// I am only hard coding these for now as fixture data

import { JokeType } from '../types.js';

export const jokes: JokeType[] = [
  {
    id: 'jarvis-unique-abcd',
    text: 'How do you catch a unique rabbit? Unique up on it.',
    source: 'Randall Jarvis',
  },
  {
    id: 'jarvis-tame-efgh',
    text: 'How do you catch a tame rabbit? Tame way!',
    source: 'Randall Jarvis',
  },
];
