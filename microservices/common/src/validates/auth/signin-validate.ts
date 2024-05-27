import { body } from 'express-validator';

export const signinValidationRules = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
];
