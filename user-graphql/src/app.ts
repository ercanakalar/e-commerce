import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import authResolvers from './models/auth-model/user-resolvers';
import { userRouter } from './routes/userRoutes';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { profileRouter } from './routes/profileRouter';
import profileResolvers from './models/profile-model/profile-resolvers';
import authTypeDefs from './models/auth-model/user-schema';
import profileTypeDefs from './models/profile-model/profile-schema';

class App {
  public app: express.Application;
  public httpServer: http.Server;
  public server: any;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
  }

  public middleware(): void {
    this.app.set('trust proxy', true);
    this.app.use(json());
    this.app.use(cors());
    this.app.use('/api/users', userRouter);
    this.app.use('/api/profiles', profileRouter)

    this.app.all('*', async () => {
      throw new NotFoundError('Route not found!');
    });
    this.app.use(errorHandler);
  }

  public async run(): Promise<void> {
    this.middleware();
    this.server = new ApolloServer({
      typeDefs: [authTypeDefs, profileTypeDefs],
      resolvers: [authResolvers, profileResolvers],
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),

      ],
      status400ForVariableCoercionErrors: true,
    });

    const { url } = await startStandaloneServer(this.server, {
      context: async ({ req, res }) => ({ req, res }),
      listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
  }
}

export default App;