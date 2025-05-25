import { print } from 'graphql';

import { signInSchema } from '../../graphql/signIn-schema';
import { signUpSchema } from '../../graphql/signUp-schema';

import baseQuery from '../bases/baseQuery';
import { transformApiErrorResponse } from '../bases/transformApiErrorResponse';
import { transformApiResponse } from '../bases/transformApiResponse';
import createApi from '../middlewares/createApi';

import { SignUpRequest } from '../../type/libs/auth';

export const authenticationService = createApi({
  reducerPath: 'authenticationService',
  baseQuery: baseQuery(),
  tagTypes: ['Branch'],
  endpoints: (builder) => ({
    signUp: builder.mutation<any, SignUpRequest>({
      query: (args) => ({
        url: '',
        method: 'POST',
        body: {
          query: print(signUpSchema),
          variables: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
            confirmPassword: args.confirmPassword,
          },
        },
      }),
      extraOptions: {
        maxRetries: 0,
      },

      transformResponse: transformApiResponse,
      transformErrorResponse: transformApiErrorResponse,
    }),
    signIn: builder.mutation<any, any>({
      query: (args) => ({
        url: '',
        method: 'POST',
        body: {
          query: print(signInSchema),
          variables: {
            email: args.email,
            password: args.password,
          },
        },
      }),
      extraOptions: {
        maxRetries: 0,
      },

      transformResponse: transformApiResponse,
      transformErrorResponse: transformApiErrorResponse,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authenticationService;

export default authenticationService;
