import express, { Request, Response } from 'express';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';

const app = express();

// middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog Is Running',
  });
});

// Error handling middleware
app.use(globalErrorHandler);

// Not found middleware
app.use(notFound);

export default app;
