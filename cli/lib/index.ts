import createInitCommand from './init';
import createCLI from './createCLI';
import './exception';

export default function () {
  const program = createCLI();
  createInitCommand(program);
  program.parse(process.argv);
}
