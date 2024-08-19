import { FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import appConfig from '../../constants/appConfig';

const requestError = (error: any) => ({
  message: error?.response?.statusText || 'An error occurred',
  status: error?.response?.status || 500,
  data: error?.response?.data || {},
});

interface IBaseQueryResult<T> {
  data?: T;
  error?: { data: any; errors: any };
  meta?: { response?: Response };
}

interface IErrorType {
  error: string;
  message?: string;
  code?: number;
  [key: string]: any;
}

const baseQuery = () =>
  retry(
    async (args: FetchArgs, api, extraOptions) => {
      const result = await fetchBaseQuery({
        baseUrl: appConfig.baseUrl,
        prepareHeaders: (headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      })(
        {
          ...args,
        },
        api,
        extraOptions
      );
      
      const response = result as IBaseQueryResult<any>;
      if (response?.meta?.response && response.meta.response.status !== 200 && response?.error?.data) {
        const error = requestError({
          response: {
            status: response.meta.response.status,
            code: response.meta.response.status,
            data: response.error.data,
            errors: response.error.data.errors,
          },
        });

        if (error && error.message) {
          toast.error(error.message, {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }

        return {
          error: {
            error: error as unknown as IErrorType,
          },
        };
      }
      return result;
    },
    { maxRetries: 0 }
  );

export default baseQuery;
