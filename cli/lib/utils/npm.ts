import urlJoin from 'url-join';
import axios from 'axios';
import log from './log';
import { NPM_REGISTRY } from './constants';

const getNpmInfo = (npmName: string) => {
  const url = urlJoin(NPM_REGISTRY, npmName);
  return axios.get(url).then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  });
};

export const getLatestVersion = (npmName: string) => {
  return getNpmInfo(npmName).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('', '没有latest版本号');
    }

    return data['dist-tags'].latest;
  });
};
