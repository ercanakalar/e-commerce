import App from './app';
import { Database } from './config/db';
import { createAuthTable } from './models/auth-model/auth-model';
import { createProfileTable } from './models/profile-model/profile-model';

const start = async () => {
  try {
    new Database().connect()
    createAuthTable()
    createProfileTable()
    const app = new App();
    app.run();
  } catch (error) {
    console.log(error, 'error connecting to db');
  }
};

start();
