import chalk from 'chalk';
import path from 'path';
import { IConfig } from '@oclif/config';
import * as os from 'os';
import { getBanner, showBanner } from '../banner';
import { showQuote } from '../quotes';
import { toolTag } from '../viking-tools';
import VikingCommand from '../viking-command';
import cleanupMavenLocalRepositories from '../cleanup-maven-local-repositories';
import cleanupDirs from '../cleanup-dirs';

export default class CleanupProjectsCommmand extends VikingCommand {
  static description = 'clean up build files of projects\n'
    + 'Cleans up the build files of the projects on your machine:\n'
    + 'This command:\n'
    + ' * deletes build files of Maven projects,\n'
    + ' * deletes build files of npm projects,\n'
    + ' * prunes docker containers/images';

  static examples = [
    `$ viking-tool cleanup-projects\n${
      getBanner()
    }${toolTag()} ${chalk.grey('Clean up finished.')}`,
  ];

  constructor(argv: string[], config: IConfig) {
    super(argv, config);
    this.initUserConfig();
  }

  async run() {
    const dirs = this.getDirs();
    const dirsNamesToIgnore = this.getDirsNamesToIgnore();
    const mavenLocalDirs = this.getMavenLocalDirs();

    return this.promiseChain()
      .then(showBanner())
      .then(showQuote())
      .then(cleanupDirs(dirs, dirsNamesToIgnore))
      .then(cleanupMavenLocalRepositories(mavenLocalDirs))
      .then(() => {
        this.status('');
        this.log('Clean up finished.');
        this.close();
      });
  }

  protected listener() {
    return (eventType: string, data: any) => {
      switch (eventType) {
        case 'cleanup-dirs:check-directory':
          this.status(
            `${toolTag()} ${chalk.grey('Checking directory')} ${
              chalk.cyan(data.substr(0, 100))} ${
              chalk.grey('...')}`,
          );
          break;
        case 'cleanup-dirs:file-deleted':
          this.status('');
          this.log(`${chalk.cyan(data)} deleted.`);
          break;
        case 'cleanup-dirs:dir-not-exists':
          this.status('');
          // eslint-disable-next-line no-console
          console.warn(
            `${toolTag()} ${chalk.redBright('[WARNING]')} ${chalk.redBright('Directory')} ${
              chalk.cyan(data.substr(0, 100))} ${
              chalk.redBright('is not exists. (config:')} ${chalk.cyan(this.userConfig.path)}${chalk.redBright(')')}`,
          );
          break;
        case 'cleanup-maven-local-repositories:no-dirs-configured':
          this.status('');
          // eslint-disable-next-line no-console
          console.warn(
            `${toolTag()} ${chalk.redBright('[WARNING]')} ${chalk.redBright('No Maven local repositories configured. (config:')} ${chalk.cyan(this.userConfig.path)}${chalk.redBright(')')}`,
          );
          break;
        case 'cleanup-maven-local-repositories:delete-directory':
          this.status(
            `${toolTag()} ${chalk.grey('Cleaning up')} ${
              chalk.cyan(data.substr(0, 100))} ${
              chalk.grey('Maven local repository ...')}`,
          );
          break;
        default:
          super.listener()(eventType, data);
      }
    };
  }

  private getDirs() {
    return this.userConfig.get('cleanup-projects.dirs');
  }

  private getDirsNamesToIgnore() {
    return this.userConfig.get('cleanup-projects.ignore');
  }

  private getMavenLocalDirs(): string[] {
    return this.userConfig.get('cleanup-projects.maven-local-dirs') || [];
  }

  private initUserConfig() {
    this.setUserConfigDefaultValue('cleanup-projects', {
      dirs: [],
      ignore: [
        '.git',
        '.mule',
        '.idea',
        '.metadata',
        'target',
        'node_modules',
        'coverage',
        '.nyc_output',
      ],
      'maven-local-dirs': [
        `${os.homedir() + path.sep}.m2${path.sep}repository`,
      ],
    });
    if (this.getDirs().length === 0) {
      this.error(
        chalk.red('There is no target directory configured in the ')
        + chalk.cyan(path.join(this.config.configDir, 'config.json'))
        + chalk.red(' configuration file.'),
        { exit: 1 },
      );
    }
  }
}
