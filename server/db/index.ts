// Aman and Yuan, this is where we would setup our database connections

// I am only hard coding these for now as fixture data

import { JokeType } from '../types.js';

export const jokes: JokeType[] = [
  { id: '1', text: 'Why dont programmers like nature? Too many bugs.' },
  {
    id: '2',
    text: 'Why do Java developers wear glasses? Because they dont see sharp.',
  },
  {
    id: '3',
    text: 'How many programmers does it take to change a light bulb? None, its a hardware problem.',
  },
];
