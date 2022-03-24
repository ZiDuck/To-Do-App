import userRouter from "./user";
import collectionRouter from "./collection";
import taskRouter from "./task";
import authRouter from "./auth";


function route (app: any): void { 
    app.use('/', authRouter);    
    app.use('/users', userRouter);    
    app.use('/collections', collectionRouter);    
    app.use('/tasks', taskRouter);    
}

export default route;