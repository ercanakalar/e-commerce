import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'auth' })
@ObjectType()
export class Auth {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  confirm_password: string;

  @Column({ default: 'user' })
  @Field()
  role: string;

  @Column({ nullable: true })
  @Field()
  password_reset_token: string;

  @Column({ nullable: true })
  @Field()
  password_reset_expires: string;

  @Column({ nullable: true })
  @Field()
  expire_token: string;

  @Column({ default: true })
  @Field()
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  updated_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field()
  password_changed_at: Date;
}
