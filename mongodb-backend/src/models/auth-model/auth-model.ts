import mongoose from 'mongoose';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

import { PasswordManager } from '../../utils';
import { AuthAttrs, AuthDoc, AuthModal } from '../../types/auth/authDBModelTypes';

dotenv.config();

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', "seller"],
      default: 'user',
    },
    createdAt: {
      // When auth was created
      type: Date,
    },
    updatedAt: {
      // When auth was updated
      type: Date,
    },
    passwordChangedAt: {
      // When password was changed
      type: Date,
    },
    passwordResetToken: {
      // Token to reset password
      type: String,
    },
    passwordResetExpires: {
      // When token to reset password expires
      type: Date,
    },
    expireToken: {
      // When token time expires
      type: String,
    },
    active: {
      // If auth is active
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

authSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  if (this.isModified('confirmPassword')) {
    const hashed = await PasswordManager.toHash(this.get('confirmPassword'));
    this.set('confirmPassword', hashed);
    let newDate = new Date();
    newDate.setHours(newDate.getHours() + 3, newDate.getMinutes());
    this.set('createdAt', newDate);
  }
  done();
});

authSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  const loggedAt = new Date(JWTTimestamp + 3 * 60 * 60 * 1000).getTime();
  const oldPasswordChangedAt = new Date(
    this.get('passwordChangedAt')
  ).getTime();

  if (oldPasswordChangedAt > loggedAt) {
    return true;
  }
  return false;
};

authSchema.methods.createPasswordResetToken = function () {
  const passwordResetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(passwordResetToken)
    .digest('hex');

  let newDate = new Date();
  newDate.setHours(newDate.getHours() + 3, newDate.getMinutes() + 5);
  const time = new Date(newDate).getTime();
  this.set('passwordResetExpires', time);

  return passwordResetToken;
};

authSchema.statics.build = (attrs: AuthAttrs) => {
  return new Auth(attrs);
};

const Auth = mongoose.model<AuthDoc, AuthModal>('Auth', authSchema);

export { Auth };
