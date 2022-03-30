import userRouter from './user';
import authRouter from './auth';
import collectionRouter from './collection';
import taskRouter from './task';

function route(app: any): void {
  app.use('/', authRouter);
  app.use('/users', userRouter);
  app.use('/collections', collectionRouter);
  app.use('/tasks', taskRouter);
}

export default route;
