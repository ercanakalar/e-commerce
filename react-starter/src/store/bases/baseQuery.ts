import { FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query';

const baseQuery = (baseUrl?: { baseUrl: string }) =>
  retry(
    async (args: FetchArgs, api, extraOptions) => {
      await mutex.waitForUnlock();
      const result = await fetchBaseQuery(
        baseUrl ?? { baseUrl: appConfig.baseUrl }
      )(
        {
          ...args,
          headers: {
            ...args.headers,
            ...getHeaders(),
          },
        },
        {
          ...api,
        },
        extraOptions
      );
      const response = result as any as IBaseQueryResult<any>;
      if (
        response?.meta?.response &&
        response.meta.response.status !== 200 &&
        !!response.error.data
      ) {
        const error = requestError({
          response: {
            status: response.meta.response.status,
            code: response.meta.response.status,
            data: response.error.data,
            errors: response.error.data.errors,
          },
        });
        if (error && error.message) {
          console.log(error.message, 'error.message-000');
          toast.error(error.message, {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }

        // if (error.status === 401) {
        //   return {
        //     data: {
        //       data: {
        //         ...error,
        //       },
        //       status: response.meta.response.status,
        //       success: false,
        //     },
        //   };
        // }

        return {
          error: {
            error: error as IErrorType,
          },
        };
      }
      return result;
    },
    { maxRetries: 0 }
  );
export default baseQuery;
