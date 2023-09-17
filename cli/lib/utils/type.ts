import Choices from 'inquirer/lib/objects/choices';
import { InquirerTypeEnum } from './enums';

export type InquirerOptions = {
  choices: Choices;
  defaultValue: string;
  message: string;
  type: InquirerTypeEnum;
  require: boolean;
  mask: string;
  validate: (input: unknown) => boolean;
  pageSize: number;
  loop: boolean;
};
