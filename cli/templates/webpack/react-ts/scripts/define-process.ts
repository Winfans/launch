import { EnvEnum } from './constants';

const env = process.env.ENV;

let apiBaseUrl = 'https://api.example.com';

if (env !== EnvEnum.PROD) {
  apiBaseUrl = 'https://api.example.com';
}

const defineVar: Record<string, unknown> = {
  API_BASE_URL: apiBaseUrl,
};

const finalDefineVar: Record<string, any> = {};

Object.keys(defineVar).forEach((key) => (finalDefineVar[key] = JSON.stringify(defineVar[key])));

export default finalDefineVar;
