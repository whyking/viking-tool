import * as path from 'path';
import Configstore from 'configstore';
import { IConfig } from '@oclif/config';
import { Command } from '@oclif/command';
import BottomBar from 'inquirer/lib/ui/bottom-bar';

import chalk from 'chalk';
import inquirer from 'inquirer';
import { Logger, promiseChain, toolTag } from './viking-tools';

export default abstract class VikingCommand extends Command {
  readonly userConfig: Configstore;

  protected ui: BottomBar | undefined;

  constructor(argv: string[], config: IConfig) {
    super(argv, config);
    this.userConfig = this.createConfigstore();
  }

  /**
   * Logs a message via OCLIF's `log()` method.
   *
   * @param message the messasge to log
   * @param args additional arguments
   */
  log(message?: string, ...args: any[]): void {
    super.log(`${toolTag()} ${chalk.grey(message || '')}`, ...args);
  }

  protected promiseChain() {
    const logger: Logger = {
      info: this.log,
      warn: this.warn,
      // eslint-disable-next-line no-console
      error: console.error,
    };

    const listener = this.listener();

    return promiseChain(logger, listener);
  }

  protected listener() {
    return (eventType: string, data: any) => {
      this.log(
        'Event received. Event type:',
        chalk.cyan(eventType),
        chalk.grey('data:'),
        chalk.cyan(data),
      );
    };
  }

  /**
   * Creates the `userConfig`.
   */
  private createConfigstore() {
    return new Configstore('config', {}, {
      configPath: path.join(this.config.configDir, 'config.json'),
    });
  }

  /**
   * If the given `key` not exists in the `userConfig` it creates the key
   * with the given `defaultValue`.
   *
   * @param key (json) key of the config
   * @param defaultValue the default value
   */
  protected setUserConfigDefaultValue(key: string, defaultValue: any) {
    if (!this.userConfig.has(key)) {
      this.userConfig.set(key, defaultValue);
    }
  }

  /**
   * Updates the status bar.
   *
   * @param message the message to display
   */
  status(message: string) {
    if (this.ui === undefined) {
      this.ui = new inquirer.ui.BottomBar();
    }
    this.ui.updateBottomBar(message);
  }

  protected close() {
    if (this.ui instanceof BottomBar) {
      // @ts-ignore
      this.ui.close();
    }
  }
}
