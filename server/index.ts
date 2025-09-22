import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { z } from 'zod' (When we start validation)

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT ?? 3001);

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/api/health');
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
