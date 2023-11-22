import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

//==================== declear the parser ===============
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Ecommerce server is running successfully!!!');
});

export default app;
