import { log, makeInput, makeList } from '../utils';
import { homedir } from 'node:os';
import path from 'node:path';
import { TEMPLATES, TEMP_HOME } from './constant';
import { InitCommandOptions, TemplateInfo } from './type';

// function getCreateType() {
//   return makeList({
//     choices: TYPE,
//     message: '请选择初始化类型',
//     defaultValue: TYPE_PROJECT,
//   });
// }

function getProjectName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: 'launch',
    // validate() { }
  });
}

function getTemplate() {
  return makeList({
    choices: TEMPLATES,
    message: '请选择项目模板',
  });
}

function makeTargetPath(template: string) {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, template);
}

const createTemplate = async (
  name: string,
  options: InitCommandOptions,
): Promise<TemplateInfo | void> => {
  const { template } = options;

  let addName: string;
  let addTemplate: string;

  if (name) {
    addName = name;
  } else {
    addName = await getProjectName();
  }

  log.verbose('Project Name', addName);

  if (template) {
    addTemplate = template;
  } else {
    addTemplate = await getTemplate();
  }

  log.verbose('项目模板', addTemplate);

  const selectedTemplate = TEMPLATES.find((item) => item.name === addTemplate);
  log.verbose('选中的项目模板', selectedTemplate as any);

  if (!selectedTemplate) {
    log.error('没有对应的项目模板', '');
    return;
  }

  // const latestVersion = await getLatestVersion(selectedTemplate.npmName);
  // log.verbose('latestVersion', latestVersion);
  // selectedTemplate.version = latestVersion;

  const targetPath = makeTargetPath(selectedTemplate.npmName);
  log.verbose('targetPath', targetPath);

  return {
    // type: addType,
    projectName: addName,
    template: selectedTemplate,
    targetPath,
  };
  // }
};

export default createTemplate;
