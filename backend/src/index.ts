import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import App from './app';

const start = async () => {
  dotenv.config();
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const app = new App()
    app.run();
  } catch (error) {
    console.log(error, 'error connecting to db');
  }
};

start();
