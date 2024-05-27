import { Socket } from 'socket.io';
import { redisClient } from './redis'; // Assuming you have a Redis client setup

interface Event {
  subject: string;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  protected io: Socket;
  protected redisClient: any;

  constructor(io: Socket, redisClient: any) {
    this.io = io;
    this.redisClient = redisClient;
  }

  async publish(data: T['data']): Promise<void> {
    try {
      // Publish to Redis
      await this.redisClient.publish(this.subject, JSON.stringify(data));
      console.log('Event published to Redis channel', this.subject);

      // Emit to Socket.IO
      this.io.emit(this.subject, data);
      console.log('Event emitted to Socket.IO channel', this.subject);
    } catch (err) {
      console.error('Error publishing event', err);
    }
  }
}
