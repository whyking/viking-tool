import * as chai from 'chai';
import { expect } from 'chai';
import chalk from 'chalk';
import Configstore from 'configstore';
import path from 'path';
import { CLIError } from '@oclif/errors';
import * as os from 'os';
import stripAnsi from 'strip-ansi';
import { v4 as createUuid } from 'uuid';
import * as fs from 'fs';
import { mkdirSync } from 'fs';
import CleanupProjectsCommmand from '../../src/commands/cleanup-projects';
// @ts-ignore
import test from '../test';
import { getBanner } from '../../lib/banner';
import { quotes } from '../../lib/quotes';

chai.should();
chai.use(require('chai-as-promised'));

describe(
  'OCLIF Command `cleanup-projects`', () => {
    it('Test `viking-tools cleanup-projects` without configured directories.', () => test()
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.an.instanceOf(CLIError, 'It should be a OCLIF error.');

        expect(context.error.message).to.equal(
          chalk.red('There is no target directory configured in the ')
          + chalk.cyan(`${context.tmpDir}${path.sep}config.json`)
          + chalk.red(' configuration file.'),
          'Error message should be well formed.',
        );
      }));

    it('Test `viking-tools cleanup-projects` with empty dir.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        config.set({
          'cleanup-projects': {
            dirs: [
              context.tmpDir,
            ],
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
          },
        });
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');
        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.tmpDir} ...`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );
      }));

    it('Test `viking-tools cleanup-projects` with invalid dir.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        const nonExistingDir = path.join(os.tmpdir(), `NON-EXISTING-${createUuid()}`);

        config.set({
          'cleanup-projects': {
            dirs: [
              nonExistingDir,
            ],
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
          },
        });

        context.data.nonExistingDir = nonExistingDir;

        return context;
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');
        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.data.nonExistingDir} ...`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );

        expect(stripAnsi(context.stderr)).to.equal(
          `[Viking's CLI Tools] [WARNING] Directory ${context.data.nonExistingDir} is not exists. (config: ${context.tmpDir}${path.sep}config.json)\n`
          + `[Viking's CLI Tools] [WARNING] No Maven local repositories configured. (config: ${context.tmpDir}${path.sep}config.json)\n`,
        );
      }));

    it('Test `viking-tools cleanup-projects` with multiple directories.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        mkdirSync(path.join(context.tmpDir, 'project-01'));
        mkdirSync(path.join(context.tmpDir, 'project-02'));
        mkdirSync(path.join(context.tmpDir, 'project-03'));

        config.set({
          'cleanup-projects': {
            dirs: [
              path.join(context.tmpDir, 'project-01'),
              path.join(context.tmpDir, 'project-02'),
              path.join(context.tmpDir, 'project-03'),
            ],
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
          },
        });
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');
        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-01 ...`
          + `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-02 ...`
          + `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-03 ...`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );
      }));

    it('Test `viking-tools cleanup-projects` with subfolders.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        mkdirSync(path.join(context.tmpDir, 'project-01'));
        mkdirSync(path.join(context.tmpDir, 'project-01', 'level-01'));
        mkdirSync(path.join(context.tmpDir, 'project-01', 'level-01', 'level-02'));

        config.set({
          'cleanup-projects': {
            dirs: [
              path.join(context.tmpDir, 'project-01'),
            ],
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
          },
        });
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');
        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-01 ...`
          + `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-01${path.sep}level-01 ...`
          + `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}project-01${path.sep}level-01${path.sep}level-02 ...`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );
      }));

    it('Test `viking-tools cleanup-projects` with an npm project.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        mkdirSync(path.join(context.tmpDir, 'npm'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'package.json'), '--dummy--');
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'dummy.zip'), '--dummy--');
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'dummy.tgz'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'npm', 'node_modules'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'node_modules', 'dummy'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'npm', '.nyc_output'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', '.nyc_output', 'dummy'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'npm', 'coverage'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'coverage', 'dummy'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'npm', 'dist'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'dist', 'dummy'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'npm', 'tmp'));
        fs.writeFileSync(path.join(context.tmpDir, 'npm', 'tmp', 'dummy'), '--dummy--');

        config.set({
          'cleanup-projects': {
            dirs: [
              path.join(context.tmpDir, 'npm'),
            ],
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
          },
        });
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');
        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}npm ...`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}node_modules deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}.nyc_output deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}coverage deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}dist deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}tmp deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}dummy.tgz deleted.\n`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}npm${path.sep}dummy.zip deleted.\n`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );
      }));

    it('Test `viking-tools cleanup-projects` with a Maven project.', () => test()
      .do((context) => {
        const config = new Configstore('config', {}, {
          configPath: path.join(context.tmpDir, 'config.json'),
        });

        mkdirSync(path.join(context.tmpDir, 'mvn'));
        fs.writeFileSync(path.join(context.tmpDir, 'mvn', 'pom.xml'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, 'mvn', 'target'));
        fs.writeFileSync(path.join(context.tmpDir, 'mvn', 'target', 'dummy'), '--dummy--');

        mkdirSync(path.join(context.tmpDir, '.m2'));
        mkdirSync(path.join(context.tmpDir, '.m2', 'repository'));

        mkdirSync(path.join(context.tmpDir, '.m2-empty'));

        config.set({
          'cleanup-projects': {
            dirs: [
              path.join(context.tmpDir, 'mvn'),
            ],
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
              path.join(context.tmpDir, '.m2'),
              path.join(context.tmpDir, '.m2-empty'),
            ],
          },
        });
      })
      .do((context) => {
        process.env.VIKING_TOOL_CONFIG_DIR = context.tmpDir;
      })
      .command(() => CleanupProjectsCommmand.run())
      .then((context) => {
        expect(context.error).to.be.equal(null, 'It should be not an error.');

        expect(context.stdout).to.satisfy(
          (out: string) => out.startsWith(getBanner()),
          'The output should be start with the banner.',
        );

        const quoteLine = context.stdout.replace(`${getBanner()}\n`, '').split('\n').shift() || '';
        expect(quoteLine).to.equal(
          chalk.blue(stripAnsi(quoteLine)),
          'The quote line should be colored to blue.',
        );
        expect(quoteLine).to.satisfy(
          (quote: string) => quotes.includes(stripAnsi(quote)),
          `The line "${quoteLine}" should be available in the \`quotes\`.`,
        );

        const logOutput = context.stdout.replace(`${getBanner()}\n${quoteLine}\n`, '');

        expect(stripAnsi(logOutput)).to.equal(
          `[Viking's CLI Tools] Checking directory ${context.tmpDir}${path.sep}mvn ...`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}mvn${path.sep}target deleted.\n`
          + `[Viking's CLI Tools] Cleaning up ${context.tmpDir}${path.sep}.m2${path.sep}repository Maven local repository ...`
          + `[Viking's CLI Tools] ${context.tmpDir}${path.sep}.m2${path.sep}repository deleted.\n`
          + '[Viking\'s CLI Tools] Clean up finished.'
          + '\n',
        );
      }));
  },
);
