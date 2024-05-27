import { Database } from './config/db';
import App from './app';
import { createAuthTable } from './model/auth-model';
import { AuthConnectedListener } from './events/listeners/auth-connect-listener';
import { redisWrapper } from './redis-connect';
import { Subjects } from '../../common/src/events/subjects';

const start = async () => {
  try {
    new Database().connect();
    createAuthTable();

    let redisClient;

    // Retry connection with backoff
    const retryConnection = async () => {
      try {
        await redisWrapper.connect();
        redisClient = redisWrapper.client;
      } catch (error) {
        console.log('Error connecting to Redis. Retrying in 5 seconds...');
        setTimeout(retryConnection, 5000); // Retry after 5 seconds
        return;
      }

      new AuthConnectedListener(redisWrapper.subscriber).listen(Subjects.AuthConnected)

      const app = new App();
      app.middleware();
      app.run();
    };

    await retryConnection();
  } catch (error) {
    console.log(error, 'error connecting to db or Redis');
  }
};

start();
