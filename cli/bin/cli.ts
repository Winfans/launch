import importLocal from 'import-local';
import { log } from '../lib/utils';
import entry from '../lib/index.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

if (importLocal(__filename)) {
  log.info('cli', '使用本地版本');
} else {
  entry();
}
