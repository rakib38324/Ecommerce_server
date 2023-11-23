import express, { Request, Response } from 'express';
import cors from 'cors';
import { User_Routes } from './app/modules/users/users.route';
const app = express();

//==================== declear the parser ===============
app.use(express.json());
app.use(cors());


//===================== application route ===============
app.use('/api', User_Routes)
app.use('/api/users', User_Routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Ecommerce server is running successfully!!!');
});

export default app;
