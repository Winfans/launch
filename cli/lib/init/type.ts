export interface InitCommandOptions {
  force?: boolean;
  template?: string;
}

export interface TemplateInfo {
  projectName: string;
  template: Template;
  targetPath: string;
}

export interface Template {
  name: string;
  npmName: string;
  version: string;
}
