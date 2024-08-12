type BaseQueryResult<T> = {
  data: T;
  code?: number;
  success?: boolean;
};

export const transformApiResponse: any = (data: BaseQueryResult<any>) => {
  // return { data, code: 0, success: true };
  return data?.data;
  // return { ...data.data, code: data.code, success: data.success };
};
