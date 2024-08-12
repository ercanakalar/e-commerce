import baseQuery from '../bases/baseQuery';
import { transformApiErrorResponse } from '../bases/transformApiErrorResponse';
import { transformApiResponse } from '../bases/transformApiResponse';
import createApi from '../middlewares/createApi';

export const authenticationService = createApi({
  reducerPath: 'authenticationService',
  baseQuery: baseQuery(),
  tagTypes: ['Branch'],
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (args) => ({
        url: args?.to === 'email' ? 'mail-otp' : 'customer/login',
        method: 'POST',
        body: {
          phone: args.phone,
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

export const { useLoginMutation } = authenticationService;

export default authenticationService;
