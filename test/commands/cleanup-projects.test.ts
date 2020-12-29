import * as chai from 'chai';
import { expect } from 'chai';
import { stdout } from 'stdout-stderr';
import { Config } from '@oclif/config';
import * as os from 'os';
import Configstore from 'configstore';
import path from 'path';
import stripAnsi from 'strip-ansi';
import CleanupProjectsCommand from '../../src/commands/cleanup-projects';

chai.should();
chai.use(require('chai-as-promised'));

describe('`CleanupProjectsCommand` class', () => {
  it('Test listener called with unknown event type.', () => {
    class CleanupProjectsTestCommand extends CleanupProjectsCommand {
      public getListener() {
        return this.listener();
      }
    }

    const configStore = new Configstore('config', {}, {
      configPath: path.join(os.tmpdir(), 'config.json'),
    });
    configStore.set({
      'cleanup-projects': {
        dirs: [
          'placeholder',
        ],
      },
    });
    const config = new Config({
      root: '',
    });
    config.configDir = os.tmpdir();

    const command = new CleanupProjectsTestCommand([], config);
    const listener = command.getListener();

    stdout.start();
    listener('dummy:xxx', 'yyy');
    stdout.stop();

    expect(stripAnsi(stdout.output)).to.equal(
      '[Viking\'s CLI Tools] Event received. Event type: dummy:xxx data: yyy\n',
    );
  });
});
