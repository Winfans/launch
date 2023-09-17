import log from 'npmlog';
import { isDebug } from './utils';
import { LogLevelEnum } from './enums';
import {
  LOG_LEVEL_SUCCESS_BOLD,
  LOG_LEVEL_SUCCESS_FG,
  LOG_LEVEL_SUCCESS_NUMBER,
} from './constants';
import { PREFIX } from '../init/constant';

if (isDebug()) {
  log.level = LogLevelEnum.VERBOSE;
} else {
  log.level = LogLevelEnum.INFO;
}

log.heading = PREFIX;

log.addLevel(LogLevelEnum.SUCCESS, LOG_LEVEL_SUCCESS_NUMBER, {
  fg: LOG_LEVEL_SUCCESS_FG,
  bold: LOG_LEVEL_SUCCESS_BOLD,
});

export default log;
