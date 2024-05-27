import { json } from 'body-parser';
import express, { Application} from 'express';
import { Server, createServer } from 'http';
import cors from 'cors';

import { AuthPayload } from '../../common/src/types/auth/authPayload';
import { NotFoundError, errorHandler } from '../../common/src/errors';

import { profileRouter } from './routes/profileRouter';

declare global {
  namespace Express {
    interface Request {
      currentAuth?: AuthPayload;
    }
  }
}
class App {
  public app: Application;
  public httpServer: Server;
  public server: any;
  public io: any;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);
  }

  public middleware(): void {
    this.app.set('trust proxy', true);
    this.app.use(json());
    this.app.use(cors());

    this.app.use('/v1/api/profile', profileRouter);

    this.app.all('*', async () => {
      throw new NotFoundError('Route not found!');
    });
    this.app.use(errorHandler);
  }

  public async run(): Promise<void> {
    const port = process.env.PORT;
    this.app.listen(port || 4001, () => {
      console.log(`🚀 Server ready at ${port}`);
    });
  }
}

export default App;
