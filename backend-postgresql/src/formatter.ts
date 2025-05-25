import { ApolloServerPlugin } from '@apollo/server';

export const responseFormatterPlugin = (): ApolloServerPlugin => ({
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        const response = requestContext.response;

        if (response.body.kind === 'single') {
          const originalData = response.body.singleResult.data;
          const errors = response.body.singleResult.errors || null;

          if (originalData) {
            response.body.singleResult = {
              data: extractData(originalData),
            };
          } else if (errors) {
            response.body.singleResult = {
              data: null,
              errors,
            };
          }
        }
      },
    };
  },
});

function extractData(response: Record<string, any>): any {
  const [key] = Object.keys(response);

  if (key && response[key]) {
    return response[key];
  }
  return null;
}
