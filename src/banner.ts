import * as chalk from 'chalk'

const packageJson = require('../package.json')

export const getVersion = () => packageJson.version

export const getBanner = () => {
  const cliVersion = getVersion()
  const versionLength = cliVersion.length
  const versionLinePrefix = ' Version: '
  const versionLinePostfix = ' '
  const fullLength = versionLength + versionLinePrefix.length + versionLinePostfix.length
  const title = 'Viking\'s CLI Tools.'

  const titleLineSpacesNumberBefore = Math.floor((fullLength - title.length) / 2)
  const titleLineSpacesNumberAfter = fullLength - titleLineSpacesNumberBefore - title.length

  const horizontalBorder = '─'.repeat(fullLength)
  const titleLineSpacesBefore = ' '.repeat(titleLineSpacesNumberBefore)
  const titleLineSpacesAfter = ' '.repeat(titleLineSpacesNumberAfter)

  return String(chalk.grey('    ,       ,  /\\_[]_/')) + chalk.red('\\') + '\n' +
    chalk.grey('    |\\ ___ /| |] _||_ ') + chalk.red('[|') + '\n' +
    chalk.grey('     -/___\\-   \\/ || ') + chalk.red('\\/') + '\n' +
    chalk.grey('     (|o o|)      ||') + '\n' +
    chalk.grey('   __/{\\U/}\\_ ___/vvv') + '\n' +
    chalk.grey('  / \\  {~}   / _|_ |') + '\n' +
    chalk.grey('  | /\\  ~   /_/   []') + '\n' +
    chalk.grey('  |_| (____)     ') + chalk.white(`╭${horizontalBorder}╮`) + '\n' +
    chalk.grey('  \\_]/______\\    ') + chalk.white('│') + titleLineSpacesBefore + chalk.yellow('Viking\'s') + chalk.cyan(' CLI Tools.') + titleLineSpacesAfter + chalk.white('│') + '\n' +
    chalk.grey('     _\\_||_/_    ') + chalk.white('│ ') + chalk.grey('Version: ') + chalk.green(cliVersion) + chalk.white(' │') + '\n' +
    chalk.grey('    (_,_||_,_)   ') + chalk.white(`╰${horizontalBorder}╯`) + '\n'
}
