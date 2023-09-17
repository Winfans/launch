import { service } from './request';

export type ExampleResponseData = {
  id: string;
};

export interface ExampleRequestParams {
  name: string;
}

export const getExampleService = (params: ExampleRequestParams) => {
  return service.call<ExampleResponseData>({
    apiName: '/candles',
    params,
    options: {
      method: 'GET',
    },
  });
};
