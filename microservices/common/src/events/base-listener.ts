import { createClient, RedisClientType } from 'redis';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  private subscriber: RedisClientType<any, any>;

  constructor(subscriber: RedisClientType<any, any>) {
    this.subscriber = subscriber;

    this.subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));
  }

  async connect() {
    await this.subscriber.connect();
  }

  async listen(channel: string) {
    await this.subscriber.subscribe(channel, (message) => {
      console.log(`Message received on channel ${channel}`);
      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, {
        ack: () => {
          console.log('Message acknowledged');
          // Perform any necessary acknowledgment logic here
          return parsedData;
        },
      });
      return parsedData;
    });
  }

  parseMessage(message: string) {
    return JSON.parse(message);
  }

  // Method to be implemented by subclasses
  abstract onMessage(data: T['data'], msg: { ack: () => void }): void;
}
