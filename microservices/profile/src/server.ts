import { Database } from './config/db';
import App from './app';
import { redisWrapper } from './redis-connect';
import { Subjects } from '../../common/src/events/subjects';
import { createProfileTable } from './model/profile-model';
import { ProfileCreateListener } from './events/listeners/profile-create-listener';
import { AuthSignInListener } from './events/listeners/auth-signin-listener';

const start = async () => {
  try {
    new Database().connect();
    createProfileTable();

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

      new ProfileCreateListener(redisWrapper.subscriber).listen(
        Subjects.AuthConnected
      );
      new AuthSignInListener(redisWrapper.subscriber).listen(
        Subjects.AuthConnected
      );

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
