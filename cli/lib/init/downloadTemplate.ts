import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import { execa } from 'execa';
import { log, getVersion } from '../utils';
import ora from 'ora';
import { Template, TemplateInfo } from './type';
import { GITHUB_PATH } from './constant';
import semver from 'semver';

async function downloadSelectedTemplate(targetPath: string, template: Template) {
  const { npmName } = template;
  const githubPath = `${GITHUB_PATH}/${npmName}.git`;
  log.verbose('githubPath', githubPath);
  // const installArgs = ['install', `${npmName}@${version}`];
  const installCommand = 'git';
  const installArgs = ['clone', githubPath, targetPath];
  await execa(installCommand, installArgs);
}

export default async function downloadTemplate(templateInfo: TemplateInfo) {
  const spinner = ora('正在下载模板...').start();

  log.verbose('templateInfo', templateInfo as any);
  const { targetPath, template } = templateInfo;

  const version = await getVersion(template.npmName);
  log.verbose('template version', version);
  const npmPkgFilePath = `${targetPath}/package.json`;

  // 判断是否是第二次下载
  if (pathExistsSync(npmPkgFilePath)) {
    const pkg = fse.readJSONSync(npmPkgFilePath);
    log.verbose('template cache version', pkg?.version as string);

    // 判断版本是否一致
    if (!semver.eq(version, pkg?.version)) {
      fse.removeSync(targetPath);
      fse.mkdirpSync(targetPath);
    } else {
      spinner.stop();
      return;
    }
  } else {
    fse.mkdirpSync(targetPath);
  }

  try {
    await downloadSelectedTemplate(targetPath, template);
    spinner.stop();
  } catch (e) {
    log.error('下载失败', e as any);
    spinner.stop();
  }
}
