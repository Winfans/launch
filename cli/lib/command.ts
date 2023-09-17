import { Command as Commander } from 'commander';

class Command {
  program: Commander;

  get command(): string {
    throw new Error('command must be implements');
  }

  get description(): string {
    throw new Error('command must be implements');
  }

  get options(): any[] {
    return [];
  }

  constructor(instance: Commander) {
    if (!instance) {
      throw new Error('command instance must not be null');
    }

    this.program = instance;
    const cmd = this.program.command(this.command as any);
    cmd.description(this.description as unknown as string);
    cmd.hook('preAction', () => {
      this.preAction();
    });
    cmd.hook('postAction', () => {
      this.postAction();
    });
    if (this.options?.length) {
      this.options.forEach((option: [string, string, any]) => {
        cmd.option(...option);
      });
    }
    cmd.action((...args) => {
      this.action(args);
    });
  }

  action(_: any) {
    throw new Error('action must be implements');
  }

  preAction() {}

  postAction() {}
}

export default Command;
