import chalk from 'chalk';
import { Caller, getVersion } from './viking-tools';

export const getBanner = () => {
  const cliVersion = getVersion();
  const versionLength = cliVersion.length;
  const versionLinePrefix = ' Version: ';
  const versionLinePostfix = ' ';
  const fullLength = versionLength + versionLinePrefix.length + versionLinePostfix.length;
  const title = 'Viking\'s CLI Tools.';

  const titleLineSpacesNumberBefore = Math.floor((fullLength - title.length) / 2);
  const titleLineSpacesNumberAfter = fullLength - titleLineSpacesNumberBefore - title.length;

  const horizontalBorder = '─'.repeat(fullLength);
  const titleLineSpacesBefore = ' '.repeat(titleLineSpacesNumberBefore);
  const titleLineSpacesAfter = ' '.repeat(titleLineSpacesNumberAfter);

  return `${String(chalk.gray('    ,       ,  /\\_[]_/')) + chalk.red('\\')}\n${
    chalk.gray('    |\\ ___ /| |] _||_ ')}${chalk.red('[|')}\n${
    chalk.gray('     -/___\\-   \\/ || ')}${chalk.red('\\/')}\n${
    chalk.gray('     (|o o|)      ||')}\n${
    chalk.gray('   __/{\\U/}\\_ ___/vvv')}\n${
    chalk.gray('  / \\  {~}   / _|_ |')}\n${
    chalk.gray('  | /\\  ~   /_/   []')}\n${
    chalk.gray('  |_| (____)     ')}${chalk.white(`╭${horizontalBorder}╮`)}\n${
    chalk.gray('  \\_]/______\\    ')}${chalk.white('│')}${titleLineSpacesBefore}${chalk.yellow('Viking\'s')}${chalk.cyan(' CLI Tools.')}${titleLineSpacesAfter}${chalk.white('│')}\n${
    chalk.gray('     _\\_||_/_    ')}${chalk.white('│ ')}${chalk.gray('Version: ')}${chalk.green(cliVersion)}${chalk.white(' │')}\n${
    chalk.gray('    (_,_||_,_)   ')}${chalk.white(`╰${horizontalBorder}╯`)}\n`;
};

export const showBanner = () => (caller: Caller) => new Promise<Caller>((resolve) => {
  // eslint-disable-next-line no-console
  console.info(getBanner());
  resolve(caller);
});
