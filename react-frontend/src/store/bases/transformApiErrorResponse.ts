import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface IErrorType {
  errors: Record<string, string>;
  message: string;
  status: number;
  code: number;
}

type BaseQueryReturnValue = FetchBaseQueryError | { error: IErrorType };

export const transformApiErrorResponse = (
  baseQueryReturnValue: BaseQueryReturnValue
): unknown => {
  const defaultError: IErrorType = {
    errors: {
      error: 'Bir hata oluştu.',
    },
    message: 'Bir hata oluştu.',
    status: 500,
    code: 500,
  };

  if ('status' in baseQueryReturnValue && 'error' in baseQueryReturnValue) {
    if (typeof baseQueryReturnValue.error === 'string') {
      return {
        errors: { error: baseQueryReturnValue.error },
        message: 'Bir hata oluştu.',
        status: baseQueryReturnValue.status,
        code: 500,
      };
    }
  }

  if ('error' in baseQueryReturnValue) {
    return baseQueryReturnValue.error || defaultError;
  }

  return defaultError;
};
