import inquirer from 'inquirer';
import { InquirerOptions } from './type';
import { InquirerTypeEnum } from './enums';

const make = ({
  choices,
  defaultValue,
  message = '请选择',
  type,
  require = true,
  mask = '*',
  validate,
  pageSize,
  loop,
}: InquirerOptions) => {
  const options = {
    name: 'name',
    default: defaultValue,
    message,
    type,
    require,
    mask,
    validate,
    pageSize,
    loop,
    choices,
  };

  if (type === InquirerTypeEnum.LIST) {
    options.choices = choices;
  }

  return inquirer.prompt(options as any).then((answer) => answer.name);
};

export const makeList = (params: InquirerOptions) => {
  return make({
    ...params,
    type: InquirerTypeEnum.LIST,
  });
};

export const makeInput = (params: InquirerOptions) => {
  return make({
    ...params,
    type: InquirerTypeEnum.INPUT,
  });
};
