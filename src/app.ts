import express, { Request, Response } from 'express';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { BlogRotues } from './module/Blog/blog.route';
import { userRoutes } from './module/User/user.route';
import { authRouters } from './module/auth/auth.route';

const app = express();

// middleware
app.use(express.json());

// blog middlewares

app.use('/api/blogs', BlogRotues);

// user middlewares

app.use('/api/users', userRoutes)

// auth middlewares
app.use('/api/auth', authRouters)



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
