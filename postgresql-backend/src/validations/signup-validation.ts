import { body } from 'express-validator';

export const signUpValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 20 })
    .withMessage('Passwords must match!'),
];
