import { program } from 'commander';
import { log } from './utils';
import semver from 'semver';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'node:path';
import { LOWEST_NODE_VERSION, __dirname } from './constants';
import { PREFIX } from './init/constant';

const pkg = fse.readJSONSync(path.resolve(__dirname, '../../package.json'));
/**
 * check node version
 */
function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red`launch need node version >= ${LOWEST_NODE_VERSION}`);
  }
}

function preAction() {
  checkNodeVersion();
}

export default function createCLI() {
  log.info('version', pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', 'debug mode', false)
    .hook('preAction', preAction);

  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose(PREFIX, 'debug start');
    }
  });

  program.on('command:*', (obj) => {
    log.error(PREFIX, `unkown command:${obj[0]}`);
  });

  return program;
}
