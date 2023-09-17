import fse from 'fs-extra';
import path from 'node:path';
import { pathExistsSync } from 'path-exists';
import ora from 'ora';
import { log } from '../utils';
import { InitCommandOptions, Template, TemplateInfo } from './type';

function getCacheFilePath(targetPath: string, template: Template) {
  return path.resolve(targetPath, template.npmName);
}

export default function installTemplate(templateInfo: TemplateInfo, opts: InitCommandOptions) {
  const { force = false } = opts;
  const { targetPath, projectName, template } = templateInfo;
  const rootDir = process.cwd();
  fse.ensureDir(targetPath);
  const installDir = path.resolve(`${rootDir}/${projectName}`);
  log.verbose('installPath', installDir);
  if (pathExistsSync(installDir)) {
    if (!force) {
      // error
    } else {
      fse.removeSync(installDir);
      fse.ensureDirSync(installDir);
    }
  } else {
    fse.ensureDirSync(installDir);
  }

  // const originFile = getCacheFilePath(targetPath, template);
  const spinner = ora('正在拷贝模板文件...').start();
  fse.copySync(targetPath, installDir);
  spinner.stop();
  log.success('模板拷贝成功');
}
